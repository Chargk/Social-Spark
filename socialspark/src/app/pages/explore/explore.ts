import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'spark-explore',
  imports: [CommonModule, MatIconModule],
  templateUrl: './explore.html',
  styleUrl: './explore.scss',
})
export class ExploreComponent {
}

