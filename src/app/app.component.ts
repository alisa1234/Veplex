import { Component,AfterContentInit } from '@angular/core';
import {RenderOffer} from './add-offer/render-offer';
import { BreadcrumbService} from 'ng2-breadcrumb/ng2-breadcrumb';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from './domains';
import {GlobalLogin} from './global-login';
import { Router } from '@angular/router';

declare var jQuery:any;

@Component({
  selector: 'app-root',
  template:`<app-header></app-header>
<div class="info-block">
  <div class="info-block_time" *ngIf="globalLogin.serverTime"><span class="info-block_time_title" (updateTime)="updateTime()">Server Time:</span> {{today_day}} {{today_time}}</div>
  <app-breadcrumb *ngIf="globalLogin.serverTime" class="breadcrumbs"></app-breadcrumb>
</div>

<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
  host:{'class':'root'}
})
export class AppComponent{
  name:string;
  role:string;
  login:boolean=false;
    
    _http:Http;
    domain:string;
    getServerTime:string;
    
    today_day:string;
    today:any;
    dd:number;
    mm:number;
    yy:number;
    currentTime_i:number;

    today_time:string;
    time:any;
    h:number;
    m:number;
    s:number;
    
    hidden:boolean=false;
    server_time:boolean=false;
  constructor(http:Http,private router:Router, public renderOffer:RenderOffer, domains:Domains, public globalLogin:GlobalLogin){
      this._http = http;
      this.domain = domains.domain;
      this.getServerTime=domains.getServerTime;
      this.role=localStorage.getItem("role");
      this.name=localStorage.getItem("name");

      let result;
      this._http.get( this.domain+this.getServerTime)
          .map((res:Response) => {
              return res.json();
          })
          .subscribe(
              res=>{result = res;
              this.dd=result.day;
                  this.mm=result.month;
                  this.yy=result.year;

                  this.h=result.hour;
                  this.m=result.minutes;
                  this.s=result.seconds;

                  this.currentTime_i = 0;
              }
          );
      setInterval(() => {
          this.time = new Date(this.yy, this.mm - 1, this.dd, this.h, this.m, this.s);
          let currentTime_now = new Date( ( (this.time.getTime()/1000)+this.currentTime_i) * 1000 );
          let currentTime = new Date(currentTime_now.getTime() + this.currentTime_i);
          let month_num = currentTime.getMonth() + 1,
              day = currentTime.getDate(),
              hours = currentTime.getHours(),
              minutes = currentTime.getMinutes(),
              seconds = currentTime.getSeconds();
    
          if (currentTime.getTimezoneOffset() > 0) {
              currentTime.setTime(currentTime.getTime() + currentTime.getTimezoneOffset()*60*1000);
          }

          if (day <= 9) day =+ "0" + day;
          if (hours <= 9) hours =+ "0" + hours;
          if (minutes <= 9) {minutes =+ "0" + minutes;debugger;}
          if (seconds <= 9) seconds =+ "0" + seconds;
          if (month_num <= 9) month_num =+ '0' + month_num;
          
          let date = month_num + '/'+day + '/' + currentTime.getFullYear();
          let time = hours + ":" + minutes + ":" + seconds;

          this.today_time = date + ' ' + time;

          this.currentTime_i++;
      }, 1000);


this.renderOffer=renderOffer;
    this.name=localStorage.getItem("offer_name");
  }
    getHidden(){
        
        this.hidden=true;
    }
    updateTime(){

        setInterval(() => {

            this.time =  new Date();
            this.h=this.time.getHours();
            this.m=this.time.getMinutes();
            this.s=this.time.getSeconds();
            this.today_time=this.h+':'+this.m+':'+this.s;
        }, 1000);
    }
  getName():string {
    return localStorage.getItem("offer_name");
  }
  getNamePublisher():string {
    return localStorage.getItem("publisher_name");
  }
    getNameBundle(){
        return localStorage.getItem("bundle_name");
    }
    getNameUsers(){
        return localStorage.getItem("user_name");
    }
  getValueOffer():string{
    return localStorage.getItem("offer_value");
  }
  getValueUsers():string{
    return localStorage.getItem("users_value");
  }
}
