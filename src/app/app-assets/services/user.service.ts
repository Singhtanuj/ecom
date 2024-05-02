import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../interface/data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isError = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient, private route:Router) { }

  getUserSignUp(data: SignUp){
    return this.http.post('http://localhost:3000/user', data, {observe:'response'})
    .subscribe((data)=>{
      if(data){ 
        localStorage.setItem("user", JSON.stringify(data.body));
        this.route.navigate(['/']);
      }
    })
  }

  getUserLogin(data:Login){
    return this.http.get<SignUp>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`, {observe:'response'}).subscribe((data:any)=>{
      if(data && data.body && data.body.length){
        localStorage.setItem('user', JSON.stringify(data.body[0]));
        this.route.navigate(['/']);
      } else {
        this.isError.emit(true);
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/']);
    }
  }
}
