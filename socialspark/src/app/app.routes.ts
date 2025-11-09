import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProfileComponent } from './pages/profile/profile';
import { ExploreComponent } from './pages/explore/explore';
import { MessagesComponent } from './pages/messages/messages';
import { NotificationsComponent } from './pages/notifications/notifications';
import { GroupsComponent } from './pages/groups/groups';
import { EventsComponent } from './pages/events/events';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import { SearchComponent } from './pages/search/search';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/home' }
];
