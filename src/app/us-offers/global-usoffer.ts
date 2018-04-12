/**
 * Created by Алиска on 20.03.2017.
 */
import { Component, OnInit,ViewChild,AfterViewInit,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../domains';
import {CountriesService} from '../countries.service';
import {Filters} from '../filters';
import {PopupChange} from '../popup-change';
import {GlobalLogin} from '../global-login';
import {StatusService} from '../status.service';

declare var jQuery:any;

export class Types{

    key:number;
    value:string;
}
const TYPES:Types[]=[
    {key:1,value:'CPA'},
    {key:2,value:'CPC'},
    {key:3,value:'DCPA'},
    {key:4,value:'Fallback'}
];

@Component({
    template:''
    // providers:[FormstylerPipe]
})

export class GlobalUsOffer implements OnInit,AfterViewInit{

    _http: Http;
    domain: string;
    url: string;
    csrf: string;
    body: any;
    urlGetList:string;

    currentPage: number;

    result: any;
    offer_id:string;
    
    list={rows:[],pagination:(<any>Object),sort:(<any>Object),filterParams:(<any>Object)};
    list_step2:any;
    countries:Array<Dictionary>=[];

    display_from:any;
    display_to:any;
    display_of:any;
    displaying:boolean=true;

    type=TYPES;

    page:any;
    page_count:any;
    page_button_next:boolean=true;
    page_button_next_disabled:boolean=true;
    page_button_next_arrow:boolean=true;
    page_button_prev:boolean=true;
    page_button_first:boolean=true;
    current_page:boolean=true;

    filter_model:string;

    remove_refferal:number=0;

    public eventEmitter$: EventEmitter<any>;
    // public eventEmitter_publisher$: EventEmitter<any>;
    @ViewChild('popup') popup:PopupChange;

    constructor(public router:Router,http: Http,domains: Domains, public _countrieService: CountriesService,public filters:Filters,public popupChange:PopupChange,public statusService:StatusService, public globalLogin:GlobalLogin){

        this._http = http;
        this.domain = domains.domain;
        this.csrf = domains.csrf;
        this.urlGetList=domains.urlGetUsOfferStep_1;
        
        this.eventEmitter$=new EventEmitter();

        this.remove_refferal=0;
        this.filters=filters;
        this.popupChange=popupChange;

        // this._http.get(this.domain + this.csrf)
        //     .map((res: Response) => {
        //         this.body = res.json();
        //     })
        //     .subscribe(
        //         res =>this.result = res
        //     );
        //
        // this._http.get(this.domain+this.urlGetList)
        //     .map((res:Response)=>{
        //        return res.json();
        //     })
        //     .subscribe(data=>{
        //         this.list=data;
        //         console.log(this.list.rows,data)
        //     },
        //         (err) => {
        //             let error=err.json();
        //             if(error.logged==false){
        //
        //                 // window.location.replace(this.domain);
        //                 this.router.navigate(['/']);
        //                 let current_breadcrumb=localStorage.getItem('breadcramb_arr');
        //                 localStorage.setItem('current_breadcrumb',current_breadcrumb);
        //                 localStorage.setItem('current_url',this.router.url);
        //                 this.globalLogin.serverTime=false;
        //                 this.globalLogin.role=null;
        //             }
        //
        //
        //         })
    }

    ngOnInit(){
        // this._countrieService.getCountriesService().subscribe((data) => {
        //     this.countries = data.countries;
        //     let dataAr=[];
        //     for(let key in this.countries){
        //         dataAr.push({key: key, value: this.countries[key]});
        //     }
        //     this.countries=dataAr;
        //     console.log('countries');
        //     console.log(this.countries);
        //
        // });
    }
    ngAfterViewInit(){
        // this.filters.ngAfterViewInit();
    }
check(){
    let chbox = <HTMLInputElement>document.getElementById('remove_refferal');
    console.log('check',this.remove_refferal)
    if(chbox.checked==true){
        
        this.remove_refferal=1;
        console.log('checked',this.remove_refferal)
    }else{
        this.remove_refferal=0;
    }
}
  
}
export interface Dictionary {
    [ index: string ]: string
}