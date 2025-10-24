import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header';
import { SidebarComponent } from './components/layout/sidebar/sidebar';

@Component({
  selector: 'spark-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('SocialSpark');
}
