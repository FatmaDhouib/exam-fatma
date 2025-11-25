const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// small in-memory posts list (same as DEFAULT_POSTS)
const postList = [
  { id: '1', titre: 'Premier post', contenu: 'détails premier post' },
  { id: '2', titre: 'Deuxième post', contenu: 'détails deuxième post' },
  { id: '3', titre: 'Troisième post', contenu: 'détails troisième post' },
];

// enable JSON body parsing
app.use(express.json());

// very small CORS helper for local dev (allow all origins)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// GET /postList returns the in-memory posts list
app.get('/postList', (req, res) => {
  res.json({ data: postList });
});

// health check
app.get('/_health', (req, res) => res.json({ ok: true }));

// serve static Angular build (prefer backend/www if present, else fallback to dist)
const staticDirs = [path.join(__dirname, 'backend', 'www'), path.join(__dirname, 'dist')];
for (const dir of staticDirs) {
  try {
    // Register the folder if it exists
    const fs = require('fs');
    if (fs.existsSync(dir)) {
      app.use(express.static(dir));
      // serve index.html for any unknown route so SPA routing works
      app.get('*', (req, res) => res.sendFile(path.join(dir, 'index.html')));
      break;
    }
  } catch (e) {
    // ignore
  }
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});
