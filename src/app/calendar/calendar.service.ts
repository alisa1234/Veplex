/**
 * Created by Алиска on 31.05.2017.
 */
import { Component, ElementRef, HostListener, Input,Output, ViewChild, Inject, SimpleChange, EventEmitter, Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

declare var jQuery:any;

@Injectable()
export class CalendarService{
    custom:boolean=true;
    custom2:boolean=true;
    start_day:string;
    start_day2:string;
    end_day:string;

    id:string;
    id2:string;
    name_class:string;
    
    today:any;
    dd:number;
    mm:number;
    yy:number;
    constructor(){
        // this.id='id_';
        // this.id2='id2_';
        debugger;
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
        this.end_day=this.mm+'/'+this.dd+'/'+this.yy;
  
    }
    
    showCalendar(){
        this.custom=false;
        console.log(this.start_day,this.end_day);
        // this.id='id_'+this.name_class;
        // this.id2='id2_'+this.name_class;
       
     
      
    }
    hideCalendar(){
        this.custom=true;
       
    }
 
}