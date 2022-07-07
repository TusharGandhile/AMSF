const googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SocialService } from '../social.service';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SocialAuthService } from "angularx-social-login";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  hide = true;
login!:FormGroup;
token:any;
info:any;
verify=false;
googleUser:any;
  constructor(private formBuilder:FormBuilder,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private socialservice:SocialService,
    private router:Router,
    private SocialAuthService:SocialAuthService,
    private tostr:ToastrService
    ) {  this.matIconRegistry.addSvgIcon( "logo",this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));}

  ngOnInit(): void {
   
    localStorage.clear();

    this.login=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
    })


  }
loginUser(){
  if (this.login.invalid) {
    for (const control of Object.keys(this.login.controls)) {
      this.login.controls[control].markAsTouched();
    }
    return;
  }
  this.socialservice.LoginUser(this.login.value).subscribe((data:any)=>{
    console.log(data);
    this.info=data
    this.token=data.token;
    if(data.user.isEmailVerified){
   
    console.log(this.token);
    localStorage.setItem('token',JSON.stringify(this.token));
    localStorage.setItem('CurrentUser',JSON.stringify(data.user));
    this.router.navigate(['Home'])
    this.tostr.success("Logged in Successfully!!",data.message)
    }else{
      alert('Your Email is not verified!!');
      this.verify=true;
    }
  },
  (error:any)=>{
    this.tostr.warning(error.error.message);
  })
}
VerifyEmail(){
  const headers={headers:{'Authorization': `Bearer ${this.token}`}}
this.socialservice.SendVerificationMail({},headers).subscribe((data:any)=>{
  console.log(data);
});

}
LoginWithGoogle(){
  this.SocialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res:any) => {
        console.log(res);
        
        this.googleUser=res

        localStorage.setItem('token',JSON.stringify(this.googleUser.authToken));  
       let user={
        firstName: this.googleUser.firstName,
        lastName: this.googleUser.lastName,
        email: this.googleUser.email,
        password:this.googleUser.email,
       }
     
   this.socialservice.SignuppwithGoogle(user).subscribe((res:any)=>{
   console.log(res);
   this.socialservice.LoginUser({ email: this.googleUser.email,password:this.googleUser.email}).subscribe((data:any)=>{
    this.token=data.token;
  //  console.log(this.token);
    localStorage.setItem('token',JSON.stringify(this.token));
    localStorage.setItem('CurrentUser',JSON.stringify(data.user));
    this.router.navigate(['Home']);
    this.tostr.success("Logged in Successfully!!",data.message)

   })
   })
  });
 }
}
