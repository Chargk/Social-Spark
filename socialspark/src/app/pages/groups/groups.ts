import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

export interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  posts: number;
  category: string;
  avatarColor: string;
  isJoined: boolean;
  isPrivate: boolean;
  tags: string[];
}

@Component({
  standalone: true,
  selector: 'spark-groups',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './groups.html',
  styleUrl: './groups.scss',
})
export class GroupsComponent {
  searchTerm = '';
  selectedCategory: string | 'all' = 'all';
  toastMessage: string | null = null;
  toastType: 'success' | 'info' = 'success';
  showLeaveConfirm = false;
  groupToLeave: Group | null = null;

  groups: Group[] = [
    {
      id: 'group-1',
      name: 'Frontend Developers',
      description: 'A community for frontend developers to share knowledge, discuss best practices, and collaborate on projects.',
      members: 12450,
      posts: 3420,
      category: 'Technology',
      avatarColor: '#4A90E2',
      isJoined: true,
      isPrivate: false,
      tags: ['React', 'Angular', 'Vue', 'JavaScript']
    },
    {
      id: 'group-2',
      name: 'Design Enthusiasts',
      description: 'Share your designs, get feedback, and connect with fellow designers. From UI/UX to graphic design.',
      members: 8920,
      posts: 2150,
      category: 'Design',
      avatarColor: '#FF6B35',
      isJoined: true,
      isPrivate: false,
      tags: ['UI/UX', 'Graphic Design', 'Figma', 'Adobe']
    },
    {
      id: 'group-3',
      name: 'Startup Founders',
      description: 'A private community for startup founders to share experiences, seek advice, and network.',
      members: 3450,
      posts: 890,
      category: 'Business',
      avatarColor: '#50C878',
      isJoined: false,
      isPrivate: true,
      tags: ['Startup', 'Entrepreneurship', 'Networking']
    },
    {
      id: 'group-4',
      name: 'Photography Club',
      description: 'Showcase your photography, learn new techniques, and connect with photographers worldwide.',
      members: 15680,
      posts: 4520,
      category: 'Photography',
      avatarColor: '#9B59B6',
      isJoined: false,
      isPrivate: false,
      tags: ['Photography', 'Camera', 'Editing', 'Portrait']
    },
    {
      id: 'group-5',
      name: 'Fitness & Wellness',
      description: 'Share workout routines, nutrition tips, and motivate each other on the journey to better health.',
      members: 22340,
      posts: 6780,
      category: 'Health',
      avatarColor: '#FFB366',
      isJoined: false,
      isPrivate: false,
      tags: ['Fitness', 'Nutrition', 'Wellness', 'Workout']
    },
    {
      id: 'group-6',
      name: 'Book Lovers',
      description: 'Discuss your favorite books, share recommendations, and participate in reading challenges.',
      members: 9870,
      posts: 2340,
      category: 'Literature',
      avatarColor: '#E74C3C',
      isJoined: true,
      isPrivate: false,
      tags: ['Books', 'Reading', 'Literature', 'Reviews']
    }
  ];

  categories = ['all', 'Technology', 'Design', 'Business', 'Photography', 'Health', 'Literature'];

  get filteredGroups(): Group[] {
    let filtered = this.groups;

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(g => g.category === this.selectedCategory);
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(g =>
        g.name.toLowerCase().includes(term) ||
        g.description.toLowerCase().includes(term) ||
        g.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    return filtered;
  }

  get discoverGroups(): Group[] {
    // Return filtered groups excluding already joined ones
    const joinedIds = this.joinedGroups.map(g => g.id);
    return this.filteredGroups.filter(g => !joinedIds.includes(g.id));
  }

  get joinedGroups(): Group[] {
    return this.groups.filter(g => g.isJoined);
  }

  toggleJoin(group: Group): void {
    if (group.isJoined) {
      // Show confirmation dialog before leaving
      this.groupToLeave = group;
      this.showLeaveConfirm = true;
    } else {
      // Join immediately
      group.isJoined = true;
      group.members++;
      this.showToast(`You joined "${group.name}"`, 'success');
    }
  }

  confirmLeave(): void {
    if (this.groupToLeave) {
      this.groupToLeave.isJoined = false;
      this.groupToLeave.members--;
      this.showToast(`You left "${this.groupToLeave.name}"`, 'info');
      this.groupToLeave = null;
    }
    this.showLeaveConfirm = false;
  }

  cancelLeave(): void {
    this.groupToLeave = null;
    this.showLeaveConfirm = false;
  }

  showToast(message: string, type: 'success' | 'info'): void {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = null;
    }, 3000);
  }

  formatNumber(num: number): string {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
}

