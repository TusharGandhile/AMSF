import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialService } from '../social.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
hide=true;
resetpass!:FormGroup;
token:any;
  constructor(private socialService:SocialService,
              private formBuilder:FormBuilder,
              private router:Router,
              private route:ActivatedRoute,
              private tostr:ToastrService) { }

  ngOnInit(): void {
    this.resetpass=this.formBuilder.group({
      Newpassword:['',Validators.required],
      Confirmpassword:['',Validators.required],
    })
    this.route.queryParams.subscribe((data:any)=>{
      console.log(data.token);
      this.token=data.token;
    })
    
  }
  ResetPassword(){
    console.log(this.route);
    
    if(this.resetpass.value.Newpassword==this.resetpass.value.Confirmpassword){
this.socialService.ResetPassword({password:this.resetpass.value.Confirmpassword},this.token).subscribe((data:any)=>{
  console.log(data);
  this.router.navigate(['login']);
  this.tostr.success("Password has Successfully changed!!");
  
})
    }
  }
}
