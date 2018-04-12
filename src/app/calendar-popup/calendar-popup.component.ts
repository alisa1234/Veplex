import { Component, OnInit,Input, Injectable } from '@angular/core';
import {CalendarPopupService} from "../calendar-popup/calendar-popup.service";

declare var jQuery:any;

@Component({
  selector: 'app-calendar-popup',
  templateUrl: './calendar-popup.component.html',
  styleUrls: ['./calendar-popup.component.scss']
})
export class CalendarPopupComponent implements OnInit {
  @Input() inner_custom:boolean = true;
  @Input() start_day:string;
  @Input() end_day:string;
  @Input() hidden:boolean=true;
  today:any;
  dd:number;
  mm:number;
  yy:number;
  @Input() _parent:any;

  constructor(private calendarPopupService:CalendarPopupService) {
  }

  ngOnInit() {
    let self=this;
    jQuery( ".datepicker2" ).datepicker({

      showOn: "button",
      buttonImageOnly: true,
      buttonText: "Select date",
      onSelect:function(d,t){
        if(t.id=='start_day2'){
          self.start_day=d;
        }else{
          self.end_day=d;
        }
        
      }

    });
  
  }
  sendDate(){
   
    this._parent.sendDate(this.start_day,this.end_day);
  }
}
