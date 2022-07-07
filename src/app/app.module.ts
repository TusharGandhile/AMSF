import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AvatarModule } from 'ngx-avatar';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AddimageComponent } from './addimage/addimage.component';
import { DatePipe } from '@angular/common';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { SavedimagesComponent } from './savedimages/savedimages.component';
import { ShowPostComponent } from './show-post/show-post.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';
import { DragDirective } from './drag-drop.directive';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import '@angular/compiler';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ToastrModule } from 'ngx-toastr';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    ChangepasswordComponent,
    EditprofileComponent,
    AddimageComponent,
    SavedimagesComponent,
    DragDirective,
    ShowPostComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    VerifyemailComponent,
    PagenotfoundComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatRadioModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    Ng2TelInputModule,
    FormsModule,
    AvatarModule,
    NgxEmojiPickerModule,
    PickerModule ,
    IvyCarouselModule,
    HttpClientModule,
    SocialLoginModule,
    GooglePlaceModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule

  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('1029695319621-fjbe1t812mm8le9ehmc8g024sp9l160m.apps.googleusercontent.com') // your client id
        }
      ]
    }
  },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    DatePipe,
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
