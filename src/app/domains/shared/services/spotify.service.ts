import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  url = "https://api.spotify.com/v1/search?q=";
  authorization = 'Bearer ' + localStorage.getItem('access_token');

  constructor(private http: HttpClient) {}

  getItem(search: string) {
    this.authorization = 'Bearer ' + localStorage.getItem('access_token');
    console.log("auth: ", localStorage.getItem('access_token'));
    const headers = new HttpHeaders({
      'Authorization': this.authorization
    });
    return this.http.get(this.url + search + "&type=track,artist,album", { headers });

  }
}
