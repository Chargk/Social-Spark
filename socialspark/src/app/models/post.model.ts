export interface Post {
  id: string;
  author: string;
  authorId: string;
  authorAvatar?: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
  liked: boolean;
  image?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreatePostDto {
  content: string;
  image?: string;
  location?: string;
}

