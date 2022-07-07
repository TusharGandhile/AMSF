import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialService } from '../social.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;
  signup!:FormGroup;
  constructor(private formBuilder:FormBuilder,
              private socialservice:SocialService,
              private router:Router,
              private tostr:ToastrService ){}

  ngOnInit(): void {
    localStorage.clear();
this.signup=this.formBuilder.group({
  
  firstName :['', Validators.required],
  lastName : ['', Validators.required],
  email : ['',[Validators.required, Validators.email]],
  password : ['', Validators.required],
})
  }
  
  SignUp(){
    this.socialservice.SignUpUser(this.signup.value).subscribe((data:any)=>{
      console.log(data);
      if(data){
      this.tostr.success('User registerd successfully!!');
      this.router.navigate(['login']);
      }
    },
    (error:any)=>{
this.tostr.warning(error.error.message);

    })
  }

}
