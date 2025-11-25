import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { PostItemComponent } from '../post-item/post-item.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostItemComponent],
  template: `
    <div class="container mt-3">
      <h2>Liste des posts</h2>

      <div class="accordion" id="postsAccordion">
        <ng-container *ngIf="posts$ | async as posts">
          <div class="accordion-item" *ngFor="let post of posts; let i = index">
            <h2 class="accordion-header" [id]="'heading' + i">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                [attr.data-bs-target]="'#collapse' + i"
                [attr.aria-controls]="'collapse' + i"
                aria-expanded="false"
              >
                {{ post.titre }}
              </button>
            </h2>
            <div
              [id]="'collapse' + i"
              class="accordion-collapse collapse"
              [attr.aria-labelledby]="'heading' + i"
              data-bs-parent="#postsAccordion"
            >
              <div class="accordion-body">
                <app-post-item [post]="post"></app-post-item>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export class PostListComponent {
  posts$!: Observable<import("../../models/post.model").Post[]>;

  constructor(private postService: PostService) {
    this.posts$ = this.postService.getPosts();
  }
}
