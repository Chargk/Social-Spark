import { Component } from '@angular/core';
import { PostListComponent } from '../../components/posts/post-list/post-list';

@Component({
  selector: 'spark-home',
  imports: [PostListComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
