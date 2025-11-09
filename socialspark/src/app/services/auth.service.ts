import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, delay } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/user.model';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  displayName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private api: ApiService) {
    // Load user from localStorage on init
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('currentUser');
    if (token && userStr) {
      this.currentUserSubject.next(JSON.parse(userStr));
    }
  }

  /**
   * Login user
   * TODO: When backend is ready, replace with real API call
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Mock mode: simulate login
    // In real app, validate credentials and return user data
    const username = credentials.email.split('@')[0];
    const mockUser: User = {
      id: 'user-123',
      username,
      email: credentials.email,
      displayName: username.charAt(0).toUpperCase() + username.slice(1),
      avatar: undefined,
      bio: 'Passionate developer exploring SocialSpark.',
      followers: 120,
      following: 85,
      createdAt: new Date()
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    const response: AuthResponse = {
      user: mockUser,
      token: mockToken
    };
    
    // Simulate API delay
    return of(response).pipe(delay(500));
    
    // Real API mode:
    // return this.api.post<AuthResponse>('auth/login', credentials);
  }

  /**
   * Register new user
   * TODO: When backend is ready, replace with real API call
   */
  register(data: RegisterData): Observable<AuthResponse> {
    // Mock mode: simulate registration
    const mockUser: User = {
      id: 'user-' + Date.now(),
      username: data.username,
      email: data.email,
      displayName: data.displayName,
      avatar: undefined,
      bio: `Welcome to SocialSpark! I'm ${data.displayName}.`,
      followers: 0,
      following: 0,
      createdAt: new Date()
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    const response: AuthResponse = {
      user: mockUser,
      token: mockToken
    };
    
    // Simulate API delay
    return of(response).pipe(delay(600));
    
    // Real API mode:
    // return this.api.post<AuthResponse>('auth/register', data);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  setAuthData(user: User, token: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}

