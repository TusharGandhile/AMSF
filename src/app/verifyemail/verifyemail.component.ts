import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialService } from '../social.service';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.scss']
})
export class VerifyemailComponent implements OnInit {
  verify!:FormGroup;
  token:any;
  constructor(private socialService:SocialService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
   console.log("hello");
   
    this.route.queryParams.subscribe((data:any)=>{
      console.log(data);
      this.token=data.token;
    });
    this.socialService.VerifyEmail({}, this.token).subscribe((data:any)=>{
      console.log(data);
      alert('Email verified successfully!!')
      this.router.navigate(['login']);
    })
  }
  
}
