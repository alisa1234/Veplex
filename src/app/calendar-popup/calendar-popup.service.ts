/**
 * Created by Алиска on 02.11.2017.
 */
/**
 * Created by Алиска on 31.05.2017.
 */
import { Component, ElementRef, HostListener, Input,Output, ViewChild, Inject, SimpleChange, EventEmitter, Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

declare var jQuery:any;

@Injectable()
export class CalendarPopupService{
    custom:boolean=true;
    custom2:boolean=true;
    name_class:string;
    start_day:string;
    start_day2:string;
    end_day:string;
    end_day2:string;
    
    id:string;
    id2:string;

    today:any;
    dd:number;
    mm:number;
    yy:number;
    constructor(){
        this.name_class='correction_calendar';
        this.id='id_'+this.name_class;
        this.id2='id2_'+this.name_class;
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
        this.start_day2=this.mm+'/'+this.dd+'/'+this.yy;
        // this.end_day=this.mm+'/'+this.dd+'/'+this.yy;
        // this.end_day2=this.mm+'/'+this.dd+'/'+this.yy;
       

    }

    showCalendar(){
        console.log(this.start_day,this.end_day);

        this.custom=false;
       

    }

    showCalendar2(){
     
        this.custom2=false;


    }
    hideCalendar(){
        this.custom=true;

    }
    hideCalendar2(){
        this.custom2=true;

    }

}