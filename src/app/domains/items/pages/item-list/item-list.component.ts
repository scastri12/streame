import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "./../../../shared/components/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent]

})
export class ItemListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
