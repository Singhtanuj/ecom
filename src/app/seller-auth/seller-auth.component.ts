import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from '../app-assets/services/seller.service';
import { SignUp } from '../app-assets/interface/data';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit{

  isLogin:boolean = false;
  isError:string='';

  constructor( private seller:SellerService, private route:Router ){} 
  
  ngOnInit(): void {
    this.seller.reloadSeller();
   }

  formSubmit(data:SignUp):void{
    this.seller.getSellerSignUp(data);
  }

  formLogin(data:SignUp):void{
    this.isError='';
    // console.log(data);
    // this.seller.getSellerSignUp(data);
    this.seller.getSellerLogin(data);
    this.seller.isError.subscribe((isError)=>{
      if(isError){
        this.isError="Invalid Email Address or Password"
      }
    })
    if(this.seller.isError){
      this.isError
    }
  }

  openLogin(){
    this.isLogin = true;
  }

  openSignUp(){
    this.isLogin = false;
  }

}
