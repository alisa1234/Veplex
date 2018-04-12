/**
 * Created by Алиска on 23.03.2017.
 */
import { Injectable,OnInit, OnChanges,SimpleChange } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from './domains';
import { Router } from '@angular/router';
import {GlobalLogin} from './global-login';

declare var jQuery:any;



export class Types{
    key:number;
    value:string;
}
const Status:Types[]=[
    {key:1,value:'Active'},
    {key:0,value:'Disabled'},
    {key:2,value:'Pending'}
];
const Access:Types[]=[
    {key:1,value: 'Public'},
    {key:0,value: 'Private'},
    {key:2,value: 'null'}
];
const Popup:Types[]=[
    {key:1,value:'status'},
    {key:2,value:'enabled'},
    {key:3,value:'access'}
];
const UserAccess:Types[]=[
    {key:1,value: 'Enabled'},
    {key:0,value: 'Disabled'},
    {key:2,value: 'Pending'}
];
const Type:Types[]=[
    {key:1,value:'CPA'},
    {key:2,value:'CPC'},
    {key:3,value:'DCPA'},
    {key:4,value:'Fallback'}
];
const Device:Types[]=[
    {key:0,value:'All'},
    {key:1,value:'Mobile'},
    {key:2,value:'Desktop'}
];

const Payment_status:Types[]=[
    {key:1,value:'Pending'},
    {key:2,value:'Paid'}
];
const Payments_status:Types[]=[
    {key:0,value:'Pending Invoicing '},
    {key:1,value:'Invoice sent'},
    {key:2,value:'Invoice sent()'},
    {key:3,value:'N/A'}
];
@Injectable()

export class PopupChange implements OnInit{

    _http: Http;
    domain: string;
    url: string;
    csrf: string;
    body: any;
    urlUsers:string;
    urlUpdate:string;
    urlGetOfferPublisherList:string;
    module_name:string;
    categories: string;
    
    status=Status;
    popup=Popup;
    
   id:any;
    offer_id:any;
    change_status:any;
    value:any;
    field:any;
    field_name:any;
    result:any;
    user_id:any;
    categories_list={rows:[]};

    public hidden: boolean = true;
    public top:any = 0;
    public left:any = 0;
    public value_id:any;
    public values:any = [];
    public type:boolean = true;
    public current_event:any;
    public data:any;
    
    

constructor(http: Http,domains: Domains,public router: Router, public globalLogin:GlobalLogin){
    this._http = http;
  
    this.domain = domains.domain;
    this.csrf = domains.csrf;
    this.urlUsers=domains.urlUsers;
    this.urlUpdate=domains.urlUpdate;
    this.urlGetOfferPublisherList=domains.urlGetOfferPublisherList;
    this.categories=domains.categories;

}
    ngOnInit(){

    }
 
    ngAfterViewInit(){

    }

    typeEncode(value,field){
        let type;

        switch(field) {
            case 'access': {
                type = Access[Access.map(function (access) { return access.key; }).indexOf(Number(value))].value;
                break;
            }
            case 'status': {
                type = Status[Status.map(function (status) { return status.key; }).indexOf(Number(value))].value;
                break;
            }
            case 'type': {
                type = Type[Type.map(function (type) { return type.key; }).indexOf(Number(value))].value;
                break;
            }
            case 'user_access': {
                type = UserAccess[UserAccess.map(function (type) { return type.key; }).indexOf(Number(value))].value;
                break;
            }
            case 'device': {
                type = Device[Device.map(function (type) { return type.key; }).indexOf(Number(value))].value;
                break;
            }
            case 'payments_status': {
                type = Payments_status[Payments_status.map(function (type) { return type.key; }).indexOf(Number(value))].value;
                break;
            }
            case 'payment_status': {
                type = Payment_status[Payment_status.map(function (type) { return type.key; }).indexOf(Number(value))].value;
                break;
            }
            default: {
                type = false;
            }
        }


        if(typeof type == 'undefined'){
            type = false;
        }

        return type;
    }

    choosenField(event,id,user_id,proffer_id,value,field_named,field,type,type_field,categories,list, popup, value_id, data){
        switch(field) {
            case 'category_id': {
                this.values = categories.rows;
                break;
            }
            case 'access': {
                this.values = [{'id':'0','title':'Private'},{'id':'1','title':'Public'}];
                break;
            }
            case 'user_access': {
                this.values = [{'id':'0','title':'Disabled'},{'id':'1','title':'Enabled'},{'id':'2','title':'Pending'}];
                field = 'access';
                break;
            }
            case 'status': {
                this.values = [{'id':'0','title':'Disabled'},{'id':'1','title':'Active'}];
                break;
            }
            case 'payment_status': {
                this.values = [{'id':'0','title':'Pending Invoicing '},{'id':'1','title':'Invoice sent'},{'id':'2','title':'Invoice sent()'},{'id':'3','title':'N/A'}];
                field = 'status';
                break;
            }
        }

        this.data = data;
        this.type = type == 'select';
        this.categories_list=categories;

        if(value_id == true || value_id == false){
            if(value_id == true){
                value_id = '1';
            }else{
                value_id = '0';
            }
        }

        this.value_id = value_id;
      
       
        console.log('click work',field_named,value,field,type);

        this.id=id;

        if(value == true || value == false){
            if(value == true){
                value = '1';
            }else{
                value = '0';
            }
        }

        this.value=value;
        this.field=field;
        this.field_name=field_named;
        this.offer_id=proffer_id;
        this.user_id=user_id;
        this.hidden = false;
        // top: jQuery(event.target).offset().top - window.scrollY - 60,
            //     left: jQuery(event.target).offset().left - window.scrollX + (jQuery(event.target).width() / 2),
        this.top =jQuery(event.target).offset().top - window.scrollY - 100;
        console.log('bla1',jQuery(event.target).offset().top,window.scrollY)
        // this.top = event.target.parentNode.offsetTop - window.scrollY - 10;
        this.left = jQuery(event.target).offset().left - window.scrollX + (jQuery(event.target).width() / 2);
        console.log('bla2',jQuery(event.target).offset().left,window.scrollX + (jQuery(event.target).width()));
        // this.left = event.target.offsetParent.offsetLeft + event.target.offsetParent.offsetWidth/2;
    }

    changedField(value,list,csrf,url){
        let changed='attr='+this.field+'&offer_id='+this.offer_id+'&user_id='+this.user_id+'&value='+value+'&_csrf='+csrf+'&id='+this.id;
        let headers=new Headers();
        let result:any;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');


        this._http.post(this.domain+url+'field',changed,{headers:headers})
            .map((res:Response)=>{
                let body = res.json();
                if(body.saved == 'ok'){
                    if(this.type){
                        this.data[this.field]=value;
                        if(this.field == 'category_id'){
                            this.data['category_title'] = this.values[this.values.map(function (cat) { return cat.id; }).indexOf(Number(value))].title;
                        }
                    }else{
                        this.data[this.field]='$'+Number(value.replace('$','')).toFixed(2);
                    }
                }
            })
            .subscribe(data=>{result=data},         
                (err) => {
                let error=err.json();
                if(error.logged==false){

                    // window.location.replace(this.domain);
                    this.router.navigate(['/']);
                    let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb',current_breadcrumb);
                    this.globalLogin.serverTime=false;
                    this.globalLogin.role=null;
                }


            })
    }
}