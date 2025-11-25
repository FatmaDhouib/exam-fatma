import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post, DEFAULT_POSTS } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  /** internal store of posts */
  private posts$ = new BehaviorSubject<Post[]>([...DEFAULT_POSTS]);

  constructor() {}

  /** Return the current posts as an observable (stream) */
  getPosts(): Observable<Post[]> {
    return this.posts$.asObservable();
  }

  /** Return current posts value (synchronous copy) */
  getPostsSnapshot(): Post[] {
    return [...this.posts$.getValue()];
  }

  /** Get one post by id (synchronous) */
  getPostById(id: string): Post | undefined {
    return this.posts$.getValue().find((p) => p.id === id);
  }

  /** Create a new post and emit the updated list */
  addPost(post: Post): void {
    const current = this.posts$.getValue();
    this.posts$.next([...current, post]);
  }

  /** Update an existing post by id. Returns true if update succeeded */
  updatePost(id: string, patch: Partial<Post>): boolean {
    const current = this.posts$.getValue();
    const i = current.findIndex((p) => p.id === id);
    if (i === -1) return false;
    const updated: Post = { ...current[i], ...patch };
    const next = [...current];
    next[i] = updated;
    this.posts$.next(next);
    return true;
  }

  /** Delete a post by id. Returns true if deletion succeeded */
  deletePost(id: string): boolean {
    const current = this.posts$.getValue();
    const next = current.filter((p) => p.id !== id);
    const deleted = next.length !== current.length;
    if (deleted) this.posts$.next(next);
    return deleted;
  }

  /** Replace the entire list (useful for restoring or seed data) */
  setPosts(next: Post[]): void {
    this.posts$.next([...next]);
  }
}
