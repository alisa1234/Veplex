/**
 * Created by Алиска on 27.02.2017.
 */
import { Component, OnInit,ViewChild,AfterViewInit,EventEmitter } from '@angular/core';
import {Location} from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../domains';
import {CountriesService} from '../countries.service';
import {UsersService} from './users.service';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';

declare var jQuery:any;

export class Stats{
    key: number;
    value: string;
}

const STATUS: Stats[]=[
    {key:0,value:'Disabled'},
    {key:1,value:'Active'},
    {key:2,value:'Pending'},
];

@Component({
    // providers:[FormstylerPipe]
    template:''
})
export class GlobalUsers implements OnInit,AfterViewInit{

    
    _http: Http;
    domain: string;
    url: string;
    csrf: string;
    body: any;
    urlUsers:string;
    urlUpdate:string;
    urlUsersAdvertizer:string;
    module_name:string;
    item_name:string;

    result: any;

    name:string='';
    email:string='';
    notifications:number=0;
    address:string='';
    city:string='';
    country:string='choose_country';
    zip:string='';
    // manager:number;

    countr: Dictionary;
    countr2: any=[];
    countr3: any=[];
    
    status:string='null';
    status_arr=[{'value':'null','name':'Status'},{'value':'0','name':'Disabled'},{'value':'1','name':'Active'},{'value':'2','name':'Pending'}];
    repeatPassword:null;
    password:null;
    countries=[];
    id:number;
    // country:string;

    someVar:Object;
    saving_system:boolean=false;
    flag: boolean = false;
    countriesLoaded:boolean = false;

    offer_ch:boolean;
    offer_ok:boolean;

    key: any;
    valid: any;

    _this:any;

    tittle:string;
    tittle_name:string;
    tittle_id:string;
    
    user_id:string;
    user_name:string;
    last:boolean=false;
    breadcrumbs=[];
    
    item_list:any;
    constructor(protected router:Router,http: Http,public route: ActivatedRoute,domains: Domains, public _countrieService: CountriesService, public usersService:UsersService,public location: Location) {
        
        // this._this=document.getElementById('country');

        this._http = http;
        // this.url = domains.url;
        this.domain = domains.domain;
        this.csrf = domains.csrf;
        this.urlUpdate=domains.urlUpdate;
        this.urlUsers=domains.urlUsers;
        // this.urlUsersAdvertisersAdd=domains.urlUsersAdvertisersAdd;
        this._countrieService = _countrieService;
        this.countriesLoaded=_countrieService.countriesLoaded;
        this.usersService=usersService;
        // this.urlUsersAdvertizer=domains.urlUsersAdvertizer;
        
        this.tittle="Add Account";

        this.offer_ch = false;
        this.offer_ok = true;
        
        // this.status=null;
        // this.manager=null;

        this.user_id=localStorage.getItem("user_id");
        this.user_name=localStorage.getItem("user_name");
       

        this._http.get(this.domain + this.csrf)
            .map((res: Response) => {
                this.body = res.json();
            })
            .subscribe(
                res =>this.result = res
            );
     

//
//          this._countrieService.eventEmitter$.subscribe((data) => {
// debugger;
             // this.countries = data.countries;
             // let dataAr=data.countries;
             // let dataAr1=Object.keys(data.countries);
             // // let DataAr2=[];
             //
             // for(let key in dataAr){
             //     this.countries.push({'value':key,'name':dataAr[key]})
             //     debugger;
             // }
if(typeof this._countrieService.countries!='undefined') {
 
    this.countr = this._countrieService.countries;
    this.countr3 = Object.keys(this.countr);
   
    for (let key in this.countr) {
        this.countr2.push(this.countr[key])

    }
   
    for (let i = 0; i < this.countr2.length; i++) {
        this.countries.push({'name': this.countr2[i], 'value': this.countr3[i]});
    }
    
    if (this.countries.length != 0) {

        this.usersService.eventEmitters.subscribe(item=> {

            this.item_list = item;
            this.name = item.name;
            this.address = item.address;
            this.city = item.city;
            this.email = item.email;
            this.password = item.password;
            this.repeatPassword = item.repeatPassword;
            this.zip = item.zip;
            this.status = item.status;
            this.last = true;
            this.notifications = item.notifications;
            this.id = item.id;
            this.country = item.country;
            this.item_name = this.usersService.item_name;
            this.module_name = this.usersService.module_name;
            this.tittle = 'Update ' + this.item_name;
            this.tittle_id = 'ID' + item.id;
            this.tittle_name = item.name;
            this.location.replaceState("/users/" + this.item_name + "-list/update/" + this.user_id);

            this.offer_ch = true;
            this.offer_ok = false;

        })
    }
   
}else{
  
    this._countrieService.eventEmitter$.subscribe(data=>{
     
        this.countr =data;
        this.countr3 = Object.keys(this.countr);
        for (let key in this.countr) {
            this.countr2.push(this.countr[key])
        }
        
        this.countries.push({'value': 'choose_country', 'name': 'Choose country'});
        for (let i = 0; i < this.countr2.length; i++) {
            this.countries.push({'name': this.countr2[i], 'value': this.countr3[i]});
        }

        if (this.countries.length != 0) {

            this.usersService.eventEmitters.subscribe(item=> {

                this.item_list = item;
                this.name = item.name;
                this.address = item.address;
                this.city = item.city;
                this.email = item.email;
                this.password = item.password;
                this.repeatPassword = item.repeatPassword;
                this.zip = item.zip;
                this.status = item.status;
                this.last = true;
                this.notifications = item.notifications;
                this.id = item.id;
                this.country = item.country;
                this.item_name = this.usersService.item_name;
                this.module_name = this.usersService.module_name;
                this.tittle = 'Update ' + this.item_name;
                this.tittle_id = 'ID' + item.id;
                this.tittle_name = item.name;
                this.location.replaceState("/users/" + this.item_name + "-list/update/" + this.user_id);

                this.offer_ch = true;
                this.offer_ok = false;

            })
        }
    })
    
}
    }

