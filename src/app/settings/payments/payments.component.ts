import { Component, OnInit,ViewChild } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {GlobalLogin} from '../../global-login';
import { Router } from '@angular/router';

import {Domains} from '../../domains';

declare var jQuery:any;

export class Stats{
  key: number;
  value: string;
}
const STATS: Stats[] = [
  {key: 1, value: 'on 1st day'},
  {key: 2, value: 'on 2nd day'},
  {key: 3, value: 'on 3rd day'},
  {key: 4, value: 'on 4th day'},
  {key: 5, value: 'on 5th day'},
  {key: 6, value: 'on 6th day'},
  {key: 7, value: 'on 7th day'},
  {key: 8, value: 'on 8th day'},
  {key: 9, value: 'on 9th day'},
  {key: 10,value: 'on 10th day'},
  {key: 11,value: 'on 11th day'},
  {key: 12,value: 'on 12th day'},
  {key: 13,value: 'on 13th day'},
  {key: 14,value: 'on 14th day'},
  {key: 15,value: 'on 15th day'}
];

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  providers:[Domains]
})
export class PaymentsComponent implements OnInit {
  @ViewChild ('daysValue') daysValue;
  @ViewChild ('statsValue') statsValue;
  
  result: any;
  _http: Http;
  domain: string;
  csrf: string;
  body: any;
  urlSavePayments: string;
    
  send_over_stats: number;
  payment_cycley: string='';
  
  key: any;
  valid: any;
    
  flag: boolean = false;
    offer_ch:boolean;
    offer_ok:boolean;
  stats = STATS;
  selectStats= [
      {'value': '1', 'tittle': 'on 1st day'},
      {'value': '2', 'tittle': 'on 2nd day'},
      {'value': '3', 'tittle': 'on 3rd day'},
      {'value': '4', 'tittle': 'on 4th day'},
      {'value': '5', 'tittle': 'on 5th day'},
      {'value': '6', 'tittle': 'on 6th day'},
      {'value': '7', 'tittle': 'on 7th day'},
      {'value': '8', 'tittle': 'on 8th day'},
      {'value': '9', 'tittle': 'on 9th day'},
      {'value': '10','tittle': 'on 10th day'},
      {'value': '11','tittle': 'on 11th day'},
      {'value': '12','tittle': 'on 12th day'},
      {'value': '13','tittle': 'on 13th day'},
      {'value': '14','tittle': 'on 14th day'},
      {'value': '15','tittle': 'on 15th day'}
      ];
    
    selectDays=[{'value':'payment_cycley','tittle':'Payment cycley'},{'value':'d','tittle':'Daily'},{'value':'w','tittle':'Weekly'},{'value':'sm','tittle':'Semi-monthly'},{'value':'m','tittle':'Monthly'}];
    
  constructor(http: Http, domain: Domains, public globalLogin:GlobalLogin, public router:Router) {
    this.domain = domain.domain;
    this._http = http;
    this.csrf = domain.csrf;
    this.urlSavePayments = domain.urlSavePayments;
    this.send_over_stats = null;
    this.payment_cycley = null;

    this._http.get(this.domain + this.csrf)
        .map((res: Response) => {
          this.body = res.json();
        })
        .subscribe(
            res => this.result = res
        );

      this._http.get(this.domain + this.urlSavePayments)
          .map((res: Response) => {
              return res.json();

          })
          .subscribe(
              res=> {
                  this.result = res.data;


                  this.send_over_stats=this.result.send_over_stats;
                  this.payment_cycley=this.result.payment_cycley;
                  
              },
              (err) => {
                  let error=err.json();
                  if(error.logged==false){
                      this.router.navigate(['/']);
                      let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                      localStorage.setItem('current_breadcrumb',current_breadcrumb);
                      localStorage.setItem('current_url',this.router.url);
                      this.globalLogin.serverTime=false;
                      this.globalLogin.role=null;
                  }


              }
          );
  }

  ngOnInit() {
  }

    keypress(){
        if(this.offer_ch==true)
        {
            this.offer_ch=false;
            this.offer_ok=true;
        }

        if(jQuery('.form_offer_btn_ch').hasClass('inactive'))
        {
            jQuery('.form_offer_btn_ch ').removeClass('inactive');
            jQuery('.form_offer_btn_ch').prop('disabled',false);
        }
        if(jQuery('#name').val() === '')
        {
            jQuery('.form_offer_btn_ch').addClass('inactive');
            jQuery('.form_offer_btn_ch').prop('disabled',true);
        }
    }
  onSelectStats(value){
    this.send_over_stats = value;
  }
    
  onSelectDays(value){
    this.payment_cycley = value;
    if(jQuery('.form_offer_btn_ch').hasClass('inactive'))
    {
        jQuery('.form_offer_btn_ch ').removeClass('inactive');
    }
    if(this.daysValue === null)
    {
        jQuery('.form_offer_btn_ch').addClass('inactive');
    }
  }

  send(){
    let payments =
        "PaymentsForm[payment_cycley]=" + this.payment_cycley 
        + "&PaymentsForm[send_over_stats]=" + this.send_over_stats
        + "&_csrf=" + this.body.csrf;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this._http.post(this.domain + this.urlSavePayments, payments,{headers: headers})
        .map((res: Response) => {
          let body = res.json();
            if(typeof body.logged!='undefined'&& body.logged==false){
                this.router.navigate(['/']);
                let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                localStorage.setItem('current_breadcrumb',current_breadcrumb);
                localStorage.setItem('current_url',this.router.url);
                this.globalLogin.serverTime=false;
                this.globalLogin.role=null;
            }
          if(typeof body.validation != 'undefined'){
              this.valid = body.validation;
              for(this.key in this.valid){
                  let key = this.key;
                  this.flag = true;
                  jQuery("#" + this.key).parent().append("<span class = 'error' id = 'error" + this.key + "'></span>");
                  jQuery("#" + this.key).parent().append("<span  class = 'Error' id = 'Error" + this.key + "'>" + this.valid[this.key] + "</span>");
                  jQuery("#error" + this.key).mouseenter( function () {
                      jQuery("#Error" + key).show();
                  }).mouseleave(function () {
                      jQuery("#Error" + key).hide();
                  })
              }}
            if(body.validation.length === 0){jQuery('.form_offer_btn_ch').addClass('inactive');}
        })
        .subscribe(res => this.result = res);
      jQuery(".Error").remove();
      jQuery(".error").remove();
  }
    
  clear(){
      this.daysValue = null;
      this.statsValue = null;
      jQuery('.form_offer_btn_ch').addClass('inactive')
  }
}
