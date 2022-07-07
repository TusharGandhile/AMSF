import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShowPostComponent } from '../show-post/show-post.component';
import { SocialService } from '../social.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
com!:FormGroup;
  product:any;
currentUser:any;
Your_comment='';
toggled: boolean = false;
message: string = '';
flag:any;
imageUrl:string='';
socialservices:any;
  constructor(private socialservice:SocialService,
              private formBuilder:FormBuilder,
              private router:Router,
              private dialog:MatDialog) { this.socialservices=this.socialservice}

  ngOnInit(): void {
    localStorage.setItem('page',JSON.stringify('home'))
    this.imageUrl=this.socialservice.imageUrl
    if(localStorage.getItem('CurrentUser')){
      this.currentUser=JSON.parse(localStorage.getItem('CurrentUser')!);
      console.log(this.currentUser);
    }
    this.socialservice.subject.subscribe((res:any)=>
    {(res)?"": this.product=res}
    );
     
 this.socialservice.subjectObj.subscribe((data:any)=>{
  this.product=data;
 })

this.socialservice.GetAllProducts().subscribe((data:any)=>{
  console.log(data);
this.product=data;
  
})
this.com=this.formBuilder.group({
  comment:['',Validators.required],
})
  }

  ViewComment(id:any){
    console.log(id);
   this.socialservice.passUser({_id:id})
   this.dialog.open(ShowPostComponent)
    }

  PostComment(id:any){
    console.log(this.Your_comment);
    this.socialservice.PostComment(id,{comment:this.com.value.comment}).subscribe((data:any)=>{
       console.log(data);
    })
    this.com.reset();
  }
  handleSelection(event:any) {
    console.log(event.char);
    this.Your_comment += event.char;
    
  }
  LikePost(prod:any){
this.socialservice.LikePost(prod._id,{name:this.currentUser.name,photo:this.currentUser.photo,_id:this.currentUser._id}).subscribe((data:any)=>{
       console.log(data);
      //  for(let i=0;i<data.like.length;i++){
      //    if(data.like[i]._userId==this.currentUser._id){
      //      this.flag=false;
      //    }else{
      //      this.flag=true;
      //    }
      //  }
this.ngOnInit();
})
}
likenow(fa: any) {
  let a: any = false
  fa.like.find((data: any) => {
    if (data._userId?._id == this.currentUser?._id) {
  a = true
    }
 })
  return a;
}
SavePost(prod:any){
  this.socialservice.SavePost(this.currentUser._id,{productId:prod._id} ).subscribe((data:any)=>{
    localStorage.setItem('CurrentUser',JSON.stringify(data));
    this.ngOnInit();
  })


}
savenow(prod:any){
  let a: any = false
  this.currentUser.saved.find((data: any) => {
    if (data._productId == prod._id) {
        a = true
    }
 })
  return a;
}
}
