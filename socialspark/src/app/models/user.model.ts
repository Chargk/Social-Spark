export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  createdAt: Date;
}

export interface UserProfile extends User {
  posts: number;
  isFollowing?: boolean;
}

