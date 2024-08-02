import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/domains/shared/components/header/header.component';
import { SpotifyService } from './../../../shared/services/spotify.service';
import { ItemComponent } from '../../components/item/item.component';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, ItemComponent],
})
export class SearchItemComponent implements OnInit {

  itemList: any[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }

  search(term: string) {

    this.spotifyService.getItem(term).subscribe( (data: any) => {
      console.log("dataMARK: ", data);
      this.itemList = data.albums.items;
    });
  }

}
