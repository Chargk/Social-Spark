import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ApiService } from './api.service';
import { Comment, CreateCommentDto } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  // Mock data storage (in-memory) - will be replaced by real API later
  private mockComments: Comment[] = [];
  
  constructor(private apiService: ApiService) {
    this.initializeMockData();
  }

  /**
   * Get all comments for a specific post
   * TODO: When backend is ready, replace with real API call
   */
  getCommentsByPostId(postId: string): Observable<Comment[]> {
    // Mock mode: return comments for the post
    const postComments = this.mockComments
      .filter(c => c.postId === postId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Newest first
    
    // Create deep copies to avoid reference issues
    const commentsCopy = postComments.map(comment => ({
      ...comment,
      createdAt: new Date(comment.createdAt),
      updatedAt: comment.updatedAt ? new Date(comment.updatedAt) : undefined
    }));
    
    return of(commentsCopy).pipe(delay(300));
    
    // Real API mode:
    // return this.apiService.get<Comment[]>(`posts/${postId}/comments`);
  }

  /**
   * Create a new comment on a post
   * TODO: When backend is ready, replace with real API call
   */
  createComment(comment: CreateCommentDto): Observable<Comment> {
    // Mock mode: create comment in memory
    const newComment: Comment = {
      id: 'comment-' + Date.now(),
      postId: comment.postId,
      author: 'You',
      authorId: 'current-user',
      content: comment.content,
      likes: 0,
      liked: false,
      createdAt: new Date()
    };
    
    this.mockComments.push(newComment);
    return of({ ...newComment }).pipe(delay(400));
    
    // Real API mode:
    // return this.apiService.post<Comment>(`posts/${comment.postId}/comments`, comment);
  }

  /**
   * Like a comment
   * TODO: When backend is ready, replace with real API call
   */
  likeComment(commentId: string): Observable<Comment> {
    const comment = this.mockComments.find(c => c.id === commentId);
    if (comment && !comment.liked) {
      comment.liked = true;
      comment.likes++;
      return of({ ...comment }).pipe(delay(200));
    }
    throw new Error('Comment not found or already liked');
    
    // Real API mode:
    // return this.apiService.post<Comment>(`comments/${commentId}/like`, {});
  }

  /**
   * Unlike a comment
   * TODO: When backend is ready, replace with real API call
   */
  unlikeComment(commentId: string): Observable<Comment> {
    const comment = this.mockComments.find(c => c.id === commentId);
    if (comment && comment.liked) {
      comment.liked = false;
      comment.likes--;
      return of({ ...comment }).pipe(delay(200));
    }
    throw new Error('Comment not found or not liked');
    
    // Real API mode:
    // return this.apiService.delete<Comment>(`comments/${commentId}/like`);
  }

  /**
   * Delete a comment
   * TODO: When backend is ready, replace with real API call
   */
  deleteComment(commentId: string): Observable<void> {
    const index = this.mockComments.findIndex(c => c.id === commentId);
    if (index !== -1) {
      this.mockComments.splice(index, 1);
      return of(undefined).pipe(delay(300));
    }
    throw new Error('Comment not found');
    
    // Real API mode:
    // return this.apiService.delete<void>(`comments/${commentId}`);
  }

  /**
   * Initialize mock data for development
   * This will be removed when backend is ready
   */
  private initializeMockData(): void {
    const now = new Date();
    this.mockComments = [
      {
        id: 'comment-1',
        postId: '1',
        author: 'Alice Smith',
        authorId: 'user-alice',
        content: 'Looks amazing! Where was this taken?',
        likes: 5,
        liked: false,
        createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000) // 1 hour ago
      },
      {
        id: 'comment-2',
        postId: '1',
        author: 'Bob Johnson',
        authorId: 'user-bob',
        content: 'I totally agree! The architecture is stunning.',
        likes: 3,
        liked: false,
        createdAt: new Date(now.getTime() - 30 * 60 * 1000) // 30 minutes ago
      },
      {
        id: 'comment-3',
        postId: '2',
        author: 'Charlie Brown',
        authorId: 'user-charlie',
        content: 'Great work! Keep it up!',
        likes: 2,
        liked: false,
        createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000) // 3 hours ago
      }
    ];
  }
}

