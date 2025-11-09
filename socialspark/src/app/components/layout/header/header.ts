import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { SearchService } from '../../../services/search.service';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
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
export class HeaderComponent implements OnInit, OnDestroy {
  isSearchExpanded = false;
  searchQuery = '';
  showSuggestions = false;
  searchSuggestions: any[] = [];
  currentUser: User | null = null;
  private userSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    // Subscribe to current user changes
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

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
    this.searchQuery = query;
    
    if (query.length > 0) {
      // Debounce search suggestions
      this.searchService.getSuggestions(query).subscribe(suggestions => {
        this.searchSuggestions = suggestions.map(s => ({
          text: s.title,
          type: s.type,
          icon: this.getIconForType(s.type),
          id: s.id
        }));
        this.showSuggestions = this.searchSuggestions.length > 0;
      });
    } else {
      this.showSuggestions = false;
      this.searchSuggestions = [];
    }
  }

  getIconForType(type: string): string {
    switch (type) {
      case 'Post':
        return 'article';
      case 'User':
        return 'person';
      case 'Group':
        return 'group';
      default:
        return 'search';
    }
  }

  selectSuggestion(suggestion: any) {
    this.searchQuery = suggestion.text;
    this.showSuggestions = false;
    // Navigate to search results
    this.performSearch();
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { 
        queryParams: { q: this.searchQuery } 
      });
      this.showSuggestions = false;
    }
  }

  onSearchSubmit(event: Event) {
    event.preventDefault();
    this.performSearch();
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
