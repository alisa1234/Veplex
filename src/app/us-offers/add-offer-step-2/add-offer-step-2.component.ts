import { Component, OnInit , EventEmitter} from '@angular/core';
import {Location} from '@angular/common';
import {GlobalUsOffer} from '../global-usoffer'
import { Router,ActivatedRoute } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../domains';
import {CountriesService} from '../../countries.service';
import {PopupChange} from '../../popup-change';
import {Filters} from '../../filters';
import {RenderOffer} from '../../add-offer/render-offer';
import {StatusService} from '../../status.service';
import {GlobalLogin} from '../../global-login';

declare var jQuery:any;

@Component({
  selector: 'app-add-offer-step-2',
  templateUrl: './add-offer-step-2.component.html',
  styleUrls: ['./add-offer-step-2.component.scss']
})
export class AddOfferStep2Component extends GlobalUsOffer implements OnInit {

  uid:string='';
  subid:string='';
  subid2:string='';
  subid3:string='';
  subid4:string='';
  postback_url:string='';
  // remove_referral:number;
offer_id:string;
  id:string='';
offer_name:string;
  offer_ch:boolean;
  offer_ok:boolean;
  tracking_url:string;
  tracking:boolean=true;
  
  tittle:string='';
  tittle_id:string='';
  
  item_name:string='';
  
  constructor(public router:Router,public route: ActivatedRoute,http: Http,domains: Domains, public _countrieService: CountriesService,public filters:Filters,public popupChange:PopupChange,public renderOffer:RenderOffer,public statusService:StatusService,public location: Location, public globalLogin:GlobalLogin) {
    super(router,http,domains,_countrieService,filters,popupChange,statusService,globalLogin)
    this.renderOffer=renderOffer;
    this.offer_id=this.renderOffer.id;
    this.offer_ch=true;
    console.log('dfsdfsd2',this.offer_id)
    this.tittle='Add offer';
this.item_name='usoffer';
    
    this._http.get(this.domain + this.csrf)
        .map((res: Response) => {
          this.body = res.json();
        })
        .subscribe(
            res =>this.result = res
        );
    localStorage.setItem("users_value",  'Add offer');
    this.offer_id=localStorage.getItem("offer_id");
    this.id=localStorage.getItem("id");
    this.offer_name=localStorage.getItem("offer_name");
    
    if(this.route.snapshot.data['name']=='Update '+this.item_name){

      this.route.snapshot.data['breadcrumb']='Update offer '+this.offer_name;
    }
    if(typeof this.renderOffer.usOfferResult !='undefined'){
      console.log('yes',this.renderOffer.usOfferResult)
      this.uid=this.renderOffer.usOfferResult.uid;
      this.subid=this.renderOffer.usOfferResult.subid;
      this.subid2=this.renderOffer.usOfferResult.subid2;
      this.subid3=this.renderOffer.usOfferResult.subid3;
      this.subid4=this.renderOffer.usOfferResult.subid4;
      this.postback_url=this.renderOffer.usOfferResult.postback_url;
      this.tracking=false;
      this.tracking_url=this.renderOffer.usOfferResult.tracking_domain;
      this.tittle='Update offer';
      this.tittle_id='ID'+this.renderOffer.usOfferResult.id;
      localStorage.setItem("users_value",  'Update offer');
      this.location.replaceState("users/usoffer-list/update-usoffer-step-2/"+this.id);
    }
  }

