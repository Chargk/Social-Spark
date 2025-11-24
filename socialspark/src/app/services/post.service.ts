import { Injectable } from '@angular/core';
import { Observable, map, catchError, of, switchMap } from 'rxjs';
import { ApiService } from './api.service';
import { Post, CreatePostDto } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private api: ApiService) {}

  getPosts(page: number = 1, limit: number = 10): Observable<Post[]> {
    return this.api.get<Post[]>('posts', { _page: page, _limit: limit, _sort: 'createdAt', _order: 'desc' }).pipe(
      map(posts => posts.map(post => ({
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: post.updatedAt ? new Date(post.updatedAt) : undefined
      }))),
      catchError(error => {
        console.error('Error loading posts:', error);
        // Fallback to empty array on error
        return of([]);
      })
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.api.get<Post>(`posts/${id}`).pipe(
      map(post => ({
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: post.updatedAt ? new Date(post.updatedAt) : undefined
      })),
      catchError(error => {
        console.error('Error loading post:', error);
        throw new Error('Post not found');
      })
    );
  }

  createPost(post: CreatePostDto): Observable<Post> {
    const newPost = {
      ...post,
      author: 'You',
      authorId: 'current-user',
      time: 'just now',
      likes: 0,
      comments: 0,
      liked: false,
      createdAt: new Date().toISOString()
    };
    
    return this.api.post<Post>('posts', newPost).pipe(
      map(post => ({
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: post.updatedAt ? new Date(post.updatedAt) : undefined
      })),
      catchError(error => {
        console.error('Error creating post:', error);
        throw error;
      })
    );
  }

  likePost(postId: string): Observable<Post> {
    return this.getPostById(postId).pipe(
      switchMap(post => {
        if (!post.liked) {
          const updatedPost = { ...post, liked: true, likes: post.likes + 1 };
          return this.api.put<Post>(`posts/${postId}`, updatedPost).pipe(
            map(updated => ({
              ...updated,
              createdAt: new Date(updated.createdAt),
              updatedAt: updated.updatedAt ? new Date(updated.updatedAt) : undefined
            }))
          );
        }
        return of(post);
      }),
      catchError(error => {
        console.error('Error liking post:', error);
        throw error;
      })
    );
  }

  unlikePost(postId: string): Observable<Post> {
    return this.getPostById(postId).pipe(
      switchMap(post => {
        if (post.liked) {
          const updatedPost = { ...post, liked: false, likes: post.likes - 1 };
          return this.api.put<Post>(`posts/${postId}`, updatedPost).pipe(
            map(updated => ({
              ...updated,
              createdAt: new Date(updated.createdAt),
              updatedAt: updated.updatedAt ? new Date(updated.updatedAt) : undefined
            }))
          );
        }
        return of(post);
      }),
      catchError(error => {
        console.error('Error unliking post:', error);
        throw error;
      })
    );
  }

  deletePost(postId: string): Observable<void> {
    return this.api.delete<void>(`posts/${postId}`).pipe(
      catchError(error => {
        console.error('Error deleting post:', error);
        throw error;
      })
    );
  }
}

