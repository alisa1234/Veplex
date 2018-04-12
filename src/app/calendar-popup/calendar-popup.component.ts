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
    //   this.today = new Date();
    //   this.dd = this.today.getDate();
    //   this.mm = this.today.getMonth() + 1;
    //   this.yy = this.today.getFullYear();
    //
    //   if (this.dd < 10) {
    //     this.dd =+ '0' + this.dd;
    //   }
    //   if (this.mm < 10){
    //     this.mm =+ '0' + this.mm;
    // }
    // this.start_day=this.mm+'/'+this.dd+'/'+this.yy;
    // this.end_day=this.mm+'/'+this.dd+'/'+this.yy;

    console.log('date',this.start_day,this.inner_custom);
  }

  ngOnInit() {
    let self=this;
    jQuery( ".datepicker2" ).datepicker({

      showOn: "button",
      /*    buttonImage: "images/School%20Calendar.png",*/
      buttonImageOnly: true,
      buttonText: "Select date",
      onSelect:function(d,t){
        // self.start_day=

        if(t.id=='start_day2'){
          self.start_day=d;
        }else{
          self.end_day=d;
        }
        console.log('change',d,t,self.start_day,self.end_day,this.inner_custom)
        
      }

    });
  
  }
  sendDate(){
   
    this._parent.sendDate(this.start_day,this.end_day);
    console.log('change after;',this.start_day,this.end_day)
  }
}