  ngOnInit() {
    // this.route
    //     .params
    //     .subscribe(params => {
    //       console.log(params);
    //       this.offer_id = params['id'];
    //       // this.renderOffer.renderUpdate(this.offer_id);
    //
    //     });
  }
  keypress(event:any){
    if(this.offer_ch==true)
    {
      this.offer_ch=false;
      this.offer_ok=true;
    }
    if(jQuery("#ip_whitelist").val() != ''){jQuery(".form_offer_act_add").css('display','block')}
  }
addReturn(e){
  // let input=jQuery('.form_offer_link').children('input');
  if(jQuery('#'+e.target.id).hasClass('form_offer_act_del')){
    if(e.target.id=='add_tid'){
      // for(let i=0;i<input.length;i++){
      //   let str=input[i].value;
      // this.postback_url='{TID}';
      this.postback_url=this.postback_url.replace('{TID}','');
      // }
    }
    if(e.target.id=='add_sid'){
      // for(let i=0;i<input.length;i++){
      //   let str=input[i].value;
      this.postback_url=this.postback_url.replace('{SID}','');
      // }
    }
    if(e.target.id=='add_subid'){
      // for(let i=0;i<input.length;i++){
      //   let str=input[i].value;
      this.postback_url=this.postback_url.replace('{SUBID}','');
      // }
    }
    if(e.target.id=='add_subid2'){
      // for(let i=0;i<input.length;i++){
      //   let str=input[i].value;
      this.postback_url=this.postback_url.replace('{SUBID2}','');
      // }
    }
    if(e.target.id=='add_subid3'){
      // for(let i=0;i<input.length;i++){
      //   let str=input[i].value;
      this.postback_url=this.postback_url.replace('{SUBID3}','');
      // }
    }
    if(e.target.id=='add_subid4'){
      // for(let i=0;i<input.length;i++){
      //   let str=input[i].value;
      this.postback_url=this.postback_url.replace('{SUBID4}','');
      // }
    }
    jQuery('#'+e.target.id).removeClass('form_offer_act_del');
  }else{
    if(e.target.id=='add_tid'){
      console.log('fsdfds',this.postback_url)
      // for(let i=0;i<input.length;i++){
      this.postback_url+='{TID}';
      // }
    }
    if(e.target.id=='add_subid'){
      // for(let i=0;i<input.length;i++){
      this.postback_url+='{SUBID}';
      // }
    }
  //   if(e.target.id=='subid'){
  //     for(let i=0;i<input.length;i++){
  //       input[i].value+='{SUBID}';
  //     }
  //   }
    if(e.target.id=='add_subid2'){
      // for(let i=0;i<input.length;i++){
      this.postback_url+='{SUBID2}';
      // }
    }
    if(e.target.id=='add_subid3'){
      // for(let i=0;i<input.length;i++){
      this.postback_url+='{SUBID3}';
      // }
    }
    if(e.target.id=='add_subid4'){
      // for(let i=0;i<input.length;i++){
      this.postback_url+='{SUBID4}';
      // }
    }
    if(e.target.id=='add_sid'){
      // for(let i=0;i<input.length;i++){
      this.postback_url+='{SID}';
      // }
    }
    jQuery('#'+e.target.id).addClass('form_offer_act_del');
  }
 
}
  send(formData:FormData=new FormData()){


    if(this.remove_refferal == 1){
      this.remove_refferal = 1;
    }else{this.remove_refferal = 0;}

    let xhr: XMLHttpRequest = new XMLHttpRequest();
    let uid=this.uid;
    let subid=this.subid;
    let subid2=this.subid2;
    let subid3=this.subid3;
    let subid4=this.subid4;
    let postback_url=this.postback_url;
    let remove_referral=this.remove_refferal;
    let csrf=this.body.csrf;
    let offer_id=this.offer_id;

    formData.append("_csrf",csrf);

    this.FormDataCreate(
        formData,
        {
          uid:uid,
          subid:subid,
          subid2:subid2,
          subid3:subid3,
          subid4:subid4,
          postback_url:postback_url,
          remove_referral:remove_referral,

        }
    );

    let headers = new Headers();
    headers.append('Content-type', 'multipart/form-data');

    xhr.open('POST',this.domain+this.urlGetList+(this.id ? this.id:'')+'?step=2&offer_id='+offer_id,true);
   
    xhr.send(formData);
    let self=this;
    xhr.onreadystatechange=function () {

      if(xhr.readyState==XMLHttpRequest.DONE){
        let res=xhr.response;
        let body=JSON.parse(res);
        console.log('result body',body)
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
          self.tracking_url=body.tracking_url;
          self.tracking=false;
        }

        if(body.validation.length === 0){jQuery('.form_offer_btn_ch').addClass('inactive');}
      }
    }
    // this.addOffer.render_offer_results=null;

    jQuery(".Error").remove();
    jQuery(".error").remove();

  }
  FormDataCreate(formData:FormData,values:any){
    for(let key in values){
      let value = values[key];
      if(typeof values[key] === 'object'){
        formData.append('UsOffer['+key+']', '');
      }else{formData.append('UsOffer['+key+']', value);}
    }
    
  }
  sendOk(){
    this.renderOffer.usOfferResult=undefined;
    this.router.navigate(['/users/usoffer-list']);

  }
  clear(){
    this.sendOk();
  }

}
