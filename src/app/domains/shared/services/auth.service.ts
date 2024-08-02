import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = 'YOUR_CLIENT_ID';
  private redirectUri = 'http://localhost:4200/'; // Debe coincidir con el URI configurado en Spotify Dashboard
  private authEndpoint = 'https://accounts.spotify.com/authorize';
  private tokenEndpoint = 'https://accounts.spotify.com/api/token';
  private scopes = 'user-read-private user-read-email'; // Modifica según los permisos necesarios
  private accessToken: string | null = null;

  constructor(private http: HttpClient) { }

  getAuthorizationUrl(): string {
    const params = new HttpParams()
      .set('response_type', 'code')
      .set('client_id', this.clientId)
      .set('redirect_uri', this.redirectUri)
      .set('scope', this.scopes);
    return `${this.authEndpoint}?${params.toString()}`;
  }

  getToken(code: string): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('client_id', this.clientId)
      .set('client_secret', 'YOUR_CLIENT_SECRET');

    return this.http.post(this.tokenEndpoint, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).pipe(
      tap((response: any) => this.accessToken = response.access_token),
      catchError(error => {
        console.error('Error getting token:', error);
        return of(null);
      })
    );
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }
}