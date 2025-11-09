import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { SearchResult, SearchResponse, SearchResultType } from '../../models/search.model';
import { catchError, of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'spark-search',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class SearchComponent implements OnInit {
  searchQuery = '';
  searchResults: SearchResult[] = [];
  isLoading = false;
  error: string | null = null;
  totalResults = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    // Get search query from URL
    this.route.queryParams.subscribe(params => {
      const query = params['q'];
      if (query) {
        this.searchQuery = query;
        this.performSearch();
      }
    });
  }

  performSearch() {
    if (!this.searchQuery.trim()) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.searchService.search(this.searchQuery).pipe(
      catchError(error => {
        console.error('Search error:', error);
        this.error = 'Failed to perform search. Please try again.';
        this.isLoading = false;
        return of({ query: this.searchQuery, results: [], total: 0 });
      })
    ).subscribe((response: SearchResponse) => {
      this.searchResults = response.results;
      this.totalResults = response.total;
      this.isLoading = false;
    });
  }

  onSearchSubmit(event: Event) {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { 
        queryParams: { q: this.searchQuery } 
      });
    }
  }

  getIconForType(type: SearchResultType): string {
    switch (type) {
      case SearchResultType.Post:
        return 'article';
      case SearchResultType.User:
        return 'person';
      case SearchResultType.Group:
        return 'group';
      default:
        return 'search';
    }
  }

  navigateToResult(result: SearchResult) {
    // Navigate based on result type
    switch (result.type) {
      case SearchResultType.Post:
        // Navigate to post detail (future implementation)
        console.log('Navigate to post:', result.id);
        break;
      case SearchResultType.User:
        this.router.navigate(['/profile'], { 
          queryParams: { userId: result.id } 
        });
        break;
      case SearchResultType.Group:
        // Navigate to group (future implementation)
        console.log('Navigate to group:', result.id);
        break;
    }
  }
}

