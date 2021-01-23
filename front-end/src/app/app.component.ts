import { ShareService } from './share.service';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  count: number = 0;
  
  constructor(private router: Router, private share: ShareService) {}

  ngOnInit() {
    // console.log('app');
    // console.log(this.share.getCount());
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        document.getElementById("top").scrollIntoView();
      }
    })
    // this.count = this.share.getCount();
    // this.ngOnChange()
    // console.log('count: ',this.count);
    // this.count += 1;
    // console.log(this.count);
    
  }
  ngOnChange() {
    this.count = this.share.getCount();
    // console.log(this.count);
    
  }
 
  cart() {
    this.router.navigate(['cart']);
  }
  home() {
    this.router.navigate(['product']);
  }
}
