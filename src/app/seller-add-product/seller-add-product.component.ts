import { Component, OnInit } from '@angular/core';
import { AddProd } from '../app-assets/interface/data';
import { ProductService } from '../app-assets/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit {

  
  successMsg:string='';
  constructor(private product:ProductService, private route:Router) { }

  ngOnInit(): void {
  }

  addProd(data:AddProd){
    console.log(data);
    this.product.getAddProd(data);
    this.product.addProductMsg.subscribe((success)=>{
      if(success){
        this.successMsg="Product Added Successfully";
      }
      setTimeout(() => {
        this.successMsg='';
      }, 3000);
    });
    this.route.navigate(['seller-home']);
  }

}
