import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  url = "https://api.spotify.com/v1/browse/new-releases";
  authorization = 'Bearer BQBVxmEPYe6wXX7RQBv3zdO0NRqqhmNci8GcCrO6M3bwgGIRsluG021rfObIGYiqLi1g17ONWytttJ1WvQt0InPzg2IJ3U6XEoSDTyJvu7u1I4OKbZc';

  constructor(private http: HttpClient) {}

  getItem() {
    const headers = new HttpHeaders({
      'Authorization': this.authorization
    });
    this.http.get(this.url, { headers }).subscribe( data => {
      console.log("data: ", data);
    });

  }
}
