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
  <!--<div class="breadcrumbs">-->
    <!--<ul>-->
      <!--<li><a href="#" title="#">Home</a></li>-->
      <!--<li><a href="#" title="#">Statistics</a></li>-->
    <!--</ul>-->
  <!--</div>-->
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
  
      // if(this.role!=null && this.name!=null){
      //     this.login=true;
      //     this.globalLogin.show_elements(this.name,this.role,this.login);
      // }
  
      // this.today = new Date();
      // this.dd = this.today.getDate();
      // this.mm = this.today.getMonth() + 1;
      // this.yy = this.today.getFullYear();

      let result;
      // this.time=new Date();
// if(this.globalLogin.hidden==true){
//     debugger;
//     this.hidden=true;
// }else{
//     this.hidden=false;
//     debugger;
// }
      this._http.get( this.domain+this.getServerTime)
          .map((res:Response) => {
              return res.json();
          })
          .subscribe(
              res=>{result = res;console.log('res',result);
              this.dd=result.day;
                  this.mm=result.month;
                  this.yy=result.year;

                  this.h=result.hour;
                  this.m=result.minutes;
                  this.s=result.seconds;

                  this.currentTime_i = 0;
                  debugger;
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
     
      // if (this.dd < 10) {
      //     this.dd = '0' + this.dd;
      // }
      // if (this.mm < 10){
      //     this.mm = '0' + this.mm;
      // }
      // this.today_day=this.mm+'/'+this.dd+'/'+this.yy;



this.renderOffer=renderOffer;
    this.name=localStorage.getItem("offer_name");
      // breadcrumbService.addFriendlyNameForRoute('/home', 'Home');
      // breadcrumbService.addCallbackForRoute('/home/users/publisher-list',function () {
      //     return breadcrumbService.addFriendlyNameForRoute('/users/publisher-list', 'Publisher');
      // })

    // breadcrumbService.addFriendlyNameForRoute('/offer/offer-list', 'Offers');
    // breadcrumbService.addCallbackForRouteRegex('/offer/offer-list/add-offer', this.getValueOffer);
    //   breadcrumbService.addFriendlyNameForRoute('/offer/offer-list/update', 'Update');
    // breadcrumbService.addCallbackForRouteRegex('/offer/offer-list/update/', this.getName);
    //
    // breadcrumbService.addFriendlyNameForRoute('/offer/offer-list/publisher-list', 'Publisher');
    // breadcrumbService.addCallbackForRouteRegex('/offer/offer-list/publisher-list/',this.getName);
    //
    //
    //
    // // breadcrumbService.addFriendlyNameForRoute('/settings/', 'Settings');
    // breadcrumbService.addFriendlyNameForRoute('/settings/customization', 'Settings Customization');
    // breadcrumbService.addFriendlyNameForRoute('/settings/company-profile', 'Settings Company profile');
    // breadcrumbService.addFriendlyNameForRoute('/settings/payments', 'Settings Payments');
    // breadcrumbService.addFriendlyNameForRoute('/settings/system', 'Settings System');
    // breadcrumbService.addFriendlyNameForRoute('/settings/billing-info', 'Settings Billing info');
    //
    // breadcrumbService.addFriendlyNameForRoute('/users/advertiser-list', 'Advertiser');
    // breadcrumbService.addCallbackForRouteRegex('/users/advertiser-list/add-advertiser', this.getValueUsers);
    //   breadcrumbService.addFriendlyNameForRoute('/users/advertiser-list/update', 'Update');
    //   breadcrumbService.addCallbackForRouteRegex('/users/advertiser-list/update/', this.getNameUsers);
    //
    // breadcrumbService.addFriendlyNameForRoute('/users/admin-list', 'Admin');
    // breadcrumbService.addFriendlyNameForRoute('/users/admin-list/update', 'Update');
    //   breadcrumbService.addCallbackForRouteRegex('/users/admin-list/update/', this.getNameUsers);
    // breadcrumbService.addCallbackForRouteRegex('/users/admin-list/add-admin', this.getValueUsers);
    //
    // // breadcrumbService.addFriendlyNameForRoute('/users/publisher-list', 'Publisher');
    // breadcrumbService.addFriendlyNameForRoute('/users/publisher-list/update', 'Update');
    //   breadcrumbService.addCallbackForRouteRegex('/users/publisher-list/update/', this.getNameUsers);
    // breadcrumbService.addCallbackForRouteRegex('/users/publisher-list/add-publisher', this.getValueUsers);
    //
    // breadcrumbService.addFriendlyNameForRoute('/users/publisher-list/payouts', 'Payouts');
    // breadcrumbService.addCallbackForRouteRegex('/users/publisher-list/payouts/',this.getNamePublisher);
    //
    // breadcrumbService.addFriendlyNameForRoute('/users/accountmanager-list', 'Account manager');
    // breadcrumbService.addCallbackForRouteRegex('/users/accountmanager-list/add-accountmanager', this.getValueUsers);
    //   breadcrumbService.addFriendlyNameForRoute('/users/accountmanager-list/update', 'Update');
    //   breadcrumbService.addCallbackForRouteRegex('/users/accountmanager-list/update/', this.getNameUsers);
    //
    // breadcrumbService.addFriendlyNameForRoute('/users/usoffer-list', 'Offers');
    // breadcrumbService.addFriendlyNameForRoute('/users/usoffer-list/add-usoffer-step-1', 'Add offer step one');
    // breadcrumbService.addCallbackForRouteRegex('/users/usoffer-list/add-usoffer-step-2', this.getValueUsers);
    //   breadcrumbService.addFriendlyNameForRoute('/users/usoffer-list/update-usoffer-step-2', 'Update');
    // breadcrumbService.addCallbackForRouteRegex('/users/usoffer-list/update-usoffer-step-2/', this.getName);
    //
    // breadcrumbService.addFriendlyNameForRoute('/users/bundle-list', 'Bundle offers');
    // breadcrumbService.addFriendlyNameForRoute('/users/bundle-list/add-bundle-step-1', 'Add bundle step one');
    // breadcrumbService.addFriendlyNameForRoute('/users/bundle-list/add-bundle-step-2', 'Add bundle step two');
    //   breadcrumbService.addCallbackForRouteRegex('/users/bundle-list/add-bundle-step-3', this.getValueUsers);
    //   breadcrumbService.addFriendlyNameForRoute('/users/bundle-list/update-bundle-step-3', 'Update');
    //   breadcrumbService.addCallbackForRouteRegex('/users/bundle-list/update-bundle-step-3/', this.getNameBundle);
    //
    //   breadcrumbService.addFriendlyNameForRoute('/payments/advertiser-payments-list', 'Advertiser');
    //   breadcrumbService.addFriendlyNameForRoute('/payments/publisher-payments-list', 'Publisher');
      
    // if(typeof this.headerComponent.result !='undefined'){
    //   debugger;
    //   // this.login=true;
    // }
      /*jQuery('.breadcrumbs ul li:first-child a').click(function () {
          this.router.navigate(['/home']);
      })*/
    
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
  // ngAfterContentInit() {
  //   jQuery('.js-form_offer_category .form_offer_category_data').click( function(){
  //     if(!jQuery(this).parents('.form_offer_category').hasClass('active'))
  //     {
  //       jQuery(this).parents('.form_offer_category').addClass('active');
  //       jQuery('.js-form_offer_category .form_offer_category_drop_head>table').width(jQuery('.js-form_offer_category .form_offer_category_drop_body>table').outerWidth(true));//при изменении таблицы надо мерезапускать
  //     }
  //     else{
  //       jQuery(this).parents('.form_offer_category').removeClass('active');
  //     }
  //   });
  //   jQuery('.form_offer_category_drop_head .col1').click( function () {
  //     if(!jQuery('.col1').hasClass('active'))
  //     {
  //       jQuery('.col1').addClass('active');
  //       jQuery('.form_offer_category_drop_body').css('display','block');
  //     }else {
  //       jQuery('.col1').removeClass('active');
  //       jQuery('.form_offer_category_drop_body').css('display','none');
  //     }
  //   });
  //   jQuery('.form_offer_category_drop_head .col2').click( function () {
  //     if(!jQuery('.col2').hasClass('active'))
  //     {
  //       jQuery('.col2').addClass('active');
  //       jQuery('.col2 .jq-selectbox__dropdown').css('display','block');
  //     }else {
  //       jQuery('.col2').removeClass('active');
  //       jQuery('.col2 .jq-selectbox__dropdown').css('display','none');
  //     }
  //   });
  // 
  //   jQuery('input').focus(function(){jQuery(this).parent().parent().find('.form_note').slideDown(200);});
  //   jQuery('input').blur(function(){jQuery(this).parent().parent().find('.form_note').slideUp(200);});
  //
  // }
  
}
