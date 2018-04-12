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
    }

    ngOnInit(){
    }
    ngAfterViewInit(){
    }
check(){
    let chbox = <HTMLInputElement>document.getElementById('remove_refferal');
    if(chbox.checked==true){
        
        this.remove_refferal=1;
    }else{
        this.remove_refferal=0;
    }
}
  
}
export interface Dictionary {
    [ index: string ]: string
}