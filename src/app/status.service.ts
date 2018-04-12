/**
 * Created by Алиска on 03.03.2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Domains} from './domains';
import {InitChosen} from './initChosen';

declare var jQuery:any;

@Injectable()
export class StatusService{

    _http: Http;
    urlGetStatus:string;
    domain:string;
    status_search:any;
    url:string;
    value:any;
    constructor(http: Http,domain: Domains,public initChosen:InitChosen){
        this._http = http;
        this.urlGetStatus = domain.urlGetStatus;
        this.domain = domain.domain;
        this.initChosen=initChosen;

    }
    getStatusService(filter_model,value, object,url,list,e){
        this.url=url;
        this.value=value;

            return this._http.get(this.domain+this.urlGetStatus+'?filterModel='+filter_model+'&attr='+value)
                .map((res:Response)=>res.json())
                .subscribe((res)=>{
                   
                    object.status_search=res[value];
                    
                    this.initChosen.initChosen(value,list,url,object.status_search);
                    jQuery(e).addClass('active');
                    object.focus();
                    object.getType();

                })
    }

    Get(filter_model, value, object){
        
        return this._http.get(this.domain+this.urlGetStatus+'?filterModel='+filter_model+'&attr='+value)
            .map((res:Response)=>res.json())
            .subscribe((res)=>{
                
                object.СallbackRes(res, value);
            })
    }
    
}