/**
 * Created by Алиска on 13.02.2017.
 */
import { Injectable, EventEmitter } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../domains';
import { Router} from '@angular/router';
import {CheckboxTableService} from "../checkbox-table/checkbox-table.service";
import {GlobalLogin} from '../global-login';

@Injectable()
export class RenderOffer  {
    _http: Http;
    domain:string;
    url:string;
    csrf: string;
    urlGetUpdate:string;
    urlGetUsOfferStep_1:string;
    urlGetOfferPublisherList:string;
    urlGetOfferPayoutsList:string;
    offerResult:any;
    usOfferResult:any;
    offer_publisherList={rows:[],pagination:(<any>Object),sort:Object,filterParams:[]};
    offer_payoutsList={rows:[],pagination:(<any>Object),sort:Object,filterParams:[]};
    offer_step2={rows:[],pagination:(<any>Object),sort:Object,filterParams:[]};
    id:string;
    name:string;
    offer_ok:boolean;
    flag:boolean=false;

    public eventEmitters: EventEmitter<any>;
    public eventEmitters2: EventEmitter<any>;
    public eventEmitters3: EventEmitter<any>;
    
    constructor(http: Http,public router: Router,domains:Domains, public checkboxTableService:CheckboxTableService, public globalLogin:GlobalLogin){
        this._http = http;
        this.domain=domains.domain;
        this.csrf = domains.csrf;
        this.urlGetUpdate=domains.urlGetUpdate;
        this.urlGetUsOfferStep_1=domains.urlGetUsOfferStep_1;
        this.urlGetOfferPublisherList=domains.urlGetOfferPublisherList;
        this.urlGetOfferPayoutsList=domains.urlGetOfferPayoutsList;
        this.urlGetUsOfferStep_1=domains.urlGetUsOfferStep_1;
        this.eventEmitters = new EventEmitter();
        this.eventEmitters2 = new EventEmitter();
        this.eventEmitters3 = new EventEmitter();
    }
    renderUpdate(id){

            this._http.get(this.domain + this.urlGetUpdate+id)
                .map((res: Response) => {
                    return res.json();
                })
                .subscribe(data=> {
                    this.offerResult=data;
                    
                    this.eventEmitters.emit(this.offerResult);
                    
                  
                },
                    (err) => {
                        let error=err.json();
                        if(error.logged==false){
                            this.router.navigate(['/']);
                            localStorage.setItem('current_url','offer/offer-list/update/'+id);
                            let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                            localStorage.setItem('current_breadcrumb',current_breadcrumb);
                            this.globalLogin.serverTime=false;
                            this.globalLogin.role=null;
                        }


                    });
        }
    renderUpdateUsoffer(id,offer_id){
       
        this._http.get(this.domain + this.urlGetUsOfferStep_1+id+'?step=2&offer_id='+offer_id)
            .map((res: Response) => {
                return res.json();
            })
            .subscribe(data=> {
                this.usOfferResult=data.data;
                
                this.router.navigate(['/users/usoffer-list/update-usoffer-step-2',id]);
            },
                (err) => {
                    let error=err.json();
                    if(error.logged==false){
                        this.router.navigate(['/']);
                        localStorage.setItem('current_url','/users/usoffer-list');
                        localStorage.setItem('current_breadcrumb','[{"label":"Offers","params":{},"url":"/users/usoffer-list"}]');
                        this.globalLogin.serverTime=false;
                        this.globalLogin.role=null;
                    }


                });
    }
    getPublishers(id:string,name:string){
    
        this.id=id;
        this.name=name;
          this._http.get(this.domain+this.urlGetOfferPublisherList+id)
              .map((res: Response) =>{return res.json()})
              .subscribe(
                  res=>{this.offer_publisherList=res;
                     
                      this.checkboxTableService.Create(this.offer_publisherList);
                      this.eventEmitters2.emit(this.offer_publisherList);
                      console.log('getpay2', this.name)
        },
                  (err) => {
                      let error=err.json();
                      if(error.logged==false){
                          this.router.navigate(['/']);
                          let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                          localStorage.setItem('current_url','offer/offer-list/publisher-list/'+id);
                          localStorage.setItem('current_breadcrumb',current_breadcrumb);
                          this.globalLogin.serverTime=false;
                          this.globalLogin.role=null;
                      }


                  })
    }

    getsPayouts(id:string,name:string){
        this.id=id;
        this.name=name;
        this._http.get(this.domain+this.urlGetOfferPayoutsList+id)
            .map((res: Response) =>{return res.json()})
            .subscribe(
                res=>{this.offer_payoutsList=res;
                    this.checkboxTableService.Create(this.offer_payoutsList);
                    this.eventEmitters3.emit(this.offer_payoutsList);
                },
                (err) => {
                    let error=err.json();
                    if(error.logged==false){
                        this.router.navigate(['/']);
                        let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                        localStorage.setItem('current_url','users/publisher-list/payouts/'+id);
                        localStorage.setItem('current_breadcrumb',current_breadcrumb);
                        this.globalLogin.serverTime=false;
                        this.globalLogin.role=null;
                    }


                })
    }
    addOffer(id){
        this.id=id;
        this.router.navigate(['users/usoffer-list/add-usoffer-step-2'])
    }
}