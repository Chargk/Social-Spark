import { Injectable } from '@angular/core';
import { Observable, map, catchError, of, switchMap } from 'rxjs';
import { ApiService } from './api.service';
import { Comment, CreateCommentDto } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private apiService: ApiService) {}

  getCommentsByPostId(postId: string): Observable<Comment[]> {
    return this.apiService.get<Comment[]>('comments', { postId, _sort: 'createdAt', _order: 'desc' }).pipe(
      map(comments => comments.map(comment => ({
        ...comment,
        createdAt: new Date(comment.createdAt),
        updatedAt: comment.updatedAt ? new Date(comment.updatedAt) : undefined
      }))),
      catchError(error => {
        console.error('Error loading comments:', error);
        return of([]);
      })
    );
  }

  createComment(comment: CreateCommentDto): Observable<Comment> {
    const newComment = {
      ...comment,
      author: 'You',
      authorId: 'current-user',
      likes: 0,
      liked: false,
      createdAt: new Date().toISOString()
    };
    
    return this.apiService.post<Comment>('comments', newComment).pipe(
      map(comment => ({
        ...comment,
        createdAt: new Date(comment.createdAt),
        updatedAt: comment.updatedAt ? new Date(comment.updatedAt) : undefined
      })),
      catchError(error => {
        console.error('Error creating comment:', error);
        throw error;
      })
    );
  }

  likeComment(commentId: string): Observable<Comment> {
    return this.apiService.get<Comment>(`comments/${commentId}`).pipe(
      switchMap(comment => {
        if (!comment.liked) {
          const updatedComment = { ...comment, liked: true, likes: comment.likes + 1 };
          return this.apiService.put<Comment>(`comments/${commentId}`, updatedComment).pipe(
            map(updated => ({
              ...updated,
              createdAt: new Date(updated.createdAt),
              updatedAt: updated.updatedAt ? new Date(updated.updatedAt) : undefined
            }))
          );
        }
        return of({
          ...comment,
          createdAt: new Date(comment.createdAt),
          updatedAt: comment.updatedAt ? new Date(comment.updatedAt) : undefined
        });
      }),
      catchError(error => {
        console.error('Error liking comment:', error);
        throw error;
      })
    );
  }

  unlikeComment(commentId: string): Observable<Comment> {
    return this.apiService.get<Comment>(`comments/${commentId}`).pipe(
      switchMap(comment => {
        if (comment.liked) {
          const updatedComment = { ...comment, liked: false, likes: comment.likes - 1 };
          return this.apiService.put<Comment>(`comments/${commentId}`, updatedComment).pipe(
            map(updated => ({
              ...updated,
              createdAt: new Date(updated.createdAt),
              updatedAt: updated.updatedAt ? new Date(updated.updatedAt) : undefined
            }))
          );
        }
        return of({
          ...comment,
          createdAt: new Date(comment.createdAt),
          updatedAt: comment.updatedAt ? new Date(comment.updatedAt) : undefined
        });
      }),
      catchError(error => {
        console.error('Error unliking comment:', error);
        throw error;
      })
    );
  }

  deleteComment(commentId: string): Observable<void> {
    return this.apiService.delete<void>(`comments/${commentId}`).pipe(
      catchError(error => {
        console.error('Error deleting comment:', error);
        throw error;
      })
    );
  }
}

