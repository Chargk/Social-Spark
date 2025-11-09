import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'spark-events',
  imports: [CommonModule, MatIconModule],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class EventsComponent {
}

