# ExamFatma

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Bootstrap integration

This project uses Bootstrap installed from npm. I wired it into the Angular build so you can use its styles and JS features globally.

- CSS is included in `angular.json` styles:

```json
"styles": [
	"node_modules/bootstrap/dist/css/bootstrap.min.css",
	"src/styles.css"
]
```

- The Bootstrap bundle (including Popper) is included in the `scripts` array so Bootstrap JS components work:

```json
"scripts": [
	"node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

Quick verification: start the dev server and open http://localhost:4200 (or a different port if 4200 is busy). The landing page includes a small Bootstrap alert/button as a quick visual test.

If you prefer to import CSS inside `src/styles.css` instead, you can add:

```css
@import "~bootstrap/dist/css/bootstrap.min.css";
```

If you want to use specific Bootstrap JS features via ES imports, import from `bootstrap` in your main.ts (or a component) instead of using the global `scripts` entry.

## Exemple : service Angular pour gérer les posts

J'ai ajouté un service simple pour gérer une liste locale de posts (CRUD). Le fichier service est : `src/app/services/post.service.ts` et le modèle est `src/app/models/post.model.ts`.

Exemple d'utilisation dans un composant :

```ts
// app.ts
import { Component, signal } from '@angular/core';
import { PostService } from './services/post.service';

@Component({ /* ... */ })
export class App {
	posts = this.postService.getPosts(); // Observable<Post[]>

	constructor(private postService: PostService) {}
}
```

Dans un template :

```html
<ul *ngIf="posts | async as list">
	<li *ngFor="let p of list">{{ p.titre }} — {{ p.contenu }}</li>
</ul>
```

Le service expose aussi des méthodes synchrones utiles : `getPostsSnapshot()`, `getPostById(id)`, `addPost(post)`, `updatePost(id, patch)` et `deletePost(id)`.

## Backend & REST API (Express)

I added a lightweight Express server at the project root (`server.js`) which exposes a small REST API used by the Angular app:

- GET /postList — returns the posts list (JSON) used by `PostService`.
- GET /_health — basic health-check endpoint.

The server also serves the built Angular application when the `backend/www` folder is present (the production build output).

Quick check of the API (run the server then in another shell):

```bash
# start the server (server.js)
npm run start-server

# Then fetch the posts
curl http://localhost:3000/postList
```

Example JSON response:

```json
{
	"data": [
		{ "id": "1", "titre": "Premier post", "contenu": "détails premier post" },
		{ "id": "2", "titre": "Deuxième post", "contenu": "détails deuxième post" },
		{ "id": "3", "titre": "Troisième post", "contenu": "détails troisième post" }
	]
}
```

## PostService (HTTP)

The front-end `PostService` was updated to use Angular's `HttpClient`. On startup the service requests `/postList` and populates its in-memory store. In the absence of a reachable backend it falls back to the built-in `DEFAULT_POSTS` list — this keeps the app functional offline.

Files of interest:

- `src/app/services/post.service.ts` — now uses `HttpClient` and fetches `/postList` on construction
- `src/app/services/post.service.spec.ts` — tests updated to use `HttpClientTestingModule`

## Build & serve under backend/www

There's a convenience build script that writes the production build into `backend/www`, which the Express server will serve:

```bash
# build angular to backend/www
npm run build:backend

# then start the express server to serve both static files and the API
npm run start-server

# Open http://localhost:3000 in your browser (SPA served + API endpoints)
```

## Notes / Tips

- Development: when running `ng serve` the app runs on port 4200; you may want to setup a proxy (`proxy.conf.json`) to forward `/postList` to `http://localhost:3000` while developing.
- The branch with these changes is `version2` (pushed to the repository). Run your usual git commands to switch/review.


