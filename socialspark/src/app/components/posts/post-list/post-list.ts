import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
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
export class PostListComponent {
  newPostText = '';
  isPostInputFocused = false;
  
  samplePosts = [
    {
      author: 'John Doe',
      time: '2 hours ago',
      content: 'Just had an amazing day exploring the city! The architecture here is incredible. #exploring #citylife',
      likes: 24,
      comments: 8,
      image: null,
      liked: false
    },
    {
      author: 'Sarah Wilson',
      time: '4 hours ago',
      content: 'Working on a new project and feeling inspired! Sometimes the best ideas come when you least expect them.',
      likes: 15,
      comments: 3,
      image: null,
      liked: false
    },
    {
      author: 'Mike Johnson',
      time: '6 hours ago',
      content: 'Beautiful sunset from my balcony tonight. Nature never fails to amaze me.',
      likes: 42,
      comments: 12,
      image: null,
      liked: false
    }
  ];

  toggleLike(post: any) {
    if (post.liked) {
      post.likes--;
      post.liked = false;
    } else {
      post.likes++;
      post.liked = true;
    }
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

  createPost() {
    if (this.newPostText.trim()) {
      // Here you would typically send the post to your backend
      console.log('Creating post:', this.newPostText);
      
      // Add to the beginning of posts array
      this.samplePosts.unshift({
        author: 'You',
        time: 'now',
        content: this.newPostText,
        likes: 0,
        comments: 0,
        image: null,
        liked: false
      });
      
      // Clear the input
      this.newPostText = '';
    }
  }
}
