import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  static count: any = 0;
  
  constructor(private router: Router) { }
  data = {}
  products = []
  setData(product) {
    
    this.products.push(product);
    // console.log(this.products);
  }

  getData() {
    return this.products;
  }

  setCount(num) {
    ShareService.count = num;
    // console.log('set count', ShareService.count);
    // console.log(this.getCount());
    
    // var ap = new AppComponent(this.router, new ShareService(this.router));
    // ap.ngOnInit();
  }

  getCount() {
    return ShareService.count;
  }
}
