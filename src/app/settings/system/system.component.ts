import { Component, OnInit,ViewChild } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {GlobalLogin} from '../../global-login';
import { Router } from '@angular/router';
import {Domains} from '../../domains';
declare var jQuery:any;

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  providers:[Domains]
})
export class SystemComponent implements OnInit {
  @ViewChild ('TrackingDomain1') trackingDomain1;
  @ViewChild ('TrackingDomain2') trackingDomain2;
  @ViewChild ('TrackingDomain3') trackingDomain3;
  @ViewChild ('CallbackUrl') callbackUrl;
  @ViewChild ('FallbackUrl') fallbackUrl;
  @ViewChild ('ServerIp') serverIp;
  
  result: any;
  _http: Http;
  domain: string;
  csrf: string;
  body: any;
  urlSaveSystem: string;
  
  tracking_domain: string='';
  tracking_domains: string []=[];
  tracking_domain2: string='';
  tracking_domain3: string='';
  callback_url: string='';
    fallback_url:string='';
  server_ip: string='';
  
  key: any;
  valid: any;
  
  flag: boolean = false;
  
  constructor(http: Http, domain: Domains, public globalLogin:GlobalLogin, public router:Router) {
    this.domain = domain.domain;
    this._http = http;
    this.csrf = domain.csrf;
    this.urlSaveSystem = domain.urlSaveSystem;

    this._http.get(this.domain + this.csrf)
        .map((res: Response) => {
          this.body = res.json();
        })
        .subscribe(
            res => this.result = res
        );

    this._http.get(this.domain + this.urlSaveSystem)
        .map((res: Response) => {
          return res.json();

        })
        .subscribe(
            res=> {
              this.result = res.data;


              // this.tracking_domain=this.result.tracking_domain;
              // this.tracking_domain2=this.result.tracking_domain2;
              // this.tracking_domain3=this.result.tracking_domain3;
              this.callback_url=this.result.callback_url;
              this.server_ip=this.result.server_ip;
              this.fallback_url=this.result.fallback_url;
              // this.timezone=this.result.timezone;

                if(this.result.tracking_domain != null) {
                    for (let i = 0; i <this.result.tracking_domain.length; i++) {
                        this.tracking_domains.push(this.result.tracking_domain[i]);
                        jQuery('#form_offer_access-whitelist').parent('li').append("<div class='form_offer_access' id='" + this.result.tracking_domain[i] + "'><span class='wr_inpt'><input type='hidden' value='x'><span class='fon_inpt1'>" + this.result.tracking_domain[i] + "<a class='form_offer_browse_file_close' id='" + this.result.tracking_domain[i] + "'></a></span></span> </div>");
                        this.addHtml(this.result.tracking_domain[i]);
                    }
                }



            },
            (err) => {
                let error=err.json();
                if(error.logged==false){

                    // window.location.replace(this.domain);
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
    addDomains(){
        jQuery('#form_offer_access-whitelist').parent('li').append("<div class='form_offer_access' id='"+this.tracking_domain+"'><span class='wr_inpt'><input type='hidden' value='x'><span class='fon_inpt1'>"+this.tracking_domain+"<a class='form_offer_browse_file_close' id='"+this.tracking_domain+"'></a></span></span> </div>")
        this.tracking_domains.push(this.tracking_domain);

        console.log('addd ips',this.tracking_domains)
        this.addHtml(this.tracking_domain);
        this.tracking_domain='';
        jQuery(".form_offer_act_add").css('display','none');
    }
    addHtml(id) {
        let some=document.getElementById(id);
        some.addEventListener('click',this.clearing.bind(this));
    }
    clearing(event){
        console.log('clearing func')
        let id = event.target.getAttribute('id');
        let id2 = event.target.parentNode.parentNode.id;
        let id3 = event.target.parentNode.parentNode.parentNode.id;
        if(id3==event.target.id){

            for(let i=0; i<this.tracking_domains.length;i++){

                if(id===this.tracking_domains[i]){
                    this.tracking_domains.splice(i,1);

                    console.log('ips',this.tracking_domains)
                }
            }
            document.getElementById(id).remove();
            jQuery('.form_offer_btn_ch ').removeClass('inactive');
        }
    }
  keypress(event: any){
     
    if(jQuery('.form_offer_btn_ch').hasClass('inactive'))
    {
      jQuery('.form_offer_btn_ch ').removeClass('inactive')
    }
    if(jQuery('#tracking_domain1').val() === '')
    {
      jQuery('.form_offer_btn_ch').addClass('inactive')
    }
      if(jQuery("#ip_whitelist").val() != '' || event.type=='paste'){jQuery(".form_offer_act_add").css('display','block')}else{jQuery(".form_offer_act_add").css('display','none')}
  }
    send(formData:FormData=new FormData()){
        
        let xhr: XMLHttpRequest = new XMLHttpRequest();
       let tracking_domains:string []=this.tracking_domains;
        let callback_url=this.callback_url;
        let server_ip=this.server_ip;
        let fallback_url=this.fallback_url;
        let csrf=this.body.csrf;
       
        formData.append("_csrf",csrf);

        this.FormDataCreate(
            formData,
            {
                // tracking_domain:tracking_domain,
                callback_url:callback_url,
                server_ip:server_ip,
                fallback_url:fallback_url
             
            }
        );
        for(let i=0;i<tracking_domains.length;i++){
                 formData.append('SystemForm[tracking_domain][]',tracking_domains[i]) ;
        }
        
        let headers = new Headers();
        headers.append('Content-type', 'multipart/form-data');

        xhr.open('POST',this.domain + this.urlSaveSystem,true);
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
                        if(key=='category_id'){
                            jQuery("#error"+key).css('right','-61px');
                            jQuery("#Error"+key).css('left','346px');
                        }
                    }
                }
                if(body.saved=="ok") {
                    jQuery('.form_offer_btn_ch').addClass('inactive');
                }

                if(body.validation.length === 0){jQuery('.form_offer_btn_ch').addClass('inactive');}
            }
        }
     

        jQuery(".Error").remove();
        jQuery(".error").remove();

    }

