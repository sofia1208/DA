import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BackendDetailDto } from './BackendDetailDto';
@Component({
  selector: 'app-backend-detail',
  templateUrl: './backend-detail.component.html',
  styleUrls: ['./backend-detail.component.css']
})
export class BackendDetailComponent implements OnInit {
  detailId: Number;
  street: string;
  streetNumber: string;
  zipCode: string;
  city: string;
  country: string;
  catName: string = "";
  backendDto: BackendDetailDto;
  organizer: string[] = ["moveIT Software GmbH"];
  contactPerson: string;
  email: string;
  website: string;
  phone: string;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(p => {
      this.detailId = p["id"];
      console.log(this.detailId);
    })
   }
  category: string[] = [
    "moveIT@ISS+Grundlagen",
    "moveIT@ISS+Workshop",
    "moveIT@ISS+Administrator",
    "moveIT@ISS+Kombimodell"
  ];
  ngOnInit() {
  
      this.getDetails();
    
  
  }
  fillDetails() {
    this.street= this.backendDto.street;
    this.streetNumber = this.backendDto.streetNumber.toString();
    this.zipCode = this.backendDto.zipCode.toString();
    this.city = this.backendDto.city;
    this.country = this.backendDto.country;
    this.catName = this.backendDto.name;
    
  }
  getDetails() {
    this.getDetail(`https://localhost:5001/backend/schoolings/${this.detailId}`)
      .subscribe(data => {
        this.backendDto = data;
        console.log(data);

        this.fillDetails();

      })
  }
  private getDetail(url: string): Observable<BackendDetailDto> {
    return this.http.get<BackendDetailDto>(url);

  }
  addSchooling() {

  }

}
