import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';
import { SocialService } from '../social.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
   EditProfile!:FormGroup;
   srcResult:any;
   selectedFile: any = null;
  // profile=false;
   CurrentUserInfo:any;
   CurrentUser:any;
   img:any;
   dat=new Date()
   updatedUser:any;
  // baseUrl="http://192.168.0.120:8080/";
  imageUrl:string='';
  constructor(private dialog:MatDialog,
              private formBuilder:FormBuilder,
              private socialService:SocialService,
              private datepipe:DatePipe,
              private tostr:ToastrService) { }

  ngOnInit(): void {
    this.imageUrl=this.socialService.imageUrl;
    if(localStorage.getItem('CurrentUser')){
      this.CurrentUser=JSON.parse(localStorage.getItem('CurrentUser')!)
      console.log(this.CurrentUser);
      
    }
    this.socialService.GetSingleUser(this.CurrentUser._id).subscribe((data:any)=>{

       this.CurrentUserInfo=data;
    this.EditProfile.patchValue(this.CurrentUserInfo);
      console.log(this.CurrentUserInfo);
      
    })
this.EditProfile=this.formBuilder.group({
  name:['',Validators.required],
  email:['',[Validators.required,Validators.email]],
  bio:['',Validators.required],
  gender:['',Validators.required],
  dob:['',Validators.required],
  mobile:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.maxLength(10)]],
 photo:'',
})
  }
   
updateProfile(){
  const myArray = this.EditProfile.value.name.split(" ");
 // this.EditProfile.value.dob=this.datepipe.transform( this.EditProfile.value.dob,'dd-MM-yyyy')
  console.log(this.EditProfile.value.bio);
  
  //console.log(this.EditProfile.value);
  const formData=new FormData();
  formData.append('firstName',myArray[0]);
  formData.append('lastName',myArray[1]);
  formData.append('email',this.EditProfile.value.email);
  formData.append('bio',this.EditProfile.value.bio);
  formData.append('gender',this.EditProfile.value.gender);
  formData.append('dob',this.EditProfile.value.dob);
  formData.append('mobile',this.EditProfile.value.mobile);
  formData.append('photo',this.img)
  this.socialService.UpdateUser(this.CurrentUser._id,formData).subscribe((data:any)=>{
    console.log(data);
    this.socialService.passUpdatedUser(data);
    this.updatedUser=data;

    this.socialService.GetAllProducts().subscribe((res:any)=>{
      this.socialService.passAllProducts(res);
    })
  localStorage.setItem('CurrentUser',JSON.stringify(data))
this.tostr.success("Profile Update successfully!!")
  },
  (error:any)=>{
this.tostr.error(error.error.message)

  })
  

}
// 
onFileSelected(event: any) {
  console.log(event.target.files[0]);
  this.img=event.target.files[0]
  if(event.target.files[0]){
 const reader= new FileReader();
 reader.readAsDataURL(event.target.files[0])
 reader.onload=(event)=>{
   this.srcResult=reader.result
 }
 //this.profile=true;
 }
//  else{
//   this.profile=false;
//  }

  

}
removeProfilePhoto(){
  this.srcResult="./assets/images/profile.png";

}
}
