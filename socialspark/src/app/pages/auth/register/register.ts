import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService, RegisterData } from '../../../services/auth.service';
import { catchError, of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'spark-register',
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
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  registerData: RegisterData = {
    username: '',
    email: '',
    password: '',
    displayName: ''
  };
  
  confirmPassword = '';
  isLoading = false;
  error: string | null = null;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    // Validation
    if (!this.registerData.username || !this.registerData.email || 
        !this.registerData.password || !this.registerData.displayName) {
      this.error = 'Please fill in all fields';
      return;
    }

    if (this.registerData.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    if (this.registerData.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.authService.register(this.registerData).pipe(
      catchError(error => {
        console.error('Registration error:', error);
        this.error = 'Registration failed. Please try again.';
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

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}

