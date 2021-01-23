import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }
  baseURL:string = 'https://unik-server.herokuapp.com/';
  devServer: string = 'http://localhost:8000/api/';
  
  getProducts(): Observable<any> {
    return this.http.get(this.baseURL + 'products/');
  }

  // addProduct(product): Observable<any> {
  //   return this.http.post(this.baseURL + 'products', product);
  // }

  // updateProduct(id): Observable<any> {
  //   return this.http.put(this.baseURL + 'products', id);
  // }
  //  deleteProduct(id): Observable<any> {
  //    return this.http.delete(this.baseURL + 'products', id)
  //  }

  //  getProductById(id): Observable<any> {
  //    return this.http.get(this.baseURL + 'products' + id);
  //  }


}
