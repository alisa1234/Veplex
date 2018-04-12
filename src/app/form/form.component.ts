import { Component,AfterContentInit, OnInit, EventEmitter} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import { Router } from '@angular/router';
import {Domains} from '../domains';
import {CountriesService} from '../countries.service';
import {GlobalLogin} from '../global-login';


declare var jQuery:any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers:[Domains]
})
export class FormComponent {//implements  OnInit{
  result: any;
  _http: Http;
  urlCountries: string;
  domain: string;
    urlLogIn: string;
  urlLogOut: string;
  urlRegistration: string;
  csrf: string;
  body: any;
    restore:any;
    
  username: string='';
  name: string='';
  password: string='';
  passwordReg: string='';
  email: string='';
  repeatPassword: string='';
  full_name: string='';
  address: string='';
  city: string='';
  zip: string='';
  phone: string='';
  recoveryEmail: string='';
    urlRestoreEmail:string='';
    urlTakePass:string='';
  rememberMe: number=0;
    
  countr: Dictionary;
  countrKey: any;
  valid: any;
  key: any;
    
    role_name:string;
    role:string;
    login:boolean=false;
    
  loading = false;
  flag:boolean = false;
  countriesLoaded:boolean = false;
    csrfToken:boolean=false;
    hidden:boolean=true;

    public eventEmitter$: EventEmitter<any>;
    
    public myModel = '';
    public maskPhone = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(http: Http, public router: Router, domains: Domains, public _countrieService: CountriesService, public globalLogin:GlobalLogin)
  {
    this._http = http;
    this.urlLogIn = domains.urlLogIn;
    this.domain = domains.domain;
    this.urlLogOut = domains.urlLogOut;
    this.urlRegistration = domains.urlRegistration;
    this.urlCountries = domains.countries;
      this.urlRestoreEmail=domains.urlRestoreEmail;
      this.urlTakePass = domains.urlTakePass;
    this.csrf = domains.csrf;

      this.globalLogin.serverTime=false;
      this.globalLogin.role=null;
      
    this._countrieService = _countrieService;
      this.eventEmitter$=new EventEmitter();
    let result: any;
      this.restore=window
          .location
          .search
          .replace('?','')
          .split('&')
          .reduce(
              function(p,e){
                  var a = e.split('=');
                  p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                  return p;
              },
              {}
          );

      this._http.get(this.domain + this.csrf)
          .map((res: Response) => {
              this.body = res.json();
              this.csrfToken=true;
              console.log('body.csrf')
              // console.log(this.body.csrf);
              if( this.csrfToken===true && this.restore[''] !='undefined'){this.showPopup()}
          })
          .subscribe(
              res =>this.result = res
          );
     
      
      // this.getCountries();

      jQuery(".page-login_form_input .error").hover(function () {
          jQuery(".Error").css('display','block');
      });
      // jQuery("header").hide();
       
      console.log(this.restore);
      
      
      
  }
    showPopup(){

        
        console.log('restore')
        console.log(this.body.csrf)
       
     
        
            console.log('restore not empty' )
            // console.log(this.body.csrf);
            this. forgetPass();
            this.lastStep();
            let result:any;
            let sendRestore = "restore=" + this.restore['restore'] + "&_csrf=" + this.body.csrf;
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
            this._http.post(this.domain + this.urlTakePass, sendRestore,{headers: headers})
                .map((res: Response) => {
                    let body = res.json();
                })
                .subscribe(
                    res => result = res
                );
            console.log('workcxzczc')
        
    }

  // getCountries(){
  //     console.log('get countries')
  //     this._countrieService.eventEmitter$.subscribe((data) => {
  //     this.countr = data.countries;
  //     this.countriesLoaded = true;
  //   });
  // }
  // getCountriesKeys(){
  //   return Object.keys(this.countr);
  // }

  check(){
    let chbox = <HTMLInputElement[]><any>document.getElementsByClassName('remember');
    if(chbox[0].checked == true){
        console.log('checked')
      this.rememberMe = 1;
    }else{
      this.rememberMe = 0;
    }
  }

