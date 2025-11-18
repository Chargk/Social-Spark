import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { PostListComponent } from '../../components/posts/post-list/post-list';

@Component({
  standalone: true,
  selector: 'spark-explore',
  imports: [CommonModule, MatIconModule, RouterModule, PostListComponent],
  templateUrl: './explore.html',
  styleUrl: './explore.scss',
})
export class ExploreComponent {}

