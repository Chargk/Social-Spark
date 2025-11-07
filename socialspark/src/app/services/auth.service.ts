import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
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

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('auth/login', credentials);
  }

  register(data: RegisterData): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('auth/register', data);
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

