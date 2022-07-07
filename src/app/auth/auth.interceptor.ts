import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
token:any;
  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.token = JSON.parse(localStorage.getItem("token")!)
    
    if (this.token) {
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${this.token}`)});
      return next.handle(tokenizedReq)
    }
    return next.handle(req);
}
}