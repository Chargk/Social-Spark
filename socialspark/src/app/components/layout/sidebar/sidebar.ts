import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'spark-sidebar',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  /**
   * Focus the post input field when "Create Post" button is clicked
   * This scrolls to the input and focuses it for better UX
   */
  focusPostInput(): void {
    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      const postInput = document.getElementById('post-input-field');
      if (postInput) {
        // Scroll to the input smoothly
        postInput.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        
        // Focus the input after a small delay to ensure scroll completes
        setTimeout(() => {
          postInput.focus();
        }, 300);
      }
    }, 0);
  }
}
