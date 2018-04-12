import { Component, OnInit,AfterContentInit } from '@angular/core';
import {CountriesService} from '../../countries.service';
import {Http, Response, Headers} from '@angular/http';
import { Router} from '@angular/router';
import {Domains} from '../../domains';
import {GlobalLogin} from '../../global-login';

declare var jQuery:any;

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss']
})
export class BillingInfoComponent implements AfterContentInit,OnInit{
  _http: Http;
  domain: string;
  csrf: string;
  body: any;
  result:any;
    urlSaveBillingAdmin:string;
    urlSaveBillingPublisher:string;

  offer_ch:boolean;
  offer_ok:boolean;
  
  wire:boolean=false;
  paypal:boolean=false;
  iban:string;
  swift:string;
  currency:string;
  bank:string;
  address:string;
  city:string;
  country:string;
  countries:Array<Dictionary>=[];
  zip:string;
    paypal_email:string;

    countr: Dictionary;
    countr2: any=[];
    countr3: any=[];
    
    value:string='choose_county';
    values=[];
  constructor(protected router:Router,http: Http,domains: Domains,public _countrieService: CountriesService, public globalLogin:GlobalLogin) {
    this._http = http;
    // this.url = domains.url;
    this.domain = domains.domain;
    this.csrf = domains.csrf;
    this.urlSaveBillingAdmin = domains.urlSaveBillingAdmin;
    this.urlSaveBillingPublisher = domains.urlSaveBillingPublisher;

    this._http.get(this.domain + this.csrf)
        .map((res: Response) => {
          this.body = res.json();
        })
        .subscribe(
            res =>this.result = res
        );

      if(typeof this._countrieService.countries!='undefined') {

        
          this.countr = this._countrieService.countries;
          this.countr3 = Object.keys(this.countr);
         
          for(let key in this.countr){
              this.countr2.push(this.countr[key])
          }
         
          this.values.push({'id':'choose_country','title':'Choose country'});
          for (let i=0;i<this.countr2.length;i++){
              this.values.push({'title':this.countr2[i],'id':this.countr3[i]});
          }
          
          if(this.values.length!=0){

              if(this.globalLogin.role=='admin'){
                  this._http.get(this.domain + this.urlSaveBillingAdmin)
                      .map((res: Response) => {
                          return res.json();

                      })
                      .subscribe(
                          res=> {
                              this.result = res.data;

                              this.city=this.result.city;
                              this.zip=this.result.zip;
                              this.iban=this.result.iban;
                              this.swift=this.result.swift;
                              this.currency=this.result.currency;
                              this.bank=this.result.bank;
                              this.address=this.result.address;
                              this.value=this.result.country;

                              this.paypal_email=this.result.paypal_email;
                              if(this.result.wire==1){
                                  this.wire=true;
                              }else{this.wire=false;}
                              if(this.result.paypal==1){
                                  this.paypal=true;
                              }else{this.paypal=false;}

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
                      )
              }else{
                  this._http.get(this.domain + this.urlSaveBillingPublisher)
                      .map((res: Response) => {
                          return res.json();

                      })
                      .subscribe(
                          res=> {
                              this.result = res.data;


                              this.city=this.result.city;
                              this.zip=this.result.zip;
                              this.iban=this.result.iban;
                              this.swift=this.result.swift;
                              this.currency=this.result.currency;
                              this.bank=this.result.bank;
                              this.address=this.result.address;
                              this.value=this.result.country;
                              this.paypal_email=this.result.paypal_email;
                              if(this.result.wire==1){
                                  this.wire=true;
                              }else{this.wire=false;}
                              if(this.result.paypal==1){
                                  this.paypal=true;
                              }else{this.paypal=false;}
                          },
                          (err) => {
                              let error=err.json();
                              if(error.logged==false){
                                  this.router.navigate(['/']);
                                  let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                                  localStorage.setItem('current_breadcrumb',current_breadcrumb);
                                  this.globalLogin.serverTime=false;
                                  this.globalLogin.role=null;
                              }


                          }
                      );
              }
          }
      }else{
          this._countrieService.eventEmitter$.subscribe(data=> {
              this.countr =data;
              this.countr3 = Object.keys(this.countr);
             
              for(let key in this.countr){
                  this.countr2.push(this.countr[key])
              }
             
              this.values.push({'id':'choose_country','title':'Choose country'});
              for (let i=0;i<this.countr2.length;i++){
                  this.values.push({'title':this.countr2[i],'id':this.countr3[i]});
              }
            
              if(this.values.length!=0){

                  if(this.globalLogin.role=='admin'){
                      this._http.get(this.domain + this.urlSaveBillingAdmin)
                          .map((res: Response) => {
                              return res.json();

                          })
                          .subscribe(
                              res=> {
                                  this.result = res.data;
                                  
                                  this.city=this.result.city;
                                  this.zip=this.result.zip;
                                  this.iban=this.result.iban;
                                  this.swift=this.result.swift;
                                  this.currency=this.result.currency;
                                  this.bank=this.result.bank;
                                  this.address=this.result.address;
                                  this.value=this.result.country;

                                  this.paypal_email=this.result.paypal_email;
                                  if(this.result.wire==1){
                                      this.wire=true;
                                  }else{this.wire=false;}
                                  if(this.result.paypal==1){
                                      this.paypal=true;
                                  }else{this.paypal=false;}

                              }
                          )
                  }else{
                      this._http.get(this.domain + this.urlSaveBillingPublisher)
                          .map((res: Response) => {
                              return res.json();

                          })
                          .subscribe(
                              res=> {
                                  this.result = res.data;


                                  this.city=this.result.city;
                                  this.zip=this.result.zip;
                                  this.iban=this.result.iban;
                                  this.swift=this.result.swift;
                                  this.currency=this.result.currency;
                                  this.bank=this.result.bank;
                                  this.address=this.result.address;
                                  this.value=this.result.country;
                                  this.paypal_email=this.result.paypal_email;
                                  if(this.result.wire==1){
                                      this.wire=true;
                                  }else{this.wire=false;}
                                  if(this.result.paypal==1){
                                      this.paypal=true;
                                  }else{this.paypal=false;}
                              },
                              (err) => {
                                  let error=err.json();
                                  if(error.logged==false){
                                      this.router.navigate(['/']);
                                      let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                                      localStorage.setItem('current_breadcrumb',current_breadcrumb);
                                      this.globalLogin.serverTime=false;
                                      this.globalLogin.role=null;
                                  }


                              }
                          )
                  }
              }
          })
          }
  }
  getRadio(checked,field){
      if(this.globalLogin.role!='admin'){
          if(field=='paypal' ){
              this.paypal=checked;
              this.wire=false;
          }else{this.wire=checked;this.paypal=false;}
      }
  
}
ngOnInit(){

}
  keypress(event: any){
    if(jQuery('.form_offer_btn_ch').hasClass('inactive'))
    {
      jQuery('.form_offer_btn_ch ').removeClass('inactive');
    }
    if(jQuery('#company_name').val() === '')
    {
      jQuery('.form_offer_btn_ch').addClass('inactive');
    }
  }
  ngAfterContentInit(){
  }
  send(formData:FormData=new FormData()){

   let wire=this.wire;
   let paypal=this.paypal;
   let iban=this.iban;
   let swift=this.swift;
   let currency=this.currency;
   let bank=this.bank;
   let address=this.address;
   let city=this.city;
   let country=this.value;
   let zip=this.zip;
   let paypal_email=this.paypal_email;
    let csrf=this.body.csrf;
    let xhr: XMLHttpRequest = new XMLHttpRequest();
   
    formData.append("_csrf",csrf);

    this.FormDataCreate(
        formData,
        {
          wire:wire,
          paypal:paypal,
          iban:iban,
          swift:swift,
          currency:currency,
          bank:bank,
          address:address,
          city:city,
          country:country,
          zip:zip,
            paypal_email:paypal_email
        }
    );

    let headers = new Headers();
    headers.append('Content-type', 'multipart/form-data');
if(this.globalLogin.role=='admin'){
    xhr.open('POST',this.domain+this.urlSaveBillingAdmin,true);
    xhr.send(formData);
    let self=this;
    xhr.onreadystatechange=function () {

        if(xhr.readyState==XMLHttpRequest.DONE){
            let res=xhr.response;
            let body=JSON.parse(res);
            if(typeof body.logged!='undefined'&& body.logged==false){
                self.router.navigate(['/']);
                let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                localStorage.setItem('current_breadcrumb',current_breadcrumb);
                localStorage.setItem('current_url',self.router.url);
                self.globalLogin.serverTime=false;
                self.globalLogin.role=null;
            }
            if(typeof body.validation.length==='undefined'){
                let flag:boolean=false;
                for(let key in body.validation){
                    flag=true;
                    jQuery("#"+key).parent().append("<span class='error' id='error"+key+"'></span>");
                    jQuery("#"+key).parent().append("<span  class='Error' id='Error"+key+"'>"+body.validation[key]+"</span>");
                    jQuery("#error"+key).mouseenter( function () {
                        jQuery("#Error"+key).show();
                    }).mouseleave(function () {
                        jQuery("#Error"+key).hide();
                    })
                }
            }
            if(body.saved=="ok") {
                self.offer_ok = false;
                self.offer_ch = true;
            }

            if(body.validation.length === 0){jQuery('.form_offer_btn_ch').addClass('inactive');}
        }
    }
}else{
    xhr.open('POST',this.domain+this.urlSaveBillingPublisher,true);
    xhr.send(formData);
    let self=this;
    xhr.onreadystatechange=function () {

        if(xhr.readyState==XMLHttpRequest.DONE){
            let res=xhr.response;
            let body=JSON.parse(res);

            if(typeof body.validation.length==='undefined'){
                let flag:boolean=false;
                for(let key in body.validation){
                    flag=true;
                    jQuery("#"+key).parent().append("<span class='error' id='error"+key+"'></span>");
                    jQuery("#"+key).parent().append("<span  class='Error' id='Error"+key+"'>"+body.validation[key]+"</span>");
                    jQuery("#error"+key).mouseenter( function () {
                        jQuery("#Error"+key).show();
                    }).mouseleave(function () {
                        jQuery("#Error"+key).hide();
                    })
                }
            }
            if(body.saved=="ok") {
                self.offer_ok = false;
                self.offer_ch = true;
            }

            if(body.validation.length === 0){jQuery('.form_offer_btn_ch').addClass('inactive');}
        }
    }
}

    jQuery(".Error").remove();
    jQuery(".error").remove();

  }

  FormDataCreate(formData:FormData,values:any){
    for(let key in values){
      let value = values[key];
        if(typeof values[key] === 'object'){
            formData.append('BillingInfo['+key+']', '');
        }else{formData.append('BillingInfo['+key+']', value);}
    }

  }

  sendOk(){
    this.router.navigate(['/offer/offer-list']);

  }
  clear(){
    this.sendOk();
  }
}
export interface Dictionary {
  [ index: string ]: string
}
