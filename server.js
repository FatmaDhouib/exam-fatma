const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Liste des posts (comme dans l'examen)
const postList = [
  { id: '1', titre: "Premier post", contenu: 'détails premier post' },
  { id: '2', titre: "Deuxième post", contenu: 'détails deuxième post' },
  { id: '3', titre: "Troisième post", contenu: 'détails troisième post' }
];

// API demandée dans l'examen (point 9)
app.get('/postList', (req, res) => {
  res.json(postList);
});

// Important : Autoriser les requêtes depuis Angular (CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Servir les fichiers statiques du build Angular (point 12)
app.use(express.static(path.join(__dirname, 'backend/www')));

// Rediriger toutes les autres routes vers index.html (pour le routing Angular)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'backend/www/index.html'));
});

app.listen(port, () => {
  console.log(`Serveur Node/Express démarré sur http://localhost:${port}`);
  console.log(`API disponible sur http://localhost:${port}/postList`);
});