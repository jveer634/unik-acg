import { ProductServiceService } from './../services/product-service.service';
import { ShareService } from './../share.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products = [];
  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private share: ShareService,
    private productService: ProductServiceService
  ) {}
  search = '';
  size2 = [];
  size1 = [];
  selected = 'basic';

  price: number = 0;
  ngOnInit(): void {
    this.size2 = [];
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      let arr = [];
      for (let i = 0; i < this.products.length; i++) {
        arr = [];
        for (let j = 0; j < this.products[i].variants.length; j++) {
          if (!arr.includes(this.products[i].variants[j].size))
            arr.push(this.products[i].variants[j].size);
        }
        this.products[i].size1 = arr;
      }
    });
  }
  find(val) {
    if (val == 'all') this.search = '';
    else this.search = val;
  }

  performFilter(filterBy: string) {
    if (filterBy) {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product) => {
        return product.name.toLowerCase().startsWith(filterBy);
      });
    } else {
      return this.products;
    }
  }

  size1change(size, index) {
    this.size2 = [];
    this.products[index].size2 = [];
    this.products[index].price = '';
    this.price = 0;
    this.index = index;
    if (this.products[index].is_reducing == true) {
      for (let i = 0; i < this.products[index].variants.length; i++) {
        if (this.products[index].variants[i].size == size) {
          this.size2.push(this.products[index].variants[i].reduced_size);
        }
      }
      this.products[index].size2 = this.size2;
    }
    if (this.products[index].is_reducing == false) {
      for (let i = 0; i < this.products[index].variants.length; i++) {
        if (this.products[index].variants[i].size == size) {
          this.price = this.products[index].variants[i].price;
        }
      }
      this.products[index].price = this.price;
    }
  }
  index: number;
  size2sel = 0;
  size2change(index, size1, size2) {
    // console.log(size1, size2, index);
    this.index = index;
    this.size2sel = size2;
    for (let i = 0; i < this.products[index].variants.length; i++) {
      if (
        this.products[index].variants[i].size == size1 &&
        this.products[index].variants[i].reduced_size == size2
      ) {
        this.price = this.products[index].variants[i].price;
      }
    }
    this.products[index].price = this.price;
  }
  cart(quant, index, size1, size2) {
    this.products[index].quantity = Number.parseInt(quant);
    this.products[index].unitPrice = this.price;
    this.products[index].size = size1;
    if (size2 == undefined && this.products[index].is_reducing == true) {
      this.products[index].size += " x " + this.size2sel;
    }
    this.products[index].total =
      this.products[index].quantity * this.products[index].unitPrice;
    this.products[index].articleNumber = this.products[index].art_number;
    this.share.setData(this.products[index]);
    this.ngOnInit();
    this.snackbar.open('Product added to cart successfully', '', {
      duration: 1500,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
    this.router.navigate(['product']);
  }
}
