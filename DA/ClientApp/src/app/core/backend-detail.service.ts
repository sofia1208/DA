import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from '../backend-detail/CategoryDto';
import { OrganizerDto } from '../backend-detail/OrganizerDto';

@Injectable({
  providedIn: 'root'
})
export class BackendDetailService {

  constructor(private http: HttpClient) { }
  postCategory(cat: CategoryDto): Observable<CategoryDto> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    console.log("post");
    return this.http.post<CategoryDto>(`https://localhost:5001/backend/categories`, cat, httpOptions);
  }
  putCategory(cat: CategoryDto): Observable<CategoryDto> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    console.log("put");
    return this.http.put<CategoryDto>(`https://localhost:5001/backend/categories/${cat.id}`, cat, httpOptions);

  }
  getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`https://localhost:5001/backend/categories`);

  }
  getOrganizer(): Observable<OrganizerDto[]> {
    return this.http.get<OrganizerDto[]>(`https://localhost:5001/backend/organizers`);
  }
}
