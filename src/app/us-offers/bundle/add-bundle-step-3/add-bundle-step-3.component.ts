import { Component, OnInit , EventEmitter} from '@angular/core';
import {Location} from '@angular/common';
import {GlobalUsOffer} from '../../global-usoffer'
import { Router,ActivatedRoute} from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../../domains';
import {CountriesService} from '../../../countries.service';
import {PopupChange} from '../../../popup-change';
import {Filters} from '../../../filters';
import {RenderOffer} from '../../../add-offer/render-offer';
import {RenderUsOffer} from '../../render-usoffer';
import {StatusService} from '../../../status.service';
import {GlobalLogin} from '../../../global-login';

declare var jQuery:any;

@Component({
  selector: 'app-add-bundle-step-3',
  templateUrl: './add-bundle-step-3.component.html',
  styleUrls: ['./add-bundle-step-3.component.scss']
})
export class AddBundleStep3Component extends GlobalUsOffer implements OnInit {
  name:string='';
  uid:string='';
  subid:string='';
  subid2:string='';
  subid3:string='';
  subid4:string='';
  postback_url:string='';
  // remove_referral:number;
  offer_id:string;
  offer_ch:boolean;
  offer_ok:boolean;
  tracking_url:string;
  tracking:boolean=true;
  bundle_id:string='';
  bundle_name:string='';

  tittle:string='';
  tittle_id:string='';
  item_name:string='';
  item_list:any;
  constructor(public router:Router,public route: ActivatedRoute,http: Http,domains: Domains, public _countrieService: CountriesService,public filters:Filters,public popupChange:PopupChange,public renderOffer:RenderOffer,public statusService:StatusService, public renderUsOffer:RenderUsOffer,public location: Location, public globalLogin:GlobalLogin) {
    super(router,http,domains,_countrieService,filters,popupChange,statusService,globalLogin)
    this.offer_ch=true;
    this.urlGetList=domains.urlUpdateAllBundle;
    
    this.item_name='bundleoffer';
    this._http.get(this.domain + this.csrf)
        .map((res: Response) => {
          this.body = res.json();
        })
        .subscribe(
            res =>this.result = res
        );
    this.tittle='Add bundle';
    localStorage.setItem("users_value",  'Add bundle');
    this.bundle_id=localStorage.getItem("bundle_id");
    this.bundle_name=localStorage.getItem("bundle_name");
    if(this.route.snapshot.data['name']=='Update '+this.item_name){

      this.route.snapshot.data['breadcrumb']='Update '+this.bundle_name;
    }
    this.renderUsOffer.eventEmitter$2.subscribe(item=> {
      this.item_list=item.data;
      this.name=item.data.name;
      this.uid=item.data.uid;
      this.subid=item.data.subid;
      this.subid2=item.data.subid2;
      this.subid3=item.data.subid3;
      this.subid4=item.data.subid4;
      this.postback_url=item.data.postback_url;
      this.tracking=false;
      this.tracking_url=item.tracking_url;
      this.bundle_id=item.data.id;
      this.tittle='Update offer';
      this.tittle_id='bundle ID'+this.bundle_id;
      localStorage.setItem("users_value",  'Update bundle');
      this.location.replaceState("users/bundle-list/update-bundle-step-3/"+this.bundle_id);
    
    });
  }

  ngOnInit() {
    if(this.bundle_id!=null){
     
    this.route
        .params
        .subscribe(params => {
          this.bundle_id = params['id'];
          this.renderUsOffer.getStep3(this.bundle_id,true);

        });
    }
  }
  keypress(event:any){
    if(this.offer_ch==true)
    {
      this.offer_ch=false;
      this.offer_ok=true;
    }
  }
  addReturn(e){
    if(jQuery('#'+e.target.id).hasClass('form_offer_act_del')){
      if(e.target.id=='add_tid'){
        this.postback_url=this.postback_url.replace('{TID}','');
      }
      if(e.target.id=='add_sid'){
        this.postback_url=this.postback_url.replace('{SID}','');
        // }
      }
      if(e.target.id=='add_subid'){
        this.postback_url=this.postback_url.replace('{SUBID}','');
      }
      if(e.target.id=='add_subid2'){
        this.postback_url=this.postback_url.replace('{SUBID2}','');
      }
      if(e.target.id=='add_subid3'){
        this.postback_url=this.postback_url.replace('{SUBID3}','');
      }
      if(e.target.id=='add_subid4'){
        this.postback_url=this.postback_url.replace('{SUBID4}','');
      }
      jQuery('#'+e.target.id).removeClass('form_offer_act_del');
    }else{
      if(e.target.id=='add_tid'){
        this.postback_url+='{TID}';
      }
      if(e.target.id=='add_subid'){
        this.postback_url+='{SUBID}';
      }
      if(e.target.id=='add_subid2'){
        this.postback_url+='{SUBID2}';
      }
      if(e.target.id=='add_subid3'){
        this.postback_url+='{SUBID3}';
      }
      if(e.target.id=='add_subid4'){
        this.postback_url+='{SUBID4}';
      }
      if(e.target.id=='add_sid'){
        this.postback_url+='{SID}';
      }
      jQuery('#'+e.target.id).addClass('form_offer_act_del');
    }

  }

  send(formData:FormData=new FormData()){

    let xhr: XMLHttpRequest = new XMLHttpRequest();
    let name=this.name;
    let uid=this.uid;
    let subid=this.subid;
    let subid2=this.subid2;
    let subid3=this.subid3;
    let subid4=this.subid4;
    let postback_url=this.postback_url;
    let csrf=this.body.csrf;

    formData.append("_csrf",csrf);

    this.FormDataCreate(
        formData,
        {
          name:name,
          uid:uid,
          subid:subid,
          subid2:subid2,
          subid3:subid3,
          subid4:subid4,
          postback_url:postback_url,

        }
    );

    let headers = new Headers();
    headers.append('Content-type', 'multipart/form-data');

    xhr.open('POST',this.domain+this.urlGetList+'?step=3&id='+(this.bundle_id?this.bundle_id:''),true);
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
        if(body.status=="ok") {
          for(let key in self.item_list){
            jQuery("#"+key).parent().append("<span class='ok' id='ok"+key+"'></span>");
          }
          self.offer_ok = false;
          self.offer_ch = true;
          self.tracking_url=body.tracking_url;
          self.tracking=false;
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
        formData.append('Bundle['+key+']', '');
      }else{formData.append('Bundle['+key+']', value);}
    }

  }
    sendOk(){
      this.renderUsOffer.update=false;
        this.router.navigate(['/users/bundle-list']);

    }
    clear(){
        this.sendOk();
    }
}
