import { PostService } from './post.service';
import { DEFAULT_POSTS, Post } from '../models/post.model';

describe('PostService (unit tests)', () => {
  let svc: PostService;

  beforeEach(() => {
    svc = new PostService();
  });

  it('should return the default posts via snapshot', () => {
    const snapshot = svc.getPostsSnapshot();
    expect(snapshot.length).toBe(DEFAULT_POSTS.length);
    expect(snapshot[0].titre).toContain('Premier');
  });

  it('should allow adding a post', () => {
    const newPost: Post = { id: 'x', titre: 'Nouveau', contenu: 'contenu' };
    svc.addPost(newPost);
    const snapshot = svc.getPostsSnapshot();
    expect(snapshot.find((p) => p.id === 'x')).toBeTruthy();
  });

  it('should update an existing post', () => {
    const ok = svc.updatePost('1', { titre: 'Premier modifié' });
    expect(ok).toBe(true);
    const p = svc.getPostById('1')!;
    expect(p.titre).toBe('Premier modifié');
  });

  it('should delete a post', () => {
    const before = svc.getPostsSnapshot().length;
    const deleted = svc.deletePost('2');
    expect(deleted).toBe(true);
    expect(svc.getPostsSnapshot().length).toBe(before - 1);
  });
});
