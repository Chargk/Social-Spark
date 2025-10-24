import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'spark-header',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    FormsModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  isSearchExpanded = false;
  searchQuery = '';
  showSuggestions = false;
  searchSuggestions: any[] = [];

  expandSearch() {
    this.isSearchExpanded = true;
  }

  collapseSearch() {
    if (!this.searchQuery.trim()) {
      this.isSearchExpanded = false;
    }
    // Hide suggestions after a short delay to allow clicking
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  onSearchInput(event: any) {
    const query = event.target.value.trim();
    if (query.length > 0) {
      this.showSuggestions = true;
      this.generateSearchSuggestions(query);
    } else {
      this.showSuggestions = false;
      this.searchSuggestions = [];
    }
  }

  generateSearchSuggestions(query: string) {
    // Mock search suggestions - in real app, this would come from API
    const allSuggestions = [
      { text: 'JavaScript Tutorial', type: 'Post', icon: 'article' },
      { text: 'React Development', type: 'Post', icon: 'article' },
      { text: 'John Doe', type: 'User', icon: 'person' },
      { text: 'Tech Enthusiasts', type: 'Group', icon: 'group' },
      { text: 'Web Development', type: 'Group', icon: 'group' },
      { text: 'Angular Tips', type: 'Post', icon: 'article' },
      { text: 'Sarah Wilson', type: 'User', icon: 'person' },
      { text: 'Design Community', type: 'Group', icon: 'group' }
    ];

    this.searchSuggestions = allSuggestions.filter(suggestion =>
      suggestion.text.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }

  selectSuggestion(suggestion: any) {
    this.searchQuery = suggestion.text;
    this.showSuggestions = false;
    // Here you would typically navigate to the search results
    console.log('Selected suggestion:', suggestion);
  }
}
