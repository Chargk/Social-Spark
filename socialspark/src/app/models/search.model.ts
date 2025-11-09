/**
 * Search result types
 */
export enum SearchResultType {
  Post = 'Post',
  User = 'User',
  Group = 'Group'
}

/**
 * Search result model
 */
export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle?: string;
  image?: string;
  metadata?: any;
}

/**
 * Search response model
 */
export interface SearchResponse {
  query: string;
  results: SearchResult[];
  total: number;
}

