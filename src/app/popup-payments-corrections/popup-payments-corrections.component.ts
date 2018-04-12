import { Component, OnInit,Input,HostListener, ElementRef,Output,EventEmitter,ViewChild } from '@angular/core';
import {PopupPaymentsCorrectionsService} from './popup-payments-corrections.service';

@Component({
  selector: 'app-popup-payments-corrections',
  templateUrl: './popup-payments-corrections.component.html',
  styleUrls: ['./popup-payments-corrections.component.scss']
})
export class PopupPaymentsCorrectionsComponent implements OnInit {


  @Input() name:string;
  @Input() id:number;
  @Input() information:string;
  @Input() hidden:boolean;
  @Output() hiddenChange:any=new EventEmitter();
  @ViewChild('popup_correction') elRef:ElementRef;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.elRef.nativeElement.contains(event.target) || event.target.closest('.page-table_cplus')) {
    } else {
      this.hidden = true;
      this.hiddenChange.emit(this.hidden);
    }
  }
  constructor(private eRef: ElementRef, public popupPaymentsCorrectionsService:PopupPaymentsCorrectionsService) { }

  ngOnInit() {
  }
  close(){
    this.hidden = true;
    this.hiddenChange.emit(this.hidden);
  }
}
