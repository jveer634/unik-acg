import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartServiceService } from './../services/cart-service.service';
import { ShareService } from './../share.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private router: Router, private snackbar: MatSnackBar, private share: ShareService, private fb: FormBuilder, private cartService: CartServiceService) {}
  products = [];
  discount : number = 0;
  disAmount = 0
  gst: number = 0;
  gstAmount = 0
  user: FormGroup;
  show = false;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Sno', 'name', 'quantity', 'price', 'total', 'actions' ]

  ngOnInit(): void {
    this.products = this.share.getData();
    for(let i=0; i<this.products.length; i++) {
      this.products[i].index = i;
    }
    this.dataSource = new MatTableDataSource(this.products);
    this.share.setCount(this.products.length);
    this.productTotal();
    this.createForm();
  }
  formErrors = {
    firstName: '',
    lastName: '',
    firmName: '',
    phone: '',
    aadharNumber: '',
    email: ''
  }

  validationMsgs = {
    firstName: {
      required: 'First name is required'
    },
    lastName: {
      required: 'Last name is required'
    },
    firmName: {
      required: 'Firm name is required'
    },    
    phone: {
      required: 'Mobile number is required',
      minlength: 'Mobile number should be 10 digit',
      maxlength: 'Mobile number should be 10 digit'
    },
    aadharNumber: {      
      minlength: 'Aadhar number must be a 12 digit number',
      maxlength: 'Aadhar number must be a 12 digit number'
    },
    email: {      
      email: 'Enter a valid email ID'
    }
  }

  createForm() {
    this.user = this.fb.group({
      firstName : ['', [Validators.required]],
      lastName : ['', [Validators.required]],
      firmName : ['', [Validators.required]],
      gstNumber: [''],
      phone : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      aadharNumber : ['', [ Validators.minLength(12), Validators.maxLength(12)]],
      email : ['', [Validators.email]]
    })
    this.user.valueChanges.subscribe(data => {
      this.onValueChanged(data)
    })
  }
  onValueChanged(data ?: any) {
    if (!this.user) {
      return;
    }
    const form = this.user;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previuos error messages if any
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMsgs[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key];
            }
          }
        }
      }
    }
  }

  placeorder() {
    this.show = true;
    let formValue = this.user.value;
    let pros = this.products
    // console.log(pros);
    
    for(let i=0; i<pros.length; i++) {
      delete pros[i].size1
      delete pros[i].size2
      delete pros[i].variants
      delete pros[i].is_reducing;  
      
      delete pros[i].art_number;
      delete pros[i].id;
      delete pros[i].image;
      delete pros[i].index;
      delete pros[i].price;
      delete pros[i].total;
    }
    formValue.orderitems = pros;
    formValue.discountPer = this.discount;
    formValue.gstPer = this.gst;    
    formValue.total = this.total;
    // console.log(formValue);      
    this.cartService.addOrder(formValue)   
    .subscribe(order => {
      setTimeout(() => {
        this.show = false;        
        this.snackbar.open('Order placed Succesfully.\nCheck your mail.', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }) 
        location.reload();
        setTimeout(() => {
          this.router.navigate(['product'])          
        }, 2200);
      }, 2000);
      // console.log(order);  
    })
  }

  productTotal() {
    this.total = 0;
    this.final = 0;
    for(let i=0; i<this.products.length; i++) {
      this.total += this.products[i].total;
      this.final = this.total;
    }
  }

  total: number = 0;
  final: number = 0;
  changeDiscount(dis) {
    if(dis >= 0 && dis <= 100) {
      this.productTotal();
      this.disAmount = this.total * dis /100;
      this.discount = dis;
      this.final = this.total + this.gstAmount - this.disAmount;
    } else {
      this.discount = dis;
    }
  }

  changeGst(gs) {
    if(gs >= 0 && gs <= 100) {
      this.gst = gs;
      this.productTotal();
      this.gstAmount = (this.total-this.disAmount) * gs / 100;    
      this.final = this.total + this.gstAmount - this.disAmount;
    } else {
      this.gst = gs;
    }
  }

  update(d, g, val, index) {        
    if(val > 0) {
      this.products[index].quantity = Number.parseInt(val);
      this.products[index].total = this.products[index].quantity*this.products[index].price;
      this.productTotal();
      this.changeDiscount(d);
      this.changeGst(g);
    }
  }

  decrease(d, g, index) {    
    if(this.products[index].quantity > 1)
      this.products[index].quantity -= 1;
    this.products[index].total = this.products[index].quantity*this.products[index].price;
    this.productTotal();
    this.changeDiscount(d);
    this.changeGst(g);
    this.final = this.total;
  }

  increase(d, g, index) {
    this.products[index].quantity += 1;
    this.products[index].total = this.products[index].quantity*this.products[index].price;
    this.productTotal();
    this.changeDiscount(d);
    this.changeGst(g);
    this.final = this.total;
  }

  delete(d, g, index) {
    this.products.splice(index, 1);
    if(this.products.length == 0) {
      this.discount = 0;
      this.gst = 0;
    }
    this.ngOnInit();
    this.productTotal();
    this.changeDiscount(d);
    this.changeGst(g);
  }
}