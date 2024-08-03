import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './../../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { SpotifyService } from './../../../shared/services/spotify.service';
import { ItemComponent } from '../../components/item/item.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, ItemComponent],
})
export class ItemListComponent implements OnInit {
  urlParams: any;
  code!: string;
  codeVerifier: any;

  itemList: any[] = [];
  imgList: any[] = [];


  constructor(private spotifyService: SpotifyService) {}

  async ngOnInit(): Promise<void> {
    console.log('local: ', localStorage.getItem('access_token'));

    if (localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === 'undefined') {
      this.urlParams = new URLSearchParams(window.location.search);
      this.code = this.urlParams.get('code');
      await this.getToken(this.code);
    }
    this.spotifyService.getNewReleases().subscribe({
      next: (data: any) => {
        console.log('data: ', data);
        this.itemList = data.albums.items;
        this.itemList.forEach(item => {
          this.imgList.push(item.images[0].url);
        });
      },
      error: async (err) => {
        console.error('An error occurred while fetching new releases', err);
        // Aquí puedes manejar el error de manera apropiada
        this.urlParams = new URLSearchParams(window.location.search);
      this.code = this.urlParams.get('code');
      await this.getToken(this.code);
        
      },
      complete: () => {
        console.log('Data fetching complete');
      }
    });
    
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
    console.log('authv1: ', localStorage.getItem('access_token'));
  };
}
