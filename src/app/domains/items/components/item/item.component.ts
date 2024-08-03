import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
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
  @Input() imgList: any[] = [];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('imagenes', this.imgList);
    this.cdr.detectChanges();
  }

  viewDetail(item: any) {
    console.log('itemtype: ', Array.isArray(item.artists));

    let artistId;

    if (!Array.isArray(item.artists)) {
      artistId = item.id;
    } else {
      artistId = item.artists[0]?.id;

      console.log('entro: ', item.Type);
    }

    this.router.navigate(['/detail', artistId]);
  }
}
