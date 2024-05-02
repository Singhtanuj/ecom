import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../app-assets/services/product.service';
import { AddProd } from '../app-assets/interface/data';
import { faShoppingCart, faShoppingBag, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  shoppingBaskit = faShoppingCart;
  shoppingBag = faShoppingBag;
  plus = faPlusSquare;
  minus = faMinusSquare
  productQuantity:number=1;
  product: AddProd | undefined;
  cart!:AddProd;
  removeCart=false;

  constructor(private activatedRouter: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    let productId = this.activatedRouter.snapshot.paramMap.get('id');
    // console.log(productId);

    if (productId) {
      this.productService.getProduct(productId).subscribe((data) => {
        this.product = data;
      })

      let cartData = localStorage.getItem('localCart');

      if(cartData && productId){
        let items = JSON.parse(cartData);

        items = items.filter((item:AddProd) => productId == item.id.toString())
        if(items.length){
          this.removeCart = true;
        }else{
          this.removeCart = false;
        }

      }

    }
  }

  handleProduct(val:string){
    if(this.productQuantity<20 && val=='plus'){
      this.productQuantity+=1;
    } else if (this.productQuantity>1 && val=='minus') {
      this.productQuantity-=1;
    }
  }

  addToCart(){
    if(this.product){
      this.product.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        this.productService.localAddCart(this.product);
        this.removeCart = true;
      }
    }
  }

  removeToCart(prodId:number){
    this.productService.removeCartItem(prodId);
    this.removeCart = false;
  }

}
