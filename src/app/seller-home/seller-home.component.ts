import { Component, OnInit } from '@angular/core';
import { ProductService } from '../app-assets/services/product.service';
import { AddProd } from '../app-assets/interface/data';
import { Router } from '@angular/router';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {

  deleteCTA = faTrash;
  updateCTA = faPenToSquare;
  productList !: AddProd[];
  showDelMsg: string = '';

  constructor(private product: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.getProdList();
  }

  /************************************* GET PRODUCT LIST *************************************/
  getProdList() {
    this.product.getProductList().subscribe((data) => {
      // console.log(data);
      this.productList = data;
    })
  }

  /************************************* DEL PRODUCT LIST *************************************/
  deleteProd(id: number) {
    //  console.log("test id", id);
    this.product.getDeleteProduct(id).subscribe((data) => {
      if (data) {
        this.showDelMsg = 'Product Id deleted';
        this.getProdList();
      }
    })
    setTimeout(() => {
      this.showDelMsg = '';
    }, 3000);
  }


}
