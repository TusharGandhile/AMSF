import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  baseUrl='http://localhost:8080';
authUrl=this.baseUrl+'/auth/';
userUrl=this.baseUrl+'/users/';
productUrl=this.baseUrl+'/products/';
commentUrl=this.baseUrl+'/products/comment/'
imageUrl=this.baseUrl+'/images/';
public subject=new ReplaySubject(1);
public subjectstring=new Subject();
public subjectObj=new Subject();
date=new Date()
  constructor(private http:HttpClient) { }

passUser(data:any){
  this.subject.next(data);
}
passUpdatedUser(data:any){
  this.subjectstring.next(data)
}
passSingleProduct(data:any){
  this.subject.next(data);
}
passAllProducts(data:any){
  this.subjectObj.next(data)
}
getUpdatedTime(date:Date){
  let d=new Date(date)
  let n =this.date.getDay()- d.getDay();
  let h=this.date.getHours()- d.getHours();
  let m=this.date.getMinutes()- d.getMinutes();
if(n>=1){
  return n+' day ago';
}
else if(h>=1){
  return h+' hours ago';
}else if(m>1){
  return m+' minutes ago';
}else{
  return 'just now'
}
}
  //*******************************USER REGISTRATION & SIGNUP*****************************************//
  SignUpUser(data:any){
      return this.http.post(this.authUrl+'register',data);
  }

  LoginUser(data:any){
    return this.http.post(this.authUrl+'login',data);
  }

  ForgotPassword(data:any){
    return this.http.post(this.authUrl+'forgot-password',data);
  }

  ResetPassword(data:any,token:any){
    return this.http.post(this.authUrl+'reset-password?token='+token,data);
  }

  SendVerificationMail(data:any,token:any){
    return this.http.post(this.authUrl+'send-verification-email',data,token)
  }

  VerifyEmail(data:any,token:any){
    return this.http.post(this.authUrl+'verify-email?token='+token,data);
  }

  SignuppwithGoogle(data:any){
    return this.http.post(this.authUrl+'google',data);
   }

  //*****************************USER API*******************************************************//

  GetAllUsers(){
    return this.http.get(this.userUrl);
  }



  GetSingleUser(id:any){
    return this.http.get(this.userUrl+id);
  }
  UpdateUser(id:any,data:any){
    return this.http.patch(this.userUrl+id,data);
  }
  DeleteUser(id:any){
    return this.http.delete(this.userUrl+id);
  }
  ChangePassword(id:any,data:any){
  return this.http.patch(this.userUrl+'changePassword/'+id,data);
 }
   SavePost(id:any,data:any){
     return this.http.patch(this.userUrl+'savePost/'+id,data);
   }

  //**************************************PRODUCT API**********************************************//

AddProduct(data:any){
  return this.http.post(this.productUrl,data);
}
GetAllProducts(){
  return this.http.get(this.productUrl+'?sortBy=_id:desc&limit=10');
}
GetSingleProduct(id:any){
  return this.http.get(this.productUrl+id);
}
PostComment(id:any,data:any){
  return this.http.patch(this.productUrl+'comment/'+id,data);
}
LikePost(id:any,data:any){
  return this.http.patch(this.productUrl+'like/'+id,data);
}


//*****************************************Comment Like & Comment reply****************************//

commentLike(prod_id:any,com_id:any,data:any){
return this.http.patch(this.commentUrl+prod_id+"/like/"+com_id,data); 
}

commentReply(prod_id:any,com_id:any,data:any){
  return this.http.patch(this.commentUrl+prod_id+"/reply/"+com_id,data); 
  }

commentReplyLike(prod_id:any,com_id:any,reply_id:any,data:any){
return this.http.patch(this.commentUrl+prod_id+"/reply/"+com_id+"/like/"+reply_id,data)
}
}
