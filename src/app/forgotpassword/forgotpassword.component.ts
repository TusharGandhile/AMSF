import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialService } from '../social.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  forgotpassword!:FormGroup;
  constructor(private socialService:SocialService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.forgotpassword=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
    })
  }

  ForgotPassword(){
   // console.log(this.forgotpassword.value);
    this.socialService.ForgotPassword(this.forgotpassword.value).subscribe((data:any)=>{
      console.log(data);
      this.router.navigate(['Resetpassword']);
    })
  }
}
