import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/domains/shared/services/spotify.service';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DetailItemComponent implements OnInit {

  artist: any = {};
  constructor(
    private router: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {
    this.router.params.subscribe((params) => {
      this.getArtist(params['id']);
    });
  }

  ngOnInit(): void {}

  getArtist(id: string) {
    this.spotifyService.getArtist(id).subscribe( artist => {
      console.log("artista: ", artist);
      this.artist = artist;
    })
  }
}
