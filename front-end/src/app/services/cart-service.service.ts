import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private http: HttpClient) { }
  devServer = "http://localhost:8000/api/";
  baseURL = "https://unik-server.herokuapp.com/"

  addOrder(order): Observable<any> {
    return this.http.post(this.baseURL + 'place-order/', order);
  }
}
