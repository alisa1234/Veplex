/**
 * Created by Алиска on 07.07.2017.
 */
import { Component, ElementRef, HostListener, Input,Output, ViewChild, Inject, SimpleChange, EventEmitter, Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../domains';

@Injectable()

export class PopupReportsService {
    _http: Http;
    domain: string;
    csrf: string;
    body: any;
    getAdvertiserListReports:string;
    getPublisherListReports:string;
    
    id:number;
    name:string;
    information:string;
    hidden:boolean=true;
    list={rows:[],pagination:(<any>Object),sort:Object,filterParams:[], total_count:Object};
    constructor(http: Http,domains: Domains){
        this._http = http;
        this.domain = domains.domain;
        this.csrf = domains.csrf;
        this.getAdvertiserListReports = domains.getAdvertiserListReports;
        this.getPublisherListReports = domains.getPublisherListReports;
        
    }
    showReportsAdvertiser(uuid){
        this._http.get(this.domain + this.getAdvertiserListReports+uuid)
            .map((res: Response) => {
                return res.json();

            })
            .subscribe(data=>{
                this.list=data;
                debugger;
                this.hidden=false;
            });

    }
    showReportsPublisher(uuid){
        this._http.get(this.domain + this.getPublisherListReports+uuid)
            .map((res: Response) => {
                return res.json();

            })
            .subscribe(data=>{
                this.list=data;
                debugger;
                this.hidden=false;
            });
    }
}