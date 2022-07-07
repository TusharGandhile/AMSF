import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SocialService } from '../social.service';
import { FileHandle } from '../drag-drop.directive';
import { MatDialog } from '@angular/material/dialog';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-addimage',
  templateUrl: './addimage.component.html',
  styleUrls: ['./addimage.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class AddimageComponent implements OnInit {
  @ViewChild('mainCarousel',{static:false}) mainCarousel:any;
  @ViewChild('myCarousel', {static: false}) myCarousel:any;
  image!:FormGroup;
addimage=false;
a=0;
next:any;
discard:any;
uploadImage:any;
OnUploadImg:any;
CurrentUser:any;
img:any;
myFiles:any[]=[];
srcResult:any;
toggled: boolean = false;
message: string = '';
file:any;
value:any;
interval:any;
show=false;
myphotos:any[]=[];
  constructor(private formBuilder:FormBuilder,
              private socialService:SocialService,
              private dialog:MatDialog,
              private tostr:ToastrService) { }

  ngOnInit(): void {
  localStorage.setItem('page',JSON.stringify('add'));
  
   this.image=this.formBuilder.group({
    caption:['',Validators.required],
    location:['',Validators.required],
   })
  }

  formattedaddress=" ";
  location: Options = new Options({componentRestrictions:{country:"IN"},});
  public AddressChange(address: any) {
  //setting address from API to local variable
   this.formattedaddress=address.formatted_address
}
nextgroup(){
  this.myCarousel.next();
}
prevgroup(){
  this.myCarousel.prev();

}
  addImage(){
this.addimage=true;
this.next=false;
this.discard=false;
this.uploadImage=false;
  }
  proceedNext(){
    this.next=true;
    this.addimage=false;
    this.discard=false;
    this.uploadImage=false;
   console.log(this.img);
   console.log(this.image.value.caption);
   console.log(this.image.value.location);
   if(this.next){
    setTimeout(()=>{                           
      this.value = 100;
         const formData=new FormData();
   formData.append('caption',this.image.value.caption);
   formData.append('location',this.image.value.location);
   console.log(this.myFiles);
  for  (var i =  0; i <  this.myphotos.length; i++)  {  
    formData.append("photo",  this.myphotos[i]);
    console.log( this.myphotos[i]);
    
 } 
     this.socialService.AddProduct(formData).subscribe((data:any)=>{
      console.log(data);
      this.socialService.GetAllProducts().subscribe((res:any)=>{
        this.socialService.passSingleProduct(res);
      })
    })

   
  }, 1500);
 
  this.interval=setInterval(() => {
    this.closedialog(); 
    this.tostr.success('Feed added successfully!!',)
  }, 2000);
   }
  
  }
  closedialog(){
    this.dialog.closeAll();
    clearInterval(this.interval);
  }
  DiscardChanges(){
    this.discard=true;
    this.next=false;
    this.addimage=false;
    this.uploadImage=false;
    console.log("worked");
    
  }
  UploadImage(){
    if(localStorage.getItem('CurrentUser')){
      this.CurrentUser=JSON.parse(localStorage.getItem('CurrentUser')!);
    }

    this.uploadImage=true;
    this.discard=false;
    this.next=false;
    this.addimage=false;
  }

  DiscardProcess(){
    this.next=false;
    this.addimage=false;
    this.discard=false;
    this.uploadImage=false;
    this.myFiles=[];
  }

  handleSelection(event:any) {
    console.log(event.char);
    this.message += event.char;
  }

  onFileSelected(event: any) {
       console.log(event.target.files);
     for (var i = 0; i < event.target.files.length; i++) { 
    this.myphotos.push(event.target.files[i])
    if(event.target.files && event.target.files[i] ){
   const reader= new FileReader();
   reader.readAsDataURL(event.target.files[i])
   reader.onload=(event)=>{
     this.srcResult={path:reader.result}
     this.myFiles.push(this.srcResult)
    }
  }
}
   this.addImage();
  }
  hideMiniCarousel(){
    if(this.show==false){
      this.show=true;
    }else{
      this.show=false;
    }
  }
  OnclickCarousel(file:any){
  this.myFiles=this.myFiles?.filter((data:any)=>data.path!== file.path);
    
  }
  clickOnImage(e:any,h:any){
  if(h==this.mainCarousel.slideCounter){return}
  if(h>this.mainCarousel.slideCounter){ 
    this.a=h-this.mainCarousel.slideCounter;
    setTimeout(()=>{this.mainCarousel.next()},20)
    }
  if(h<this.mainCarousel.slideCounter){
     this.a=this.mainCarousel.slideCounter-h; 
      setTimeout(()=>{this.mainCarousel.prev()},20)}


  }
}
