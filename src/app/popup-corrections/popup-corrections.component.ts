import { Component, OnInit,Input,HostListener, ElementRef,Output,EventEmitter,ViewChild } from '@angular/core';
import {CalendarService} from "../calendar/calendar.service";
import {CalendarPopupService} from "../calendar-popup/calendar-popup.service";

declare var jQuery:any;

@Component({
  selector: 'app-popup-corrections',
  templateUrl: './popup-corrections.component.html',
  styleUrls: ['./popup-corrections.component.scss']
})
export class PopupCorrectionsComponent implements OnInit {
  leads:number;
  count:number;
  comment:string;

  start_day:string;
  start_day2:string;
  end_day:string;
  today:any;
  dd:number;
  mm:number;
  yy:number;
  
  @Input() hidden:boolean;
  @Output() hiddenChange:any=new EventEmitter();

  value:any='choose_period';
  values=[{'id':'choose_period','title':'Choose period'},{'id':'date','title':'Date'},{'id':'range','title':'Range'}]
  @ViewChild('popup_corrections') elRef:ElementRef;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.elRef.nativeElement.contains(event.target) || event.target.closest('.proffers-stat')) {
    } else {
      this.hidden = true;
      this.hiddenChange.emit(this.hidden);
    }
  }
  constructor(private eRef: ElementRef,public calendarService:CalendarService,public calendarPopupService:CalendarPopupService) {
    this.calendarPopupService.hideCalendar();
    
    this.calendarPopupService.hideCalendar2();
  }

  ngOnInit() {
  }
  pushOnDate($event){
    if(this.value=='date'){
      this.today = new Date();
      this.dd = this.today.getDate();
      this.mm = this.today.getMonth() + 1;
      this.yy = this.today.getFullYear();

      if (this.dd < 10) {
        this.dd =+ '0' + this.dd;
      }
      if (this.mm < 10){
        this.mm =+ '0' + this.mm;
      }
      this.start_day2=this.mm+'/'+this.dd+'/'+this.yy;
      jQuery( ".datepicker2" ).datepicker( "setDate", this.start_day2 );
 
      this.calendarPopupService.showCalendar();
      this.calendarPopupService.hideCalendar2();
    }else{
      this.today = new Date();
      this.dd = this.today.getDate();
      this.mm = this.today.getMonth() + 1;
      this.yy = this.today.getFullYear();

      if (this.dd < 10) {
        this.dd =+ '0' + this.dd;
      }
      if (this.mm < 10){
        this.mm =+ '0' + this.mm;
      }
      this.start_day=this.mm+'/'+this.dd+'/'+this.yy;
      this.end_day=this.mm+'/'+this.dd+'/'+this.yy;
      jQuery( "."+this.calendarPopupService.name_class ).datepicker( "setDate", this.start_day );
   
      this.calendarPopupService.hideCalendar();
      this.calendarPopupService.showCalendar2();
    }
  }
  sendDate(start,end){
  }
  close(){
    this.hidden = true;
    this.hiddenChange.emit(this.hidden);
  }

}
