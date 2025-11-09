import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService, LoginCredentials } from '../../../services/auth.service';
import { catchError, of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'spark-login',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  credentials: LoginCredentials = {
    email: '',
    password: ''
  };
  
  isLoading = false;
  error: string | null = null;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.credentials.email || !this.credentials.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.authService.login(this.credentials).pipe(
      catchError(error => {
        console.error('Login error:', error);
        this.error = 'Invalid email or password';
        this.isLoading = false;
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        // Save auth data
        this.authService.setAuthData(response.user, response.token);
        // Redirect to home
        this.router.navigate(['/home']);
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

