import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './../../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { SpotifyService } from './../../../shared/services/spotify.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent],
})
export class ItemListComponent implements OnInit {
  urlParams: any;
  code: string = '';
  codeVerifier: any;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.spotifyService.getItem();
    this.urlParams = new URLSearchParams(window.location.search);
    this.code = this.urlParams.get('code');
    this.getToken(this.code);
  }

  getToken = async (code: string) => {
    // stored in the previous step

    this.codeVerifier = localStorage.getItem('code_verifier');

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: '07c01d0e90ee40189375a893c8478760',
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:4200/home',
        code_verifier: this.codeVerifier,
      }),
    };

    const body = await fetch('https://accounts.spotify.com/api/token', payload);
    const response = await body.json();

    localStorage.setItem('access_token', response.access_token);
  };
}
