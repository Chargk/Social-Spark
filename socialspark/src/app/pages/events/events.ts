import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  category: string;
  attendees: number;
  maxAttendees?: number;
  isJoined: boolean;
  organizer: {
    name: string;
    avatarColor: string;
  };
  imageColor: string;
  tags: string[];
}

@Component({
  standalone: true,
  selector: 'spark-events',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class EventsComponent {
  searchTerm = '';
  selectedCategory: string | 'all' = 'all';
  filterType: 'upcoming' | 'past' | 'all' = 'upcoming';

  events: Event[] = [
    {
      id: 'event-1',
      title: 'Angular Meetup: Advanced Patterns',
      description: 'Join us for an evening of deep dives into advanced Angular patterns, performance optimization, and best practices.',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      time: '18:00',
      location: 'Tech Hub, San Francisco',
      category: 'Technology',
      attendees: 145,
      maxAttendees: 200,
      isJoined: true,
      organizer: {
        name: 'Tech Community SF',
        avatarColor: '#4A90E2'
      },
      imageColor: '#4A90E2',
      tags: ['Angular', 'Web Development', 'Networking']
    },
    {
      id: 'event-2',
      title: 'Design System Workshop',
      description: 'Learn how to build and maintain a scalable design system. Hands-on workshop with real-world examples.',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      time: '10:00',
      location: 'Design Studio, New York',
      category: 'Design',
      attendees: 89,
      maxAttendees: 100,
      isJoined: false,
      organizer: {
        name: 'Design Collective',
        avatarColor: '#FF6B35'
      },
      imageColor: '#FF6B35',
      tags: ['Design', 'UI/UX', 'Workshop']
    },
    {
      id: 'event-3',
      title: 'Startup Pitch Night',
      description: 'Watch 10 startups pitch their ideas to a panel of investors. Networking session after pitches.',
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      time: '19:00',
      location: 'Innovation Center, Austin',
      category: 'Business',
      attendees: 234,
      isJoined: false,
      organizer: {
        name: 'Startup Hub',
        avatarColor: '#50C878'
      },
      imageColor: '#50C878',
      tags: ['Startup', 'Pitch', 'Networking']
    },
    {
      id: 'event-4',
      title: 'Photography Walk: Golden Hour',
      description: 'Capture stunning sunset photos with fellow photographers. All skill levels welcome.',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      time: '17:30',
      location: 'Beach Park, Los Angeles',
      category: 'Photography',
      attendees: 67,
      maxAttendees: 80,
      isJoined: true,
      organizer: {
        name: 'LA Photo Club',
        avatarColor: '#9B59B6'
      },
      imageColor: '#9B59B6',
      tags: ['Photography', 'Outdoor', 'Sunset']
    },
    {
      id: 'event-5',
      title: 'Fitness Bootcamp',
      description: 'High-intensity workout session in the park. Bring water and a mat. All fitness levels welcome.',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (past)
      time: '07:00',
      location: 'Central Park, New York',
      category: 'Health',
      attendees: 45,
      isJoined: true,
      organizer: {
        name: 'FitLife Community',
        avatarColor: '#FFB366'
      },
      imageColor: '#FFB366',
      tags: ['Fitness', 'Outdoor', 'Bootcamp']
    },
    {
      id: 'event-6',
      title: 'Book Club: Sci-Fi Edition',
      description: 'Discussion of "Dune" by Frank Herbert. Light refreshments provided.',
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      time: '19:30',
      location: 'Local Library, Seattle',
      category: 'Literature',
      attendees: 23,
      maxAttendees: 30,
      isJoined: false,
      organizer: {
        name: 'Seattle Book Club',
        avatarColor: '#E74C3C'
      },
      imageColor: '#E74C3C',
      tags: ['Books', 'Sci-Fi', 'Discussion']
    }
  ];

  categories = ['all', 'Technology', 'Design', 'Business', 'Photography', 'Health', 'Literature'];

  get filteredEvents(): Event[] {
    let filtered = this.events;

    // Filter by date
    const now = new Date();
    if (this.filterType === 'upcoming') {
      filtered = filtered.filter(e => e.date >= now);
    } else if (this.filterType === 'past') {
      filtered = filtered.filter(e => e.date < now);
    }

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(e => e.category === this.selectedCategory);
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(term) ||
        e.description.toLowerCase().includes(term) ||
        e.location.toLowerCase().includes(term) ||
        e.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Sort by date
    return filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  get joinedEvents(): Event[] {
    return this.events.filter(e => e.isJoined && e.date >= new Date());
  }

  toggleJoin(event: Event): void {
    event.isJoined = !event.isJoined;
    if (event.isJoined) {
      event.attendees++;
    } else {
      event.attendees--;
    }
  }

  formatDate(date: Date): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0);
    const todayDate = new Date(today);
    todayDate.setHours(0, 0, 0, 0);
    const tomorrowDate = new Date(tomorrow);
    tomorrowDate.setHours(0, 0, 0, 0);

    if (eventDate.getTime() === todayDate.getTime()) {
      return 'Today';
    } else if (eventDate.getTime() === tomorrowDate.getTime()) {
      return 'Tomorrow';
    } else {
      return eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  }

  get discoverEvents(): Event[] {
    // Return filtered events excluding already joined ones
    const joinedIds = this.joinedEvents.map(e => e.id);
    return this.filteredEvents.filter(e => !joinedIds.includes(e.id));
  }

  isPastEvent(event: Event): boolean {
    return event.date < new Date();
  }

  getDateDisplay(date: Date): string {
    const formatted = this.formatDate(date);
    if (formatted === 'Today' || formatted === 'Tomorrow') {
      return formatted;
    }
    const parts = formatted.split(' ');
    return parts[1] || formatted; // Return day number
  }

  getDateMonth(date: Date): string {
    const formatted = this.formatDate(date);
    if (formatted === 'Today' || formatted === 'Tomorrow') {
      return '';
    }
    const parts = formatted.split(' ');
    return parts[0] || ''; // Return month
  }
}

