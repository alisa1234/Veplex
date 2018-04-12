import { Component, OnInit,Input,HostListener, ElementRef,Output,EventEmitter,ViewChild } from '@angular/core';

@Component({
  selector: 'app-popup-information',
  templateUrl: './popup-information.component.html',
  styleUrls: ['./popup-information.component.scss']
})
export class PopupInformationComponent implements OnInit {



  @Input() name:string;
  @Input() id:number;
  @Input() information:string;
  @Input() hidden:boolean;
  @Output() hiddenChange:any=new EventEmitter();
  @ViewChild('popup_information') elRef:ElementRef;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.elRef.nativeElement.contains(event.target) || event.target.closest('.info-btn')) {
    } else {
      this.hidden = true;
      this.hiddenChange.emit(this.hidden);
    }
  }
  constructor(private eRef: ElementRef) { }

  ngOnInit() {
  }
close(){
  this.hidden = true;
  this.hiddenChange.emit(this.hidden);
}
}
