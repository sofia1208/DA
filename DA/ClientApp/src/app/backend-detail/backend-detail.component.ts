import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-backend-detail',
  templateUrl: './backend-detail.component.html',
  styleUrls: ['./backend-detail.component.css']
})
export class BackendDetailComponent implements OnInit {
  detailId: Number;
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(p => {
      this.detailId = p["id"];
      console.log(this.detailId);
    })
   }

  ngOnInit() {
  }

}
