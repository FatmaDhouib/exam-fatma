import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Login Page</h2>
      <p>Veuillez vous connecter pour accéder aux fonctionnalités protégées.</p>
    </div>
  `,
})
export class LoginComponent {}
