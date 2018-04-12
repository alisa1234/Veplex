/**
 * Created by Алиска on 26.05.2017.
 */
import { Injectable, EventEmitter } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../domains';
import { Router} from '@angular/router';
import {PopupFilterDialogService} from '../popup-filter-dialog/popup-filter-dialog.service';
import {GlobalLogin} from '../global-login';

@Injectable()
export class RenderUsOffer {
    _http: Http;
    domain: string;
    url: string;
    csrf: string;
    body: any;
    urlGetList:string;
    array_offers:any;
    list={rows:[],pagination:(<any>Object),sort:(<any>Object),filterParams:(<any>Object),data:(<any>Object),total_count:(<any>Object),status};
    list_step2={rows:[],pagination:(<any>Object),sort:(<any>Object),filterParams:(<any>Object),data:(<any>Object),total_count:(<any>Object),status};
    list_step1={rows:[],pagination:(<any>Object),sort:(<any>Object),filterParams:(<any>Object),data:(<any>Object),total_count:(<any>Object),status};
    list2={rows:[],pagination:(<any>Object),sort:(<any>Object),filterParams:(<any>Object),data:(<any>Object),total_count:(<any>Object),status};
    list3={rows:[],pagination:(<any>Object),sort:(<any>Object),filterParams:(<any>Object),data:(<any>Object),total_count:(<any>Object),status};
update:boolean=false;
update2:boolean=false;
trigger:boolean=false;
    bundle_id:string='';
    public eventEmitter$: EventEmitter<any>;
    public eventEmitter$2: EventEmitter<any>;
    public eventEmitter$3: EventEmitter<any>;
    
    constructor(http: Http,domains: Domains,public router: Router,public popupFilterDialogService:PopupFilterDialogService, public globalLogin:GlobalLogin){
        this._http = http;
        this.domain = domains.domain;
        this.csrf = domains.csrf;
        this.urlGetList=domains.urlUpdateAllBundle;
        this.eventEmitter$ = new EventEmitter();
        this.eventEmitter$2 = new EventEmitter();
        this.eventEmitter$3 = new EventEmitter();
    }

    getStep2(array_offers,update){
        this.update2=update;
        this.trigger=true;
     
this.array_offers=array_offers;
     
        this._http.get(this.domain+this.urlGetList+'?step=2&offers_id=['+array_offers+']'+'&id='+this.bundle_id)
            .map((res:Response)=>{
                return res.json();
            })
            .subscribe(data=>{
                this.list_step2=data;
                this.list3=data;
              
               
                // this.eventEmitter$.emit(this.list);
                // this.list_step2=data;
               
                if(this.list_step2.status=='ok'){
               
                    this.eventEmitter$.emit(this.list_step2);
                    
                    
                    
                }
            },
                (err) => {
                    let error=err.json();
                    if(error.logged==false){

                        // window.location.replace(this.domain);
                        this.router.navigate(['/']);
                        // let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                        localStorage.setItem('current_breadcrumb','[{"label":"Bundle offers","params":{},"url":"/users/bundle-list"},{"label":"Step 1","params":{},"url":"/users/bundle-list/add-bundle-step-1"}]');
                        localStorage.setItem('current_url','/users/bundle-list/add-bundle-step-1');
                     
                        this.globalLogin.serverTime=false;
                        this.globalLogin.role=null;
                    }


                })
       
        
    }
    
    getStep3(bundle_id,update){
      
        // this.array_offers=array_offers;
        this._http.get(this.domain+this.urlGetList+'?step=3&id='+bundle_id)
            .map((res:Response)=>{
                return res.json();
            })
            .subscribe(data=>{
                this.list=data;
               this.update=update;
               
                this.eventEmitter$2.emit(this.list);
                // this.list_step2=data;

                // if(this.list.status=='ok'){
                //
                //
                //     this.router.navigate(['/users/bundle-list/add-bundle-step-2']);
                //
                //
                // }
            },
                (err) => {
                    let error=err.json();
                    if(error.logged==false){

                        // window.location.replace(this.domain);
                        this.router.navigate(['/']);
                        let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                        localStorage.setItem('current_breadcrumb',current_breadcrumb);
                        localStorage.setItem('current_url','users/bundle-list/update-bundle-step-3/'+bundle_id);
                        this.globalLogin.serverTime=false;
                        this.globalLogin.role=null;
                    }


                })


    }
    renderUpdate(bundle_id,update){
        this.update=update;
      
        this._http.get(this.domain + this.urlGetList+'?step=1&id='+bundle_id)
            .map((res: Response) => {
                return res.json();
            })
            .subscribe(data=> {
              
                // this.list=data;
                this.list_step1=data;
                this.list2=Object.assign({},this.list_step1);
                this.bundle_id=bundle_id;
                this.eventEmitter$3.emit(this.list_step1);
                // this.eventEmitter$.emit(this.list);


            },
                (err) => {
                    let error = err.json();
                    if (error.logged == false) {

                        // window.location.replace(this.domain);
                        this.router.navigate(['/']);
                        let current_breadcrumb = localStorage.getItem('breadcramb_arr');
                        localStorage.setItem('current_breadcrumb', current_breadcrumb);
                        localStorage.setItem('current_url', 'users/usoffer-list/update-usoffer-step-2/'+bundle_id);
                        this.globalLogin.serverTime = false;
                        this.globalLogin.role = null;
                    }


                });
    }
}