  submitLogIn(){
    this.loading = true;
    let result: any;
    let user = 
        "LoginForm[username]=" + this.username
        + "&LoginForm[password]=" + this.password
        + "&LoginForm[rememberMe]=" + this.rememberMe
        + "&_csrf=" + this.body.csrf;
      console.log(this.body.csrf)
    let headers = new Headers();
     
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
     
      if(this.rememberMe == 1){
          this.rememberMe = 1;
      }else{this.rememberMe = 0;}
     
      this._http.post(this.domain + this.urlLogIn, user,{headers: headers})
        .map((res: Response) => {
          let body = res.json();
            if(body.logged == true){
                console.log('success login')
                
                this.eventEmitter$.emit(body);
                this.role_name=body.name;
                this.role=body.role;
                this.login=true;
                localStorage.setItem("name",this.role_name);
                localStorage.setItem("role", this.role);
                localStorage.setItem("login", 'true');
                let curr_breadcrumbs=localStorage.getItem('current_breadcrumb');
               
                localStorage.setItem("breadcramb_arr",curr_breadcrumbs);
            debugger;
                this.globalLogin.show_elements(this.role_name,this.role,this.login,localStorage.getItem('current_url'));
           
                
                
                // console.log('form',this.name,this.role);
                
                
          }else{
                this.valid = body.validation;
                for(this.key in this.valid){
                  let key = this.key;
                  this.flag = true;
                   
                  jQuery("#" + this.key).parent().append("<span class = 'error' id = 'error" + this.key + "'></span>");
                  jQuery("#" + this.key).parent().append("<span  class = 'Error' id = 'Error" + this.key + "'>" + this.valid[this.key] + "</span>");
                  jQuery("#error" + this.key).mouseenter( function () {
                      jQuery("#Error" + key).show();
                  }).mouseleave( function () {
                      jQuery("#Error" + key).hide();
                  })
                }
            }
        })
        .subscribe(
            res => result = res
        );
  }
    
  submitSignIn(){
      
      this.countrKey = jQuery("#country").val();
      let result:any;
      let registrationForm =
          "RegistrationForm[name]=" + this.name
        + "&RegistrationForm[full_name]=" + this.full_name
        + "&RegistrationForm[address]=" + this.address
        + "&RegistrationForm[city]=" + this.city
        + "&RegistrationForm[country]=" + this.countrKey
        + "&RegistrationForm[zip]=" + this.zip
        + "&RegistrationForm[phone]=" + this.phone
        + "&RegistrationForm[email]=" + this.email
        + "&&RegistrationForm[password]=" + this.passwordReg
        + "&RegistrationForm[repeatPassword]=" +  this.repeatPassword
        + "&_csrf=" + this.body.csrf;
      let headers = new Headers();

      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      
      this._http.post(this.domain + this.urlRegistration, registrationForm,{headers: headers})
        .map((res: Response) => {
          let body = res.json();
            if(typeof body.validation != 'undefined'){
             this.valid = body.validation;
              for(this.key in this.valid){
                  let key = this.key;
                  this.flag = true;
                  jQuery("#" + this.key).parent().append("<span class = 'error' id = 'error" + this.key + "'></span>");
                  jQuery("#" + this.key).parent().append("<span  class = 'Error' id = 'Error" + this.key + "'>" + this.valid[this.key] + "</span>");
                  jQuery("#error" + this.key).mouseenter( function () {
                      jQuery("#Error" + key).show();
                  }).mouseleave( function () {
                      jQuery("#Error" + key).hide();
                  })
              }
          }else{ this.signInPopup();}
        })
          .subscribe(
              res =>result = res
          );
      
      jQuery(".Error").remove();
      jQuery(".error").remove();
  }
    
  chosenIndividual(){
    jQuery(".individual").show();
    jQuery(".company").hide();
    jQuery(".head_sign ul li:first-child").addClass('active');
    jQuery(".head_sign ul li:last-child").removeClass('active');
  }
    
  chosenCompany(){
    jQuery(".individual").hide();
    jQuery(".company").show();
    jQuery(".head_sign ul li:last-child").addClass('active');
    jQuery(".head_sign ul li:first-child").removeClass('active');
  }
    
   forgetPass() {
      console.log('forget pass')
      
    jQuery('.popup_wr').show();
    jQuery(document).mouseup( function (e) {
      if (!jQuery('.popup_restore').is(e.target) && jQuery('.popup_wr').has(e.target).length === 0) {
        jQuery('.popup_wr').hide();
      }
    });
  }
    
  forgetSteps(){
    jQuery('.popup_restore:first-child').hide();
    jQuery('.popup_restore:nth-child(2)').show();
    let result: any;
    let recovery_email = "email=" + this.recoveryEmail + "&_csrf=" + this.body.csrf;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
      
    this._http.post(this.domain + this.urlRestoreEmail, recovery_email,{headers: headers})
        .map((res: Response) => {
          let body = res.json();
        })
        .subscribe(
            res => result = res
        );
  }
    lastStep(){
        jQuery('.popup_restore:first-child').hide();
        jQuery('.popup_restore:nth-child(2)').hide();
        jQuery('.popup_restore:nth-child(3)').show();
    }

  forgetBack(){
    jQuery('.popup_wr').hide();
    jQuery('.popup_restore:first-child').show();
    jQuery('.popup_restore:nth-child(2)').hide();
  }
    signInPopup(){
        jQuery('.popup_wr2').show();
        jQuery(document).mouseup( function (e) {
            if (!jQuery('.popup_restore').is(e.target) && jQuery('.popup_wr2').has(e.target).length === 0 ) {
                jQuery('.popup_wr2').hide();
            }
        });
        jQuery('.popup_btn').mousedown(function () {
            jQuery('.popup_wr2').hide();
        });
    }
}

export interface Dictionary {
    [ index: string ]: string
}
export interface Error{
    [index:string]:Array<Object>
}
