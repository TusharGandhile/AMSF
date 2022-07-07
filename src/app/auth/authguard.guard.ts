import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private authservice:AuthService,private router:Router){}

  canActivate() {
    if(this.authservice.isLoggedin()){
     
      return true;
      }  
      else{
       localStorage.removeItem('token')
        this.router.navigate(['login']);
        return false;
      }  
  }
  
}
