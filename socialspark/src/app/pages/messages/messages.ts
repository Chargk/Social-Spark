import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

interface Message {
  id: string;
  sender: 'me' | 'them';
  content: string;
  time: string;
}

interface ConversationPreview {
  id: string;
  name: string;
  username: string;
  avatarColor: string;
  lastMessage: string;
  lastActive: string;
  unreadCount: number;
  messages: Message[];
}

@Component({
  standalone: true,
  selector: 'spark-messages',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './messages.html',
  styleUrl: './messages.scss',
})
export class MessagesComponent {
  searchTerm = '';

  conversations: ConversationPreview[] = [
    {
      id: 'conv-1',
      name: 'Liam Martinez',
      username: 'liam.codes',
      avatarColor: '#FF8A5B',
      lastMessage: 'Sounds great! I’ll send over the designs tonight.',
      lastActive: '2m ago',
      unreadCount: 2,
      messages: [
        { id: 'm1', sender: 'them', content: 'Hey! Did you check the new design system update?', time: '09:15' },
        { id: 'm2', sender: 'me', content: 'Yes, looking very polished. Love the typography choices.', time: '09:18' },
        { id: 'm3', sender: 'them', content: 'Awesome! I’ll push the files later today.', time: '09:22' },
        { id: 'm4', sender: 'them', content: 'Sounds great! I’ll send over the designs tonight.', time: '09:22' }
      ]
    },
    {
      id: 'conv-2',
      name: 'Amelia Green',
      username: 'amelia.design',
      avatarColor: '#FFB366',
      lastMessage: 'Let’s catch up tomorrow morning ☀️',
      lastActive: '1h ago',
      unreadCount: 0,
      messages: [
        { id: 'm1', sender: 'them', content: 'Thanks for the feedback on the prototype!', time: 'Yesterday' },
        { id: 'm2', sender: 'me', content: 'It’s really coming together. I’d add a bit more contrast in the hero.', time: 'Yesterday' },
        { id: 'm3', sender: 'them', content: 'Noted! Let’s catch up tomorrow morning ☀️', time: 'Yesterday' }
      ]
    },
    {
      id: 'conv-3',
      name: 'Noah Williams',
      username: 'noah.analytics',
      avatarColor: '#FF6B35',
      lastMessage: 'Appreciate your thoughts. Let’s iterate on it.',
      lastActive: 'Mon',
      unreadCount: 0,
      messages: [
        { id: 'm1', sender: 'me', content: 'The dashboard metrics look slick!', time: 'Mon' },
        { id: 'm2', sender: 'them', content: 'Thanks! I’m thinking about adding a retention chart.', time: 'Mon' },
        { id: 'm3', sender: 'me', content: 'That would be helpful for product managers.', time: 'Mon' },
        { id: 'm4', sender: 'them', content: 'Appreciate your thoughts. Let’s iterate on it.', time: 'Mon' }
      ]
    }
  ];

  selectedConversation: ConversationPreview = this.conversations[0];

  get filteredConversations(): ConversationPreview[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      return this.conversations;
    }
    return this.conversations.filter(convo =>
      convo.name.toLowerCase().includes(term) ||
      convo.username.toLowerCase().includes(term) ||
      convo.lastMessage.toLowerCase().includes(term)
    );
  }

  selectConversation(conversation: ConversationPreview) {
    this.selectedConversation = conversation;
    conversation.unreadCount = 0;
  }

  isSelected(conversation: ConversationPreview): boolean {
    return this.selectedConversation.id === conversation.id;
  }
}

