
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/posts",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/posts"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "redirectTo": "/posts",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5026, hash: '214f113bb4b93208ee73e92ae7c6add071da315d3c0a0d3d5f63b514862bdde9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 999, hash: 'e83da729d1865828ef4aca353ca2f8587575be471cc8f2d374a72cc50dd4fff5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 12950, hash: '5efce6ab611879567c6dced60ef53ee9c42d2b6a290f616db8571ea36949c18b', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'posts/index.html': {size: 20214, hash: 'fdcd3aa7ce3e2df044cc21d9a6857302c2f114a77d860b45621abdfd8d506153', text: () => import('./assets-chunks/posts_index_html.mjs').then(m => m.default)},
    'styles-JG7EAGFK.css': {size: 230853, hash: 'YlmivfEfBiI', text: () => import('./assets-chunks/styles-JG7EAGFK_css.mjs').then(m => m.default)}
  },
};
