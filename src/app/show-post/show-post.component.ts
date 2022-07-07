import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCardLgImage } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { SocialService } from '../social.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class ShowPostComponent implements OnInit {
  date=new Date();
  CurrentUser:any;
  id:any;
  comment:any;
  data:any;
  toggled: boolean = false;
  message: string = '';
  com!:FormGroup;
  savedPost:any;
  passSaved:any;
  com_id:any;
  usercomment:any;
  showrep=false;
  localId:any;
  counter=false;
  updateddate=new Date();
  time=0;
  socialServices:any;
  imageUrl:string='';
  constructor(private socialService:SocialService,
              private formBuilder:FormBuilder,
              private renderer:Renderer2,
              private dialog:MatDialog) {
    this.socialServices=this.socialService
   }

  ngOnInit(): void {
    this.imageUrl=this.socialService.imageUrl;
    if(localStorage.getItem('CurrentUser')){
      this.CurrentUser=JSON.parse(localStorage.getItem('CurrentUser')!);
    }
this.socialService.subject.subscribe((data:any)=>{
  this.id=data._id
})
 
this.socialService.GetSingleUser(this.CurrentUser._id).subscribe((data:any)=>{
  this.savedPost=data.saved;
 
})

this.socialService.GetSingleProduct(this.id).subscribe((data:any)=>{
this.data=data;
console.log(data);

this.comment=data.comment
this.updateddate=data.updatedAt;



})
this.com=this.formBuilder.group({
  comment:[''],
})
}

getUpdatedTime(date:Date){
  let d=new Date(date)
  let n =this.date.getDay()- d.getDay();
  let h=this.date.getHours()- d.getHours();
  let m=this.date.getMinutes()- d.getMinutes();
if(n>=1){
  return n+' day ago';
}
else if(h>1){
  return h+' hrs';
}else if(m>=1){
  return m+' minutes';
}else{
  return 'just now'
}
}

  handleSelection(event:any) {
    // console.log(event.char);
    this.message += event.char;
  }

  LikePost(prod:any){
    this.socialService.LikePost(prod._id,{name:this.CurrentUser.name,photo:this.CurrentUser.photo,_id:this.CurrentUser._id}).subscribe((data:any)=>{
          //  console.log(data);
    this.ngOnInit();
    })
    }

    likenow(fa: any) {
      let a: any = false
      fa?.like.find((data: any) => {
        if (data._userId?._id == this.CurrentUser?._id) {
      a = true
        }
     })
      return a;
    }

    SavePost(prod:any){
      this.socialService.SavePost(this.CurrentUser._id,{productId:prod._id} ).subscribe((data:any)=>{
        localStorage.setItem('CurrentUser',JSON.stringify(data));
         console.log(data);
       this.passSaved=data;
       this.socialService.passUser(data);
      //  this.socialService.passSavedUnsavedPost(this.passSaved);
        this.ngOnInit();
      })
    }
    
    savenow(prod:any){
    let a: any = false
      this.CurrentUser.saved.find((data: any) => {
        if (data._productId == prod?._id) {
            a = true
        }
     })
      return a;
    }

    LikeComment(prod_id:any,com_id:any){
      this.socialService.commentLike(prod_id,com_id,{name:this.CurrentUser.name,photo:this.CurrentUser.photo,_id:this.CurrentUser._id}).subscribe((data:any)=>{
       console.log(data);
       
        this.ngOnInit();
      })
    }
    likeCom(prod: any) {
       let a: any = false
      prod.like?.find((data: any) => {
        if (JSON.stringify(data._userId?._id) == JSON.stringify(this.CurrentUser?._id)) {
           a = true;
        }
     })
      return a;
    }
    PostComment(prod_id:any){
      if(this.com.value.comment.includes("@")){
      if(this.com.value.comment.includes(this.usercomment)){
        let repy=this.com.value.comment.substring(this.usercomment.length,this.com.value.comment.length)
         this.socialService.commentReply(prod_id,this.com_id,{comment:repy}).subscribe((data:any)=>{
           console.log(data);
           
         })
      }else{
        alert("Invalid Comment Reply!!")
      }
    }else{
        console.log('no!!!');
         this.socialService.PostComment(prod_id,{comment:this.com.value.comment}).subscribe((data:any)=>{
         console.log(data);
         this.socialService.GetSingleProduct(this.id).subscribe((data:any)=>{
          this.data=data;
          this.comment=data.comment
          })
      })
      }
     
      this.com.reset();
   }

  focusMyInput(comet:any) {
    console.log(comet);
    this.com_id=comet._id;
    this.usercomment='@'+comet._userId.name;
    this.message='@'+comet._userId.name;
    this.renderer.selectRootElement('#comment').focus();

  }
  LikeReply(prodId:any,comId:any,replyId:any){
    this.socialService.commentReplyLike(prodId,comId,replyId,{name:this.CurrentUser.name,photo:this.CurrentUser.photo,_id:this.CurrentUser._id}).subscribe((data:any)=>{
      console.log(data);
     this.ngOnInit();
    })
  }
  likeComReply(prod: any) {
    let a: any = false
   prod.like?.find((data: any) => {
     if (JSON.stringify(data._userId._id) == JSON.stringify(this.CurrentUser._id)) {
        a = true;
     }
  })
   return a;
 }
 showReply(comet:any){
   if(this.counter==false){
this.localId=comet._id;
this.counter=true;

 }else{
this.counter=false;
 }
}
closeShowPost(){
//this.socialService.subject.next("true");
this.dialog.closeAll();
}
}
