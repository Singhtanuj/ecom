import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../interface/data';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private route: Router) { }

  getSellerSignUp(data: SignUp) {
    this.http.post('http://localhost:3000/seller', data,
      { observe: 'response' })
      .subscribe((data) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem("sellerInfo", JSON.stringify(data.body));
        this.route.navigate(['/seller-home']);
        console.log("result", data);
      });
  }

  getSellerLogin(data: Login) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result:any) => {
      console.log(result);
      if( result && result.body && result.body.length ){
      
        localStorage.setItem("sellerInfo",JSON.stringify(result.body[0]));
        this.route.navigate(['/seller-home']);  
        console.log("logged-in successfully");
      }else{
        console.log("login failed");
        this.isError.emit(true);
      }
    })
  }

  reloadSeller() {
    if (localStorage.getItem("sellerInfo")) {
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['/seller-home']);
    }
  }
}
