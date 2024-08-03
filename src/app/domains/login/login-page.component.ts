import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  template: '',
  standalone: true,
  imports: [CommonModule],
})
export class LoginPageComponent implements OnInit {
  hashed: any;
  codeChallenge: any;
  codeVerifier: any;

  clientId = '07c01d0e90ee40189375a893c8478760';
  redirectUri = 'http://localhost:4200/home';

  scope = 'user-read-private user-read-email';
  authUrl = new URL('https://accounts.spotify.com/authorize');

  constructor() {}

  async ngOnInit() {
    this.codeVerifier = this.generateRandomString(64);
    this.hashed = await this.sha256(this.codeVerifier);
    this.codeChallenge = this.base64encode(this.hashed);

    const params = {
      response_type: 'code',
      client_id: this.clientId,
      scope: this.scope,
      code_challenge_method: 'S256',
      code_challenge: this.codeChallenge,
      redirect_uri: this.redirectUri,
    };

    this.authUrl.search = new URLSearchParams(params).toString();

    // generated in the previous step
    window.localStorage.setItem('code_verifier', this.codeVerifier);

    window.location.href = this.authUrl.toString();
  }

  generateRandomString(length: number) {
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
  }

  sha256 = async (plain: any) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  };

  base64encode = (input: any) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };
}
