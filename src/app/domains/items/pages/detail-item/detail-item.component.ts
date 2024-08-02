import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DetailItemComponent implements OnInit {

  constructor(private router: ActivatedRoute) { 
    this.router.params.subscribe( params => {
      
    })
  }

  ngOnInit(): void {
  }

}
