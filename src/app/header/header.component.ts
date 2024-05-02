import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddProd } from '../app-assets/interface/data';
import { ProductService } from '../app-assets/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuType: string = 'default';
  userName: string = '';
  searchResult: undefined | AddProd[];
  resetVal !:string; 
  user!:string;
  cartItems = 0;


  constructor(private route: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem("sellerInfo") && val.url.includes("seller")) {
          this.menuType = 'seller';
            let sellerStore = localStorage.getItem("sellerInfo");
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.userName = sellerData.email;
        } else if(localStorage.getItem('user')){
          this.menuType = 'user';
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.user = userData.name;
        }
        else {
          // console.log("outside seller area");
          this.menuType = 'default'
        }
      }

    });

    let cartData = localStorage.getItem('localCart');

    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }
    
    this.productService.cartUpdateData.subscribe((items)=>{
      this.cartItems = items.length;
    })

  }

  logout() {
    localStorage.removeItem('sellerInfo');
    this.route.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }

  searchProd(query: KeyboardEvent) {
    if (query) {
      const elemnt = query.target as HTMLInputElement;
      console.log(elemnt.value);
      this.productService.getSearchProd(elemnt.value).subscribe((data)=>{
        if(data.length>5){
          data.length=5;
        }
        this.searchResult = data;
        localStorage.setItem("searchResult", JSON.stringify(this.searchResult));
      })
    }
  }

  hideSearchResult(){
    this.searchResult = undefined;
  }

  getSearchVal(val:string){
    console.log(val);
    this.route.navigate([`search/${val}`]);
  }

  redirectProdDetails(id:number){
    this.route.navigate([`/product-details/${id}`]);
  }
 
}

