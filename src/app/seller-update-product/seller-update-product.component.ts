import { Component, OnInit } from '@angular/core';
import { AddProd } from '../app-assets/interface/data';
import { ProductService } from '../app-assets/services/product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {

prodData:undefined | AddProd 
updateMsg:undefined |string;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private route:Router) { }

  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(productId);
    if (productId) {
      this.productService.getProduct(productId).subscribe((data) => {
        console.log(data);
        this.prodData=data;
        console.log("id is",this.prodData.id);
      })
    }
  }

  updateProdDetails(newVal: AddProd) {
    if(this.prodData){
      newVal.id = this.prodData.id
    }
    console.log("new Values", newVal);
    this.productService.getUpdateProd(newVal).subscribe((data)=>{
      console.log(data);
      if(data){
        this.updateMsg="Updated";
      }
    });
    setTimeout(() => {
      this.updateMsg='';
    }, 3000);
    setTimeout(() => {
      this.route.navigate(['seller-home']);
    }, 3001);
  }

}
