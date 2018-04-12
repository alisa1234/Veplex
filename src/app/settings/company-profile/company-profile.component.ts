import { Component, AfterContentInit,ViewChild,OnInit } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {PopupChange} from '../../popup-change'
import {Domains} from '../../domains';
import {CountriesService} from '../../countries.service';
import {GlobalLogin} from '../../global-login';
import { Router } from '@angular/router';

declare var jQuery:any;

export class Types{

    key:number;
    value:string;
}
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
  providers:[Domains]
})
export class CompanyProfileComponent implements OnInit{
    @ViewChild ('companyName') companyName;
    @ViewChild ('Address') Address;
    @ViewChild ('City') City;
    @ViewChild ('Zip') Zip;
    @ViewChild ('Phone') Phone;
    @ViewChild ('Email') Email;
    
    result: any;
    _http: Http;
    domain: string;
    csrf: string;
    body: any;
    urlSaveSettings: string;
    
    company_name: string='';
    address: string='';
    city: string='';
    zip: string='';
    phone: string='';
    email: string='';
    countrKey: any;
    country_value: string;
    countr: Dictionary;
    countr2: any=[];
    countr3: any=[];
    
    countriesLoaded: boolean = false;
    flag: boolean = false;
  
    key: any;
    valid: any;
    id:string;

    public values=[];
    public value:string='choose_country';
    public myModel = '';
    public maskPhone = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(http: Http, domain: Domains, public _countrieService: CountriesService,public popupChange:PopupChange,public globalLogin:GlobalLogin, public router:Router) {
    this.domain = domain.domain;
    this._http = http;
    this.csrf = domain.csrf;
    this.urlSaveSettings = domain.urlSaveSettings;
    this._countrieService = _countrieService;
    let result: any;

    
      
    this._http.get(this.domain + this.csrf)
        .map((res: Response) => {
          this.body = res.json();
        })
        .subscribe(
            res=>result=res
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
             
              this._http.get(this.domain + this.urlSaveSettings)
                  .map((res: Response) => {
                      return res.json();

                  })
                  .subscribe(
                      res=> {
                          this.result = res.data;

                          this.company_name=this.result.company_name;
                          this.address=this.result.address;
                          this.city=this.result.city;
                          this.zip=this.result.zip;
                          this.phone=this.result.phone;
                          this.email=this.result.email;
                          this.value=this.result.country;
                          
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
      }else{
          this._countrieService.eventEmitter$.subscribe(data=>{
              this.countr = data;
              this.countr3 = Object.keys(this.countr);
              for(let key in this.countr){
                  this.countr2.push(this.countr[key])
              }
             
              this.values.push({'id':'choose_country','title':'Choose country'});
              for (let i=0;i<this.countr2.length;i++){

                  this.values.push({'title':this.countr2[i],'id':this.countr3[i]});

              }
              
              if(this.values.length!=0){

                  this._http.get(this.domain + this.urlSaveSettings)
                      .map((res: Response) => {
                          return res.json();

                      })
                      .subscribe(
                          res=> {
                              this.result = res.data;

                              this.company_name=this.result.company_name;
                              this.address=this.result.address;
                              this.city=this.result.city;
                              this.zip=this.result.zip;
                              this.phone=this.result.phone;
                              this.email=this.result.email;
                              this.value=this.result.country;
                           

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
          })
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
    

    
    send(){
    let profile =
        "CompanyProfileForm[company_name]=" + this.company_name
        + "&CompanyProfileForm[address]=" + this.address
        + "&CompanyProfileForm[city]=" + this.city
        + "&CompanyProfileForm[country]=" + this.value
        + "&CompanyProfileForm[zip]=" + this.zip
        + "&CompanyProfileForm[phone]=" + this.phone
        + "&CompanyProfileForm[email]=" + this.email
        + "&_csrf=" + this.body.csrf;
    let headers=new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this._http.post(this.domain + this.urlSaveSettings, profile, {headers: headers})
        .map((res: Response)  => {
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
                  jQuery("#"+this.key).parent().append("<span  class = 'Error' id = 'Error" + this.key + "'>" + this.valid[this.key] + "</span>");
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
        this.companyName.nativeElement.value='';
        this.Address.nativeElement.value='';
        this.City.nativeElement.value='';
        this.Zip.nativeElement.value='';
        this.Phone.nativeElement.value='';
        this.Email.nativeElement.value='';
    }
}

export interface Dictionary {
    [ index: string ]: string
}
