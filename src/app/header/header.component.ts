import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddimageComponent } from '../addimage/addimage.component';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { SocialService } from '../social.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private dialog:MatDialog,private router:Router,private socialService:SocialService) { }
currentUser:any;
imageUrl:string='';
page:any;
  ngOnInit(): void {
    if(localStorage.getItem('page')){
      this.page=JSON.parse(localStorage.getItem('page')!)
     }  
    this.socialService.subjectstring.subscribe((data:any)=>{console.log(data);this.currentUser=data})
this.imageUrl=this.socialService.imageUrl;
    if(localStorage.getItem('CurrentUser')){
      this.currentUser=JSON.parse(localStorage.getItem('CurrentUser')!);
    }
  }
  ChangePassword() {
    
    this.dialog.open(ChangepasswordComponent);
  }
  EditProfile(){
    this.dialog.open(EditprofileComponent);
  }
  UploadPhoto(){
     this.dialog.open(AddimageComponent, {
       panelClass: 'custom-dialog-container' 
         });
    //this.dialog.open(AddimageComponent);
  }
  logoutUser(){
if(confirm('Do you want to logout?')){
  localStorage.clear();
  this.router.navigate(['login']);
}
  }
 
}