    FormDataCreate(formData:FormData,values:any){
        for(let key in values){
            let value = values[key];
            if(typeof values[key] === 'object'){
                formData.append('SystemForm['+key+']', '');
            }else{formData.append('SystemForm['+key+']', value);}
        }

    }
 
  // send(){
  //     let system = 
  //         "SystemForm[tracking_domain1]=" + this.tracking_domain
  //         // + "&SystemForm[tracking_domain2]=" + this.tracking_domain2
  //         // + "&SystemForm[tracking_domain3]=" + this.tracking_domain3
  //         + "&SystemForm[callback_url]=" + this.callback_url 
  //         + "&SystemForm[server_ip]=" + this.server_ip 
  //         + "&SystemForm[fallback_url]=" + this.fallback_url 
  //         + "&_csrf=" + this.body.csrf;
  //     let tracking_domains;
  //     for(let i=0;i<this.tracking_domains.length;i++){
  //         tracking_domains += 'SystemForm[tracking_domain]'+ this.tracking_domains[i];
  //     }
  //    
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //
  //   this._http.post(this.domain + this.urlSaveSystem, system, {headers: headers})
  //       .map((res: Response) => {
  //         let body = res.json();
  //         if(typeof body.validation != 'undefined'){
  //           this.valid = body.validation;
  //           for(this.key in this.valid){
  //             let key = this.key;
  //             this.flag = true; 
  //             jQuery("#" + this.key).parent().append("<span class = 'error' id = 'error" + this.key + "'></span>");
  //             jQuery("#" + this.key).parent().append("<span  class = 'Error' id = 'Error" + this.key + "'>" + this.valid[this.key] + "</span>");
  //             jQuery("#error" + this.key).mouseenter( function () {
  //               jQuery("#Error" + key).show();
  //             }).mouseleave( function () {
  //               jQuery("#Error" + key).hide();
  //             })
  //           }}
  //         if(body.validation.length === 0){jQuery('.form_offer_btn_ch').addClass('inactive');}
  //       })
  //       .subscribe(res => this.result = res);
  //  
  //   jQuery(".Error").remove();
  //   jQuery(".error").remove();
  // // }
  
  clear(){
    this.trackingDomain1.nativeElement.value='';
    this.trackingDomain2.nativeElement.value='';
    this.trackingDomain3.nativeElement.value='';
    this.callbackUrl.nativeElement.value='';
    this.fallbackUrl.nativeElement.value='';
    this.serverIp.nativeElement.value='';
  }
}
