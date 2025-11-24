import { Injectable } from '@angular/core';
import { Observable, of, delay, map, catchError } from 'rxjs';
import { ApiService } from './api.service';
import { SearchResult, SearchResponse, SearchResultType } from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private apiService: ApiService) {}

  /**
   * Search across posts, users, and groups
   * Currently uses mock data. When backend is ready, uncomment the real API call.
   */
  search(query: string, type?: SearchResultType): Observable<SearchResponse> {
    // Mock mode: return mock search results (for development)
    const results = this.generateMockResults(query);
    
    const response: SearchResponse = {
      query: query,
      results: results,
      total: results.length
    };
    
    return of(response).pipe(delay(400));
    
    // Real API mode (uncomment when backend is ready):
    // const params: any = { q: query };
    // if (type) {
    //   params.type = type;
    // }
    // return this.apiService.get<SearchResponse>('search', params).pipe(
    //   catchError(error => {
    //     console.error('Search error:', error);
    //     return of({ query, results: [], total: 0 });
    //   })
    // );
  }

  /**
   * Get search suggestions (autocomplete)
   * Currently uses mock data. When backend is ready, uncomment the real API call.
   */
  getSuggestions(query: string): Observable<SearchResult[]> {
    // Mock mode: return mock suggestions (for development)
    const suggestions = this.generateMockSuggestions(query);
    
    return of(suggestions).pipe(delay(200));
    
    // Real API mode (uncomment when backend is ready):
    // if (!query || query.length < 2) {
    //   return of([]);
    // }
    // return this.apiService.get<SearchResult[]>(`search/suggestions`, { q: query }).pipe(
    //   catchError(error => {
    //     console.error('Suggestions error:', error);
    //     return of([]);
    //   })
    // );
  }

  /**
   * Generate mock search results
   */
  private generateMockResults(query: string): SearchResult[] {
    const normalizedQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    // Mock posts
    const mockPosts = [
      { id: 'post-1', title: 'JavaScript Tutorial', content: 'Learn JavaScript from scratch', author: 'John Doe' },
      { id: 'post-2', title: 'React Development Guide', content: 'Build modern web apps with React', author: 'Sarah Wilson' },
      { id: 'post-3', title: 'Angular Tips and Tricks', content: 'Advanced Angular patterns', author: 'Mike Johnson' },
      { id: 'post-4', title: 'Web Development Best Practices', content: 'Tips for better web development', author: 'Alice Smith' }
    ];

    // Mock users
    const mockUsers = [
      { id: 'user-1', username: 'johndoe', name: 'John Doe', bio: 'Web developer' },
      { id: 'user-2', username: 'sarahwilson', name: 'Sarah Wilson', bio: 'Frontend engineer' },
      { id: 'user-3', username: 'mikejohnson', name: 'Mike Johnson', bio: 'Full-stack developer' },
      { id: 'user-4', username: 'alicesmith', name: 'Alice Smith', bio: 'UI/UX designer' }
    ];

    // Mock groups
    const mockGroups = [
      { id: 'group-1', name: 'Tech Enthusiasts', description: 'A community for tech lovers', members: 1234 },
      { id: 'group-2', name: 'Web Development', description: 'Learn and share web dev knowledge', members: 5678 },
      { id: 'group-3', name: 'Design Community', description: 'Designers sharing their work', members: 2345 },
      { id: 'group-4', name: 'JavaScript Developers', description: 'JS developers community', members: 3456 }
    ];

    // Filter and add posts
    mockPosts.forEach(post => {
      if (post.title.toLowerCase().includes(normalizedQuery) || 
          post.content.toLowerCase().includes(normalizedQuery)) {
        results.push({
          id: post.id,
          type: SearchResultType.Post,
          title: post.title,
          subtitle: `By ${post.author}`,
          metadata: { content: post.content, author: post.author }
        });
      }
    });

    // Filter and add users
    mockUsers.forEach(user => {
      if (user.username.toLowerCase().includes(normalizedQuery) || 
          user.name.toLowerCase().includes(normalizedQuery)) {
        results.push({
          id: user.id,
          type: SearchResultType.User,
          title: user.name,
          subtitle: `@${user.username}`,
          metadata: { bio: user.bio }
        });
      }
    });

    // Filter and add groups
    mockGroups.forEach(group => {
      if (group.name.toLowerCase().includes(normalizedQuery) || 
          group.description.toLowerCase().includes(normalizedQuery)) {
        results.push({
          id: group.id,
          type: SearchResultType.Group,
          title: group.name,
          subtitle: `${group.members} members`,
          metadata: { description: group.description, members: group.members }
        });
      }
    });

    return results.slice(0, 20); // Limit to 20 results
  }

  /**
   * Generate mock search suggestions
   */
  private generateMockSuggestions(query: string): SearchResult[] {
    const normalizedQuery = query.toLowerCase();
    const suggestions: SearchResult[] = [];

    const allSuggestions = [
      { text: 'JavaScript Tutorial', type: SearchResultType.Post, icon: 'article' },
      { text: 'React Development', type: SearchResultType.Post, icon: 'article' },
      { text: 'John Doe', type: SearchResultType.User, icon: 'person' },
      { text: 'Tech Enthusiasts', type: SearchResultType.Group, icon: 'group' },
      { text: 'Web Development', type: SearchResultType.Group, icon: 'group' },
      { text: 'Angular Tips', type: SearchResultType.Post, icon: 'article' },
      { text: 'Sarah Wilson', type: SearchResultType.User, icon: 'person' },
      { text: 'Design Community', type: SearchResultType.Group, icon: 'group' }
    ];

    allSuggestions.forEach(suggestion => {
      if (suggestion.text.toLowerCase().includes(normalizedQuery)) {
        suggestions.push({
          id: `suggestion-${suggestions.length}`,
          type: suggestion.type,
          title: suggestion.text
        });
      }
    });

    return suggestions.slice(0, 5); // Limit to 5 suggestions
  }
}

