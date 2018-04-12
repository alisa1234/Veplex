import { Component, OnInit,Input, Injectable, AfterViewInit } from '@angular/core';
import {CalendarService} from "../calendar/calendar.service";
import {CalendarPopupService} from "../calendar-popup/calendar-popup.service";
declare var jQuery:any;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  host:{'class':'root'}
})
@Injectable()
export class CalendarComponent implements AfterViewInit {
  @Input() inner_custom:boolean = true;
  @Input() inner_custom2:boolean = true;
  @Input() start_day:string;
  @Input() correction_start_day:string;
  @Input() new_datepicker:string;
  @Input() end_day:string;
  @Input() correction_end_day:string;
  @Input() hidden:boolean=true;
  @Input() new_datepicker_id:string;
  @Input() new_datepicker_id2:string;
  today:any;
  dd:number;
  mm:number;
  yy:number;
  @Input() _parent:any;

  constructor(private calendarService:CalendarService,public calendarPopupService:CalendarPopupService) {
}

  ngAfterViewInit() {
    let self=this;
    jQuery( "."+self.new_datepicker ).datepicker({
     
      showOn: "button",
      buttonImageOnly: true,
      buttonText: "Select date",
      onSelect:function(d,t){
        if(t.id==self.new_datepicker_id){
          self.start_day=d;
          self._parent.start_day=self.start_day;
        }else{
          self.end_day=d;
          self._parent.end_day=self.end_day;
        }
      }
      
    });
  }
sendDate(){
  this._parent.sendDate(this.start_day,this.end_day);
}
}
