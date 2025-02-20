import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class AuthService{

    loginState = false;
    onLogin(){
        this.loginState = true;
    }

    logOut(){
        this.loginState = false;
    }
}