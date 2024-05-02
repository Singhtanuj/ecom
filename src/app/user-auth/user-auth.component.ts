import { Component, OnInit } from '@angular/core';
import { Login, SignUp } from '../app-assets/interface/data';
import { UserService } from '../app-assets/services/user.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {

  userSignUpMsg:undefined | string; 
  isUserSignup=false;
  errMsg!:string;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.userAuthReload();
  }

  signUp(data:SignUp){
    this.userService.getUserSignUp(data);
  }

  login(data:Login){
    this.userService.getUserLogin(data);
    this.userService.isError.subscribe((err)=>{
      if(err){
        this.errMsg="Invalid Email Address or Password";
      }
    });
    setTimeout(() => {
      this.errMsg='';
    }, 3000);
  }

  openLogin(){
    this.isUserSignup=false;
  }

  openSignUp(){
    this.isUserSignup=true;
  }

}
