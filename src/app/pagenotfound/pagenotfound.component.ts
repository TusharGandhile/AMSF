import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  template: `<h1>404 Page Not Found</h1>`,
  styles: ['h1 { font-weight: 700;text-align:center;margin-top:32% !important;font-size:70px; }']
})
export class PagenotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
