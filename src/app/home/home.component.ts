import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../app-assets/services/product.service';
import { AddProd } from '../app-assets/interface/data';
import { faShoppingCart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  shopping=faShoppingCart;
  shoppingInfo=faInfoCircle;

  popularProdList!:AddProd[];
  trendyProducts:undefined|AddProd[];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    autoplay:true,
    autoplayHoverPause:true,
    center:true,
    // navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    // nav: true
  }

  constructor(private product:ProductService){} 

  ngOnInit(): void {
    /****************** Popular Products ******************/
      this.product.getPopularProd().subscribe((data)=>{
        console.log("popular products",data);
        this.popularProdList=data;
      })
    
    /****************** Trendy Products ******************/
    this.product.trendyProd().subscribe((data)=>{
      console.log("Trendy Products",data);
      this.trendyProducts = data;
    })
  }

  

}
