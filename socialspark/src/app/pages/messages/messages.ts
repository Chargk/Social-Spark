import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'spark-messages',
  imports: [CommonModule, MatIconModule],
  templateUrl: './messages.html',
  styleUrl: './messages.scss',
})
export class MessagesComponent {
}

