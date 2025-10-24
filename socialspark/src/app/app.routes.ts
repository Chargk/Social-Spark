import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'explore', loadComponent: () => import('./pages/explore/explore').then(m => m.ExploreComponent) },
  { path: 'messages', loadComponent: () => import('./pages/messages/messages').then(m => m.MessagesComponent) },
  { path: 'notifications', loadComponent: () => import('./pages/notifications/notifications').then(m => m.NotificationsComponent) },
  { path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.ProfileComponent) },
  { path: 'groups', loadComponent: () => import('./pages/groups/groups').then(m => m.GroupsComponent) },
  { path: 'events', loadComponent: () => import('./pages/events/events').then(m => m.EventsComponent) },
  { path: '**', redirectTo: '/home' }
];
