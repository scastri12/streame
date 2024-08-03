import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  imgList: any[] = [];

  constructor(private spotifyService: SpotifyService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  search(term: string) {

    this.spotifyService.getItem(term).subscribe( (data: any) => {
      console.log("dataMARK: ", data);
      this.itemList = [...data.tracks.items, ...data.artists.items, ...data.albums.items ];
      let aux: any[]= [];
      this.itemList.forEach(item => {
        
        if(item.images){
          aux.push(item.images[0].url);
        } else {
          aux.push(item.album.images[0].url);
        }
        this.imgList = aux;
      });
      this.cdr.detectChanges();
      console.log(this.imgList);
    });
  }

}
