import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  url = "https://api.spotify.com/v1/search?q=";

  constructor(private http: HttpClient) {}

  getNewReleases() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    console.log(headers);
    return this.http.get( "https://api.spotify.com/v1/browse/new-releases?limit=20", { headers });

  }

  getItem(search: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    return this.http.get(this.url + search + "&type=track,artist,album", { headers });

  }

  getArtist(id: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    return this.http.get(`https://api.spotify.com/v1/artists/${id}`, { headers });

  }
}
