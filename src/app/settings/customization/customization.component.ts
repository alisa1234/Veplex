import { Component, OnChanges ,ViewChild,Input,AfterViewChecked, AfterViewInit } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../domains';
import {TimeZoneService} from '../../timeZone.service';
import {ValidationService} from '../../validation.service';
import {GlobalLogin} from '../../global-login';
import { Router } from '@angular/router';

declare var jQuery:any;

@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss'],
  providers:[Domains]
})

export class CustomizationComponent implements AfterViewChecked,AfterViewInit{
  @ViewChild ('logo_upload') upload_logo_file;
  @ViewChild ('favicon_upload') upload_favicon_file;
  @ViewChild ('color_value') color_value;
  @ViewChild ('timeValue') timeValue;
  result:any;
  domain:string;
  _http: Http;
  
color:string='';
  timezone:any;
  logo:File;
  logo_name:string;
  favicon:File;
  favicon_name:string;
  flag_logo:boolean=false;
  flag_favicon:boolean=false;
  urlSaveCustomization:string;
  csrf:string;
  body:any;
  timezonesLoaded:boolean=false;
  title:any;
  value:any;
  timezoneKey:string;
  valid: any;
  key:any;
  logo_value:any;
  favicon_value:any;
  timezone_value:string='';
  ifSelected:boolean;

    flags:any[]=['form_offer_browse-logo','form_offer_browse-favicon'];
  constructor(http:Http,domain:Domains,public _timezoneService:TimeZoneService,public _validationService:ValidationService, public globalLogin:GlobalLogin, public router:Router) {
    this.ifSelected=true;
    this.domain=domain.domain;
    this.csrf=domain.csrf;
    this.urlSaveCustomization=domain.urlSaveCustomization;
    this._timezoneService=_timezoneService;
    this._validationService=_validationService;
    this._http = http;

    this.timezone_value='Choose timezone';
    let result:any;
    this._http.get(this.domain+this.csrf)
        .map((res: Response) => {
          this.body = res.json();
        })
        .subscribe(
            res=>result=res
        );

    this._http.get(this.domain + this.urlSaveCustomization)
        .map((res: Response) => {
          return res.json();

        })
        .subscribe(
            res=> {
              this.result = res.data;
              this.color=this.result.color;
              this.favicon=this.result.favicon;
              this.favicon_name=this.result.favicon;
                jQuery("#form_offer_favicon_upload").before("<div id='b"+this.favicon+"' class='form_offer_browse_file favicon'><span class='form_offer_browse_file_name'>"+this.favicon+"</span><a id='b"+this.favicon+"' class='form_offer_browse_file_close' ></a></div>");
                this.addHtml('b'+this.favicon,this.favicon);
                this.logo=this.result.logo;
                this.logo_name=this.result.logo;
                jQuery("#form_offer_logo_upload").before("<div id='a"+this.logo+"' class='form_offer_browse_file  logo'><span class='form_offer_browse_file_name'>"+this.logo+"</span><a id='a"+this.logo+"' class='form_offer_browse_file_close' ></a></div>");
                this.addHtml('a'+this.logo,this.logo);
                this.timezone_value=this.result.timeZone;
                

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
    this.getTimezone();
  }
ngOnInit(){

}
  ngAfterViewInit()  {
    
  }
  ngAfterViewChecked() {}
  keypress(event:any){
    if(jQuery('.form_offer_btn_ch').hasClass('inactive')){jQuery('.form_offer_btn_ch ').removeClass('inactive')}
    if(jQuery('#color').val()=== ''){jQuery('.form_offer_btn_ch').addClass('inactive')}
  }
  getTimezone(){
    
    this._timezoneService.getTimezoneService().subscribe((data)=>{
      this.timezone = data.zones;
    });
  }
  getValidation():void{
    this.valid=this._validationService.getValidation();
  }
 uploading_logo(){
   this.logo=this.upload_logo_file.nativeElement.files[0];
   this.logo_name=this.upload_logo_file.nativeElement.files[0].name;
     jQuery(".logo").remove();
     jQuery("#form_offer_logo_upload").before("<div id='a"+this.upload_logo_file.nativeElement.files[0].name+"' class='form_offer_browse_file logo'><span class='form_offer_browse_file_name'>"+this.upload_logo_file.nativeElement.files[0].name+"</span><a id='a"+this.upload_logo_file.nativeElement.files[0].name+"' class='form_offer_browse_file_close' ></a></div>");
     this.addHtml('a'+this.logo_name,this.logo_name);
}
  uploading_favicon(){
      this.favicon=this.upload_favicon_file.nativeElement.files[0];
      this.favicon_name=this.upload_favicon_file.nativeElement.files[0].name;
      jQuery(".favicon").remove();
      jQuery("#form_offer_favicon_upload").before("<div id='b"+this.upload_favicon_file.nativeElement.files[0].name+"' class='form_offer_browse_file favicon'><span class='form_offer_browse_file_name'>"+this.upload_favicon_file.nativeElement.files[0].name+"</span><a id='b"+this.upload_favicon_file.nativeElement.files[0].name+"' class='form_offer_browse_file_close' ></a></div>");
      this.addHtml('b'+this.favicon_name,this.favicon_name);
  }
    addHtml(id,name) {
        let some=document.getElementById(id);

        some.addEventListener('click',this.clearing.bind(this));
    }
    clearing(event){
        let id = event.target.getAttribute('id');
        if(jQuery('.form_offer_btn_ch').hasClass('inactive')){jQuery('.form_offer_btn_ch ').removeClass('inactive')}
            document.getElementById(id).remove();
            if(id.charAt(0)==='a'){
                        this.logo_name='';
                
            }else{
                        this.favicon_name='';
            }

    }
  send(){
      let customization="CustomizationForm[color]="+this.color
    +"&CustomizationForm[file_logo]="+this.upload_logo_file.nativeElement.files[0]
    +"&CustomizationForm[file_favicon]="+this.upload_favicon_file.nativeElement.files[0]
    +"&CustomizationForm[timeZone]="+this.timezone_value
    +"&_csrf="+this.body.csrf;

    let xhr: XMLHttpRequest = new XMLHttpRequest();
      let formData:FormData=new FormData();
      let logo;
      let favicon;
      if( this.logo_name!=''){
          logo=this.logo;
          formData.append('CustomizationForm[file_logo]',logo);
       
      }
      if( this.favicon_name!=''){
          favicon=this.favicon;
          formData.append('CustomizationForm[file_favicon]', favicon);
        
      }
    let color=this.color;
    let timeZone=this.timezone_value;
    let csrf=this.body.csrf;
      
      
    
      let allow_files = {logo:{},favicon:{}};
      allow_files.logo=this.logo_name;
      allow_files.favicon=this.favicon_name;
    
    
    
    formData.append('CustomizationForm[allowed_files]', JSON.stringify(allow_files));
    formData.append('CustomizationForm[color]', color);
    formData.append('CustomizationForm[timeZone]', timeZone);
    formData.append('_csrf',csrf);
      
   
    let headers = new Headers();
    headers.append('Content-type', 'multipart/form-data');
   
   xhr.open('POST',this.domain+this.urlSaveCustomization,true);
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
        if(body.validation.length === 0){jQuery('.form_offer_btn_ch').addClass('inactive');}
      }
    }

    jQuery(".Error").remove();
    jQuery(".error").remove();

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
