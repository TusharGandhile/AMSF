
import {Directive,HostListener,EventEmitter,Output,HostBinding} from '@angular/core';    
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';  

export interface FileHandle {
  file: File,
  url: SafeUrl
}

@Directive({
  selector: '[appDragDrop]'
})

export class DragDirective {
  @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();

  @HostBinding("style.background") private background = "#eee";

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    console.log(evt.dataTransfer);
    
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  
    let files: FileHandle[] = [];
    for (let i = 0; i < 10; i++) {
      let file:any;
       file = evt?.dataTransfer?.files[i];
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      files.push({ file, url });
    }
    if (files.length > 0) {
      this.files.emit(files);
    }
  }
}
