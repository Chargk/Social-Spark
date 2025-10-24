import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'spark-post-list',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostList {
  samplePosts = [
    {
      author: 'John Doe',
      time: '2 hours ago',
      content: 'Just had an amazing day exploring the city! The architecture here is incredible. #exploring #citylife',
      likes: 24,
      comments: 8,
      image: null
    },
    {
      author: 'Sarah Wilson',
      time: '4 hours ago',
      content: 'Working on a new project and feeling inspired! Sometimes the best ideas come when you least expect them.',
      likes: 15,
      comments: 3,
      image: null
    },
    {
      author: 'Mike Johnson',
      time: '6 hours ago',
      content: 'Beautiful sunset from my balcony tonight. Nature never fails to amaze me.',
      likes: 42,
      comments: 12,
      image: null
    }
  ];
}
