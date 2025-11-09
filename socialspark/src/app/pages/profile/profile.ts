import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'spark-profile',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class ProfileComponent {
  // Mock user data - will be replaced with real data from service
  user = {
    name: 'John Doe',
    handle: '@johndoe',
    bio: 'Welcome to my profile! This is where I share my thoughts and experiences.',
    followers: 1234,
    following: 567,
    posts: 89
  };
}

