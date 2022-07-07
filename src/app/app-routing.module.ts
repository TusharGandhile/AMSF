import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddimageComponent } from './addimage/addimage.component';
import { AuthguardGuard } from './auth/authguard.guard';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SavedimagesComponent } from './savedimages/savedimages.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'Signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'Home',component:HomeComponent,canActivate:[AuthguardGuard]},
  {path:'addimage',component:AddimageComponent,canActivate:[AuthguardGuard]},
  {path:'savedimages',component:SavedimagesComponent,canActivate:[AuthguardGuard]},
  {path:'forgotpassword',component:ForgotpasswordComponent,canActivate:[AuthguardGuard]},
  {path:'reset-password',component:ResetpasswordComponent,canActivate:[AuthguardGuard]},
  {path:'verify-email',component:VerifyemailComponent},
  {path:'**',component:PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
