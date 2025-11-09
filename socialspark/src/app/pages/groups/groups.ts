import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'spark-groups',
  imports: [CommonModule, MatIconModule],
  templateUrl: './groups.html',
  styleUrl: './groups.scss',
})
export class GroupsComponent {
}

