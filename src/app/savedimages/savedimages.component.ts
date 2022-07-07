import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SocialService } from '../social.service';
import { ShowPostComponent } from '../show-post/show-post.component';

@Component({
  selector: 'app-savedimages',
  templateUrl: './savedimages.component.html',
  styleUrls: ['./savedimages.component.scss']
})
export class SavedimagesComponent implements OnInit {
  currentUser:any;
  savedPost:any=[];
  constructor(private socialService:SocialService,private dialog:MatDialog) { }

  ngOnInit(): void {
localStorage.setItem('page',JSON.stringify('save'))

if(localStorage.getItem('CurrentUser')){
  this.currentUser=JSON.parse(localStorage.getItem('CurrentUser')!);
  
}

this.socialService.subject.subscribe((data:any)=>{
  this.socialService.GetSingleUser(data._id).subscribe((data:any)=>{
    this.savedPost=data.saved;
  })
})
this.socialService.GetSingleUser(this.currentUser._id).subscribe((data:any)=>{
  console.log(data);
  this.savedPost=data.saved;
 
})
  }

  ShowPost(id:any){
    this.socialService.passUser({_id:id});
this.dialog.open(ShowPostComponent);

  }
}

