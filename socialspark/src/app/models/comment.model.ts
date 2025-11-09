/**
 * Comment model - represents a comment on a post
 */
export interface Comment {
  id: string;
  postId: string; // ID of the post this comment belongs to
  author: string;
  authorId: string;
  authorAvatar?: string;
  content: string;
  likes: number;
  liked: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * DTO for creating a new comment
 */
export interface CreateCommentDto {
  postId: string;
  content: string;
}