    ngOnInit() {
     

        if(this.user_id!=null){
        this.route
            .params
            .subscribe(params => {
                this.user_id = params['id'];
            
                this.usersService.usersEdit(this.user_id,this.item_name,this.module_name);
            });
        }
    }
    ngAfterViewInit(){
        if(jQuery('.form_offer_btn_ch').hasClass('inactive')){
            jQuery('.form_offer_btn_ch').prop('disabled',true);
        }
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
    check(){
        let chbox = <HTMLInputElement>document.getElementById('notifications');
        console.log('chboxs',chbox)
        if(chbox.checked == true){
            console.log('checked')
            this.notifications = 1;
        }else{
            this.notifications = 0;
        }
    }
        send(item_name,module_name,formData:FormData=new FormData()){
// console.log('global',item_name,module_name,this.country,this.manager)
            if(this.item_name==''&& this.module_name==''){
               this.item_name=item_name;
               this.module_name=module_name;
            }
            if(this.notifications == 1){
      this.notifications = 1;
    }else{this.notifications = 0;}
             // if(
             //     this.name=''||
             //         this.address=''||
             //         this.city=''||
             //         this.email=''||
             //         this.zip=''||
             //         this.status=''||
             //         this.password=''||
             //         this.repeatPassword=''
             // ){
             //
             // }

            let xhr: XMLHttpRequest = new XMLHttpRequest();
            let name=this.name;
            let address=this.address;
            let city=this.city;
            let email=this.email;
            let zip=this.zip;
            let status=this.status;
          
            // let carriers=this.carriers;
            // let platforms=this.platforms;
            let notifications=this.notifications;
            let password=this.password;
            let repeatPassword=this.repeatPassword;
            // let information=this.information;
            // let device_value=this.device_value;
            let country=this.country;
            let  module_names=this.module_name;
            let  item_names=this.item_name;
            // let  manager=this.manager;
            let csrf=this.body.csrf;
            // let usersService=this.usersService.item_name;
            // let router=this.router.navigate(['/users/'+item_names+'-list']);
            // let formData:FormData=new FormData();
            // console.log('fuck',usersService)
            formData.append("_csrf",csrf);
            
            this.FormDataCreate(
                formData,
                {
                    name:name,
                    address:address,
                    city:city,
                    email:email,
                    zip:zip,
                    status:status,
                    notifications:notifications,
                    password:password,
                    repeatPassword:repeatPassword,
                    country:country,
                    
                }
            );

            // headers.append('Content-type', 'multipart/form-data');

            xhr.open('POST',this.domain+ this.urlUsers+module_names+this.urlUpdate+(this.id?this.id:''),true);
            // xhr.setRequestHeader("Content-type", 'multipart/form-data');
            xhr.send(formData)
            
            let self=this;
            xhr.onreadystatechange=function () {
                console.log(formData)
               
                if(xhr.readyState==XMLHttpRequest.DONE){
                    let res=xhr.response;
                    let body=JSON.parse(res);
                 
                    console.log(body)
                    if(typeof body.logged!='undefined'&& body.logged==false){
                        this.router.navigate(['/']);
                        let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                        localStorage.setItem('current_breadcrumb',current_breadcrumb);
                        localStorage.setItem('current_url',this.router.url);
                        this.globalLogin.serverTime=false;
                        this.globalLogin.role=null;
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
                    if(body.saved=="ok"){
                      for(let key in self.item_list){
                          jQuery("#"+key).parent().append("<span class='ok' id='ok"+key+"'></span>");
                      }
                        // console.log('bls',usersService)
                        console.log('fuck',item_names)
                        self.offer_ok=false;
                        self.offer_ch=true;
                       
                    }else{console.log('hren')}

                    if(body.validation.length === 0){jQuery('.form_offer_btn_ch').addClass('inactive');jQuery('.form_offer_btn_ch').prop('disabled',true);}
                }
            }.bind(this);
            // this.addOffer.render_offer_results=null;

            // console.log('fjfjfjf',this.offer_ok,this.offer_ch)

            jQuery(".Error").remove();
            jQuery(".error").remove();

        }
    FormDataCreate(formData:FormData,values:any){
        for(let key in values){
            
           
            let value = values[key];
            if(typeof values[key] === 'object'){
                formData.append('UpdateForm['+key+']', '');
            }else{formData.append('UpdateForm['+key+']', value);}
            
            
           
        }
        

    }
    FormDataCreateManagers(formData:FormData,values:any,values1:any,values2:any){
        console.log('FormDataCreateManagers',values,values1,values2)
        for(let key in values){
            let value = values[key];
            formData.append('UpdateForm['+key+']', value);
        }
        for(let i=0;i<values1.length;i++){
            for(let y=0;y<values2.length;y++){
                if(i==y){
                    formData.append('UpdateForm['+values1[i]+']', values2[y]);
                }
               
            }
        }
            // for(let key in values1){
            //     for(let val in values2){
            //         let id=values1[key];
            //         let value=values2[val]
            //         formData.append('UpdateForm['+id+']', value);
            //     }
            // }
    }
    sendOk(){
        
        // this.renderOffer.offerResult=undefined;
        this.usersService.usersResult=undefined;
        console.log('offer results',this.usersService.usersResult);
        // this.router.navigate(['/users/publishers-list']);
        this.router.navigate(['/users/'+this.item_name+'-list']);

    }
    clear(){
        this.sendOk();
    }
}
export interface Dictionary {
    [ index: string ]: string
}