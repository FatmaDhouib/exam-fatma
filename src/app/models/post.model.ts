export interface Post {
  id: string;
  titre: string;
  contenu: string;
}

export const DEFAULT_POSTS: Post[] = [
  { id: '1', titre: 'Premier post', contenu: 'détails premier post' },
  { id: '2', titre: 'Deuxième post', contenu: 'détails deuxième post' },
  { id: '3', titre: 'Troisième post', contenu: 'détails troisième post' },
];
