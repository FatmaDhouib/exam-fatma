import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ post.titre }}</h5>
        <p class="card-text">{{ post.contenu }}</p>
      </div>
    </div>
  `,
})
export class PostItemComponent {
  @Input({ required: true }) post!: Post;
}
