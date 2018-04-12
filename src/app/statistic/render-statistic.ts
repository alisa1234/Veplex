/**
 * Created by Алиска on 19.09.2017.
 */
import { Injectable, EventEmitter } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../domains';
import { Router} from '@angular/router';
import {GlobalLogin} from '../global-login';

@Injectable()

export class RenderStatistic {
    _http: Http;
    domain:string;
    url:string;
    csrf: string;
    urlGetOfferDetailStatistic: string;
    urlGetOfferConversions: string;
    urlGetBundleDetailStatistic: string;
    urlGetBundleConversions: string;

    offer_conversion={rows:[],pagination:(<any>Object),sort:Object,filterParams:[]};
    offer_detail={rows:[],pagination:(<any>Object),sort:Object,filterParams:[]};
    bundle_detail={rows:[],pagination:(<any>Object),sort:Object,filterParams:[]};
    bundle_conversions={rows:[],pagination:(<any>Object),sort:Object,filterParams:[]};
    public eventEmitters: EventEmitter<any>;
    public eventEmitters2: EventEmitter<any>;
    public eventEmitters3: EventEmitter<any>;
    public eventEmitters4: EventEmitter<any>;
    constructor(http: Http,public router: Router,domains:Domains, public globalLogin:GlobalLogin) {
        this._http = http;
        this.domain=domains.domain;
        this.csrf = domains.csrf;
        this.urlGetOfferDetailStatistic = domains.urlGetOfferDetailStatistic;
        this.urlGetOfferConversions = domains.urlGetOfferConversions;
        this.urlGetBundleDetailStatistic = domains.urlGetBundleDetailStatistic;
        this.urlGetBundleConversions = domains.urlGetBundleConversions;

        this.eventEmitters = new EventEmitter();
        this.eventEmitters2 = new EventEmitter();
        this.eventEmitters3 = new EventEmitter();
        this.eventEmitters4 = new EventEmitter();
    }

    getOfferConversions(id){
        this._http.get(this.domain + this.urlGetOfferConversions+'?usoffer_id='+id)
            .map((res: Response) => {
                return res.json();
            }).subscribe(data=>{
            this.offer_conversion=data;
            this.eventEmitters.emit(this.offer_conversion);
            
        },
            (err) => {
                let error=err.json();
                if(error.logged==false){
                    this.router.navigate(['/']);
                    let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb',current_breadcrumb);
                  
                    localStorage.setItem('current_url','statistic/offers-list/conversions/'+id);
                    this.globalLogin.serverTime=false;
                    this.globalLogin.role=null;
                }


            })

    }
    getOfferDetail(id){

        this._http.get(this.domain + this.urlGetOfferDetailStatistic+'?usoffer_id='+id)
            .map((res: Response) => {
                return res.json();
            })
            .subscribe(data=> {
                this.offer_detail=data;
                
                this.eventEmitters2.emit( this.offer_detail);
                

            },
                (err) => {
                    let error=err.json();
                    if(error.logged==false){
                        this.router.navigate(['/']);
                        let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                        localStorage.setItem('current_breadcrumb',current_breadcrumb);
                        localStorage.setItem('current_url','statistic/offers-list/detail-statistic/'+id);
                        this.globalLogin.serverTime=false;
                        this.globalLogin.role=null;
                    }


                });
        
    }
    getBundleDetail(id){

        this._http.get(this.domain + this.urlGetBundleDetailStatistic+'?bundle_id='+id)
            .map((res: Response) => {
                return res.json();
            })
            .subscribe(data=> {
                this.bundle_detail=data;
                this.eventEmitters3.emit( this.bundle_detail);


            },
                (err) => {
                    let error=err.json();
                    if(error.logged==false){
                        this.router.navigate(['/']);
                        let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                        localStorage.setItem('current_breadcrumb',current_breadcrumb);
                        localStorage.setItem('current_url','statistic/bundles-list/detail-statistic/'+id);
                        this.globalLogin.serverTime=false;
                        this.globalLogin.role=null;
                    }


                });

    }
    getBundleConversions(id){
       
        this._http.get(this.domain + this.urlGetBundleConversions+'?bundle_id='+id)
            .map((res: Response) => {
                return res.json();
            })
            .subscribe(data=> {
                    this.bundle_conversions=data;
                    this.eventEmitters4.emit( this.bundle_conversions);


                },
                (err) => {
                    let error=err.json();
                    if(error.logged==false){
                        this.router.navigate(['/']);
                        let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                        localStorage.setItem('current_breadcrumb',current_breadcrumb);
                        localStorage.setItem('current_url','statistic/bundles-list/conversions/'+id);
                        this.globalLogin.serverTime=false;
                        this.globalLogin.role=null;
                    }


                });

    }
}