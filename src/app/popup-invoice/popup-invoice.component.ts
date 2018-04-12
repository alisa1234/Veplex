import { Component, OnInit,Input,HostListener, ElementRef,Output,EventEmitter,ViewChild  } from '@angular/core';

@Component({
  selector: 'app-popup-invoice',
  templateUrl: './popup-invoice.component.html',
  styleUrls: ['./popup-invoice.component.scss']
})
export class PopupInvoiceComponent implements OnInit {
  @Input() downloadPDF:string;
  @Input() resendPDF:string;

  @Input() name:string;
  @Input() id:number;
  @Input() information:string;
  @Input() hidden:boolean;
  @Output() hiddenChange:any=new EventEmitter();
  @ViewChild('popup_invoice') elRef:ElementRef;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.elRef.nativeElement.contains(event.target) || event.target.closest('.proffers-invoice')) {
      // console.log("chosen clicked inside");
    } else {
      // console.log("chosen clicked outside");
      this.hidden = true;
      this.hiddenChange.emit(this.hidden);
    }
  }
  constructor(public eRef: ElementRef) {}

  ngOnInit() {
  }
  close(){
    this.hidden = true;
    this.hiddenChange.emit(this.hidden);
  }

}
