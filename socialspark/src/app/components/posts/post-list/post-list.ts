import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { CommentService } from '../../../services/comment.service';
import { Post, CreatePostDto } from '../../../models/post.model';
import { Comment, CreateCommentDto } from '../../../models/comment.model';
import { catchError, of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'spark-post-list',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostListComponent implements OnInit {
  @Input() showCreateCard = true;
  // Form state
  newPostText = '';
  isPostInputFocused = false;
  
  // Posts data
  posts: Post[] = [];
  isLoading = false;
  error: string | null = null;
  
  // Comments data - Map of postId to comments array
  commentsMap: Map<string, Comment[]> = new Map();
  // Map of postId to whether comments section is open
  commentsOpenMap: Map<string, boolean> = new Map();
  // Map of postId to new comment text
  newCommentTextMap: Map<string, string> = new Map();
  // Map of postId to loading state for comments
  commentsLoadingMap: Map<string, boolean> = new Map();
  
  // Inject services through constructor - Angular Dependency Injection
  constructor(
    private postService: PostService,
    private commentService: CommentService
  ) {}
  
  // OnInit lifecycle hook - runs when component is initialized
  ngOnInit(): void {
    this.loadPosts();
  }
  
  // Load posts from API
  loadPosts(): void {
    this.isLoading = true;
    this.error = null;
    
    // Observable pattern - subscribe to get data when it arrives
    this.postService.getPosts().pipe(
      // Handle errors gracefully - if API fails, show error but don't crash
      catchError(error => {
        console.error('Error loading posts:', error);
        this.error = 'Failed to load posts. Using sample data.';
        // Return sample data as fallback
        return of(this.getSamplePosts());
      })
    ).subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isLoading = false;
      },
      error: (error) => {
        // This should not happen due to catchError, but just in case
        this.error = 'Unexpected error occurred';
        this.posts = this.getSamplePosts();
        this.isLoading = false;
      }
    });
  }
  
  // Fallback sample posts if API is not ready yet
  private getSamplePosts(): Post[] {
    const now = new Date();
    return [
    {
      id: '1',
      author: 'John Doe',
      authorId: 'user1',
      time: '2 hours ago',
      content: 'Just had an amazing day exploring the city! The architecture here is incredible. #exploring #citylife',
      likes: 24,
      comments: 8,
      image: undefined,
      liked: false,
      createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: '2',
      author: 'Sarah Wilson',
      authorId: 'user2',
      time: '4 hours ago',
      content: 'Working on a new project and feeling inspired! Sometimes the best ideas come when you least expect them.',
      likes: 15,
      comments: 3,
      image: undefined,
      liked: false,
      createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000) // 4 hours ago
    },
    {
      id: '3',
      author: 'Mike Johnson',
      authorId: 'user3',
      time: '6 hours ago',
      content: 'Beautiful sunset from my balcony tonight. Nature never fails to amaze me.',
      likes: 42,
      comments: 12,
      image: undefined,
      liked: false,
      createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000) // 6 hours ago
    }
  ];
  }

  // Toggle like on a post - optimistic UI update
  toggleLike(post: Post): void {
    // Save original state for potential revert
    const wasLiked = post.liked;
    const originalLikes = post.likes;
    
    // Optimistic update - update UI immediately for better UX
    post.liked = !post.liked;
    post.likes = post.liked ? post.likes + 1 : post.likes - 1;
    
    // Then call API to persist the change
    const likeOperation = post.liked 
      ? this.postService.likePost(post.id)
      : this.postService.unlikePost(post.id);
    
    likeOperation.pipe(
      catchError(error => {
        // If API call fails, revert the optimistic update
        console.error('Error toggling like:', error);
        post.liked = wasLiked;
        post.likes = originalLikes; // Revert to original count
        return of(null);
      })
    ).subscribe((updatedPost: Post | null) => {
      // If API call succeeds, only update likes count from server (don't replace entire post)
      // This prevents double-counting issues
      if (updatedPost) {
        const index = this.posts.findIndex(p => p.id === post.id);
        if (index !== -1) {
          // Only update likes and liked status, keep other properties from current post
          this.posts[index].likes = updatedPost.likes;
          this.posts[index].liked = updatedPost.liked;
        }
      }
    });
  }

  onPostInputFocus() {
    this.isPostInputFocused = true;
  }

  onPostInputBlur() {
    // Delay to allow clicking on action buttons
    setTimeout(() => {
      this.isPostInputFocused = false;
    }, 200);
  }

  // Create a new post through API
  createPost(): void {
    if (!this.newPostText.trim()) {
      return; // Don't create empty posts
    }
    
    const postData: CreatePostDto = {
      content: this.newPostText.trim()
    };
    
    // Optimistic update - add post immediately for better UX
    const tempPost: Post = {
      id: 'temp-' + Date.now(), // Temporary ID
      author: 'You', // Will be replaced by server response
      authorId: 'current-user',
      time: 'now',
      content: postData.content,
      likes: 0,
      comments: 0,
      liked: false,
      createdAt: new Date()
    };
    
    this.posts.unshift(tempPost);
    const newPostText = this.newPostText;
    this.newPostText = ''; // Clear input immediately
    
    // Call API to create post
    this.postService.createPost(postData).pipe(
      catchError(error => {
        // If API call fails, remove the optimistic post
        console.error('Error creating post:', error);
        const index = this.posts.findIndex(p => p.id === tempPost.id);
        if (index !== -1) {
          this.posts.splice(index, 1);
        }
        this.newPostText = newPostText; // Restore text
        this.error = 'Failed to create post. Please try again.';
        return of(null);
      })
    ).subscribe(newPost => {
      if (newPost) {
        // Replace temporary post with real post from server
        const index = this.posts.findIndex(p => p.id === tempPost.id);
        if (index !== -1) {
          this.posts[index] = newPost;
        }
        this.error = null;
      }
    });
  }

  // ========== Comments Methods ==========

  /**
   * Toggle comments section for a post
   */
  toggleComments(postId: string): void {
    const isOpen = this.commentsOpenMap.get(postId) || false;
    this.commentsOpenMap.set(postId, !isOpen);
    
    // If opening comments and not loaded yet, load them
    if (!isOpen && !this.commentsMap.has(postId)) {
      this.loadComments(postId);
    }
  }

  /**
   * Check if comments section is open for a post
   */
  isCommentsOpen(postId: string): boolean {
    return this.commentsOpenMap.get(postId) || false;
  }

  /**
   * Get comments for a post
   */
  getComments(postId: string): Comment[] {
    return this.commentsMap.get(postId) || [];
  }

  /**
   * Load comments for a post
   */
  loadComments(postId: string): void {
    this.commentsLoadingMap.set(postId, true);
    
    this.commentService.getCommentsByPostId(postId).pipe(
      catchError(error => {
        console.error('Error loading comments:', error);
        this.commentsLoadingMap.set(postId, false);
        return of([]);
      })
    ).subscribe(comments => {
      this.commentsMap.set(postId, comments);
      this.commentsLoadingMap.set(postId, false);
    });
  }

  /**
   * Check if comments are loading for a post
   */
  isLoadingComments(postId: string): boolean {
    return this.commentsLoadingMap.get(postId) || false;
  }

  /**
   * Get new comment text for a post
   */
  getNewCommentText(postId: string): string {
    return this.newCommentTextMap.get(postId) || '';
  }

  /**
   * Set new comment text for a post
   */
  setNewCommentText(postId: string, text: string): void {
    this.newCommentTextMap.set(postId, text);
  }

  /**
   * Add a new comment to a post
   */
  addComment(postId: string): void {
    const commentText = this.getNewCommentText(postId).trim();
    if (!commentText) {
      return; // Don't create empty comments
    }

    const commentData: CreateCommentDto = {
      postId: postId,
      content: commentText
    };

    // Optimistic update - add comment immediately
    const tempComment: Comment = {
      id: 'temp-comment-' + Date.now(),
      postId: postId,
      author: 'You',
      authorId: 'current-user',
      content: commentText,
      likes: 0,
      liked: false,
      createdAt: new Date()
    };

    const currentComments = this.getComments(postId);
    this.commentsMap.set(postId, [tempComment, ...currentComments]);
    
    // Update post comment count
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.comments++;
    }

    // Clear input
    this.setNewCommentText(postId, '');

    // Call API to create comment
    this.commentService.createComment(commentData).pipe(
      catchError(error => {
        // If API call fails, revert the optimistic update
        console.error('Error creating comment:', error);
        const comments = this.getComments(postId);
        const index = comments.findIndex(c => c.id === tempComment.id);
        if (index !== -1) {
          comments.splice(index, 1);
          this.commentsMap.set(postId, comments);
        }
        if (post) {
          post.comments--;
        }
        this.setNewCommentText(postId, commentText); // Restore text
        return of(null);
      })
    ).subscribe(newComment => {
      if (newComment) {
        // Replace temporary comment with real comment from server
        const comments = this.getComments(postId);
        const index = comments.findIndex(c => c.id === tempComment.id);
        if (index !== -1) {
          comments[index] = newComment;
          this.commentsMap.set(postId, comments);
        }
      }
    });
  }

  /**
   * Toggle like on a comment
   */
  toggleCommentLike(comment: Comment): void {
    const wasLiked = comment.liked;
    const originalLikes = comment.likes;
    
    // Optimistic update
    comment.liked = !comment.liked;
    comment.likes = comment.liked ? comment.likes + 1 : comment.likes - 1;
    
    // Call API
    const likeOperation = comment.liked
      ? this.commentService.likeComment(comment.id)
      : this.commentService.unlikeComment(comment.id);
    
    likeOperation.pipe(
      catchError(error => {
        // Revert on error
        console.error('Error toggling comment like:', error);
        comment.liked = wasLiked;
        comment.likes = originalLikes;
        return of(null);
      })
    ).subscribe((updatedComment: Comment | null) => {
      if (updatedComment) {
        // Update comment with server response
        const comments = this.getComments(comment.postId);
        const index = comments.findIndex(c => c.id === comment.id);
        if (index !== -1) {
          comments[index].likes = updatedComment.likes;
          comments[index].liked = updatedComment.liked;
        }
      }
    });
  }
}
