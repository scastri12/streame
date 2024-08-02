import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  standalone: true,
  imports: [CommonModule],

})
export class ItemComponent implements OnInit {

  @Input() items: any[] = [];

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  viewDetail( item: any) {

    let artistId;

    if(item.Type === 'artist') {
      artistId = item.id;
    } else {
      artistId = item.artists[0].id;
    }

    this.router.navigate(['/detail', artistId]);

  }

}
