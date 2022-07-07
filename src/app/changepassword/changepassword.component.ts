import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialService } from '../social.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
ChangePassword!:FormGroup;
CurrentUser:any;
  constructor(private formBuilder:FormBuilder,private socialService:SocialService) { }

  ngOnInit(): void {
    if(localStorage.getItem('CurrentUser')){
      this.CurrentUser=JSON.parse(localStorage.getItem('CurrentUser')!)
      console.log(this.CurrentUser);
      
    }
    this.ChangePassword=this.formBuilder.group({
      password:['',Validators.required],
      newPassword:['',Validators.required],
      confirmpassword:['',Validators.required],
    })
  }
  UpdatePassword(){
    if(this.ChangePassword.value.confirmpassword==this.ChangePassword.value.newPassword){
    let data={password:this.ChangePassword.value.password,newPassword:this.ChangePassword.value.newPassword}
    this.socialService.ChangePassword(this.CurrentUser._id,data).subscribe((data:any)=>{
      console.log(data);
      console.log("password updated Successfully!!");
      
    })
  }else{
    alert("Something went wrong")
  }
  }
}
