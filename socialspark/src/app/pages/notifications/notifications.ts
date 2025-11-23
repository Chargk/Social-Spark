import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

export enum NotificationType {
  Like = 'like',
  Comment = 'comment',
  Follow = 'follow',
  Mention = 'mention',
  Post = 'post'
}

export interface Notification {
  id: string;
  type: NotificationType;
  user: {
    name: string;
    username: string;
    avatarColor: string;
  };
  content: string;
  time: string;
  read: boolean;
  relatedPostId?: string;
}

@Component({
  standalone: true,
  selector: 'spark-notifications',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class NotificationsComponent {
  NotificationType = NotificationType; // Expose enum to template
  filterType: NotificationType | 'all' = 'all';
  searchTerm = '';

  notifications: Notification[] = [
    {
      id: 'notif-1',
      type: NotificationType.Like,
      user: {
        name: 'Sarah Wilson',
        username: 'sarah.wilson',
        avatarColor: '#FFB366'
      },
      content: 'liked your post',
      time: '5m ago',
      read: false,
      relatedPostId: 'post-1'
    },
    {
      id: 'notif-2',
      type: NotificationType.Comment,
      user: {
        name: 'Mike Johnson',
        username: 'mike.j',
        avatarColor: '#FF6B35'
      },
      content: 'commented on your post: "Great insights! Thanks for sharing."',
      time: '12m ago',
      read: false,
      relatedPostId: 'post-2'
    },
    {
      id: 'notif-3',
      type: NotificationType.Follow,
      user: {
        name: 'Emma Davis',
        username: 'emma.d',
        avatarColor: '#FF8A5B'
      },
      content: 'started following you',
      time: '1h ago',
      read: false
    },
    {
      id: 'notif-4',
      type: NotificationType.Mention,
      user: {
        name: 'Alex Chen',
        username: 'alex.chen',
        avatarColor: '#FF9F66'
      },
      content: 'mentioned you in a post',
      time: '2h ago',
      read: true,
      relatedPostId: 'post-3'
    },
    {
      id: 'notif-5',
      type: NotificationType.Like,
      user: {
        name: 'Liam Martinez',
        username: 'liam.codes',
        avatarColor: '#FF8A5B'
      },
      content: 'liked your comment',
      time: '3h ago',
      read: true
    },
    {
      id: 'notif-6',
      type: NotificationType.Post,
      user: {
        name: 'Noah Williams',
        username: 'noah.analytics',
        avatarColor: '#FF6B35'
      },
      content: 'shared a new post',
      time: '5h ago',
      read: true,
      relatedPostId: 'post-4'
    },
    {
      id: 'notif-7',
      type: NotificationType.Follow,
      user: {
        name: 'Amelia Green',
        username: 'amelia.design',
        avatarColor: '#FFB366'
      },
      content: 'started following you',
      time: '1d ago',
      read: true
    }
  ];

  get filteredNotifications(): Notification[] {
    let filtered = this.notifications;

    // Filter by type
    if (this.filterType !== 'all') {
      filtered = filtered.filter(n => n.type === this.filterType);
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(n =>
        n.user.name.toLowerCase().includes(term) ||
        n.user.username.toLowerCase().includes(term) ||
        n.content.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  getIconForType(type: NotificationType): string {
    switch (type) {
      case NotificationType.Like:
        return 'favorite';
      case NotificationType.Comment:
        return 'comment';
      case NotificationType.Follow:
        return 'person_add';
      case NotificationType.Mention:
        return 'alternate_email';
      case NotificationType.Post:
        return 'article';
      default:
        return 'notifications';
    }
  }

  markAsRead(notification: Notification): void {
    notification.read = true;
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
  }

  getNotificationColor(type: NotificationType): string {
    switch (type) {
      case NotificationType.Like:
        return '#FF6B35';
      case NotificationType.Comment:
        return '#4A90E2';
      case NotificationType.Follow:
        return '#50C878';
      case NotificationType.Mention:
        return '#9B59B6';
      case NotificationType.Post:
        return '#FFB366';
      default:
        return '#94A3B8';
    }
  }
}

