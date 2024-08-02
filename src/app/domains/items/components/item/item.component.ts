import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  standalone: true,
  imports: [CommonModule],

})
export class ItemComponent implements OnInit {

  @Input() items: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
