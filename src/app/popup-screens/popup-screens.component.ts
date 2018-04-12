import { Component, OnInit,Input,HostListener, ElementRef,Output,EventEmitter,ViewChild } from '@angular/core';

@Component({
  selector: 'app-popup-screens',
  templateUrl: './popup-screens.component.html',
  styleUrls: ['./popup-screens.component.scss']
})
export class PopupScreensComponent implements OnInit {



  @Input() name:string;
  @Input() id:number;
  @Input() pics_url=[];
  @Input() hidden:boolean;
  @Output() hiddenChange:any=new EventEmitter();
  @ViewChild('popup_screens') elRef:ElementRef;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.elRef.nativeElement.contains(event.target) || event.target.closest('.prev-btn')) {
      // console.log("chosen clicked inside");
      // this.countr=1;
   
    } else {
      // console.log("chosen clicked outside");
      this.hidden = true;
      this.hiddenChange.emit(this.hidden);
      this.countr=1;
      this.selectedIndex=0;
      
    }
  }
  constructor(public eRef: ElementRef) { this.selectedIndex=0;this.countr=1;}

  ngOnInit() {
  }
  close(){
    this.hidden = true;
    this.hiddenChange.emit(this.hidden);
  }
  // slides: any[];
  selectedIndex: number;
  countr:number;
  // constructor() {
  //   this.selectedIndex = 0;
  //   this.slides = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  // }

  next() {
    
    if(this.selectedIndex===this.pics_url.length-1){
       this.selectedIndex=0;
      this.countr=1;
     
    }else{
      ++this.selectedIndex;
      ++this.countr;
     
    }

  }

  previous() {
    
    if(this.selectedIndex==0){
     this.selectedIndex=this.pics_url.length-1;
     this.countr=this.pics_url.length;
   
     
     
    }else{
      --this.selectedIndex;
   
      if(this.selectedIndex==0){
        // this.selectedIndex=this.pics_url.length-1;
        this.countr=this.selectedIndex+1;}else{--this.countr;}
   
    
    }
  }

}
