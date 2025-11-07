import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ApiService } from './api.service';
import { Post, CreatePostDto } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // Mock data storage (in-memory) - will be replaced by real API later
  private mockPosts: Post[] = [];
  
  constructor(private api: ApiService) {
    this.initializeMockData();
  }

  /**
   * TODO: When backend is ready, replace this with real API call:
   * return this.api.get<Post[]>('posts', { page, limit });
   */
  getPosts(page: number = 1, limit: number = 10): Observable<Post[]> {
    // Mock mode: return mock data with delay to simulate API call
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedPosts = this.mockPosts.slice(start, end);
    
    // Create deep copies to avoid reference issues when components modify posts
    // This prevents optimistic updates from affecting the original mock data
    const postsCopy = paginatedPosts.map(post => ({
      ...post,
      createdAt: new Date(post.createdAt),
      updatedAt: post.updatedAt ? new Date(post.updatedAt) : undefined
    }));
    
    // Simulate network delay (500ms)
    return of(postsCopy).pipe(delay(500));
    
    // Real API mode (uncomment when backend is ready):
    // return this.api.get<Post[]>('posts', { page, limit });
  }

  getPostById(id: string): Observable<Post> {
    // Mock mode
    const post = this.mockPosts.find(p => p.id === id);
    if (post) {
      return of(post).pipe(delay(300));
    }
    throw new Error('Post not found');
    
    // Real API mode:
    // return this.api.get<Post>(`posts/${id}`);
  }

  createPost(post: CreatePostDto): Observable<Post> {
    // Mock mode: create post in memory
    const newPost: Post = {
      id: 'post-' + Date.now(),
      author: 'You',
      authorId: 'current-user',
      time: 'just now',
      content: post.content,
      likes: 0,
      comments: 0,
      liked: false,
      createdAt: new Date()
    };
    
    this.mockPosts.unshift(newPost); // Add to beginning
    return of(newPost).pipe(delay(400));
    
    // Real API mode:
    // return this.api.post<Post>('posts', post);
  }

  likePost(postId: string): Observable<Post> {
    // Mock mode: update in memory
    const post = this.mockPosts.find(p => p.id === postId);
    if (post) {
      // Only update if not already liked (prevent double-counting)
      if (!post.liked) {
        post.liked = true;
        post.likes++;
      }
      // Return a copy to avoid reference issues
      return of({ ...post }).pipe(delay(200));
    }
    throw new Error('Post not found');
    
    // Real API mode:
    // return this.api.post<Post>(`posts/${postId}/like`, {});
  }

  unlikePost(postId: string): Observable<Post> {
    // Mock mode: update in memory
    const post = this.mockPosts.find(p => p.id === postId);
    if (post) {
      // Only update if already liked (prevent double-counting)
      if (post.liked) {
        post.liked = false;
        post.likes--;
      }
      // Return a copy to avoid reference issues
      return of({ ...post }).pipe(delay(200));
    }
    throw new Error('Post not found');
    
    // Real API mode:
    // return this.api.delete<Post>(`posts/${postId}/like`);
  }

  deletePost(postId: string): Observable<void> {
    // Mock mode
    const index = this.mockPosts.findIndex(p => p.id === postId);
    if (index !== -1) {
      this.mockPosts.splice(index, 1);
      return of(undefined).pipe(delay(300));
    }
    throw new Error('Post not found');
    
    // Real API mode:
    // return this.api.delete<void>(`posts/${postId}`);
  }

  /**
   * Initialize mock data for development
   * This will be removed when backend is ready
   */
  private initializeMockData(): void {
    const now = new Date();
    this.mockPosts = [
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
        createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000)
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
        createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000)
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
        createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000)
      }
    ];
  }
}

