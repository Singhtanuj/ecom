import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AddProd } from '../interface/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  addProductMsg  = new EventEmitter<boolean>(false);
  cartUpdateData = new EventEmitter<AddProd[] | []>();

  constructor(private http:HttpClient) { }

  getAddProd(data:AddProd){
    console.log("service called");

    return this.http.post('http://localhost:3000/products', data).subscribe((data)=>{
      console.log(data);
      if(data){
        this.addProductMsg.emit(true);
      }
    })
  }

  getProductList(){
    return this.http.get<AddProd[]>('http://localhost:3000/products');
  }

  getDeleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id:string){
    return this.http.get<AddProd>(`http://localhost:3000/products/${id}`);
  }

  getUpdateProd(products:AddProd){
    console.log("service",products)
    return this.http.put(`http://localhost:3000/products/${products.id}`, products);
  }

  getPopularProd(){
    return this.http.get<AddProd[]>('http://localhost:3000/products?_limit=4');
  }

  trendyProd(){
    return this.http.get<AddProd[]>('http://localhost:3000/products?_limit=5');
  }

  getSearchProd(query:string){
    return this.http.get<AddProd[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddCart(data: AddProd){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));
    }else{
      cartData = JSON.parse(localCart); 
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartUpdateData.emit(cartData);
  }

  removeCartItem(productId:number){
    let cartData = localStorage.getItem('localCart');

   if(cartData){
    let items:AddProd[] = JSON.parse(cartData);
    items = items.filter((item:AddProd)=>productId!==item.id);
    console.log(items);
    localStorage.setItem('localCart', JSON.stringify(items));
    this.cartUpdateData.emit(items);
   }
  }
}
