/**
 * Created by Алиска on 01.11.2017.
 */
/**
 * Created by Алиска on 07.07.2017.
 */
import { Component, ElementRef, HostListener, Input,Output, ViewChild, Inject, SimpleChange, EventEmitter, Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../domains';

@Injectable()

export class PopupPaymentsCorrectionsService {
    _http: Http;
    domain: string;
    csrf: string;
    body: any;
    getAdvertiserListReports:string;
    getPublisherListReports:string;
    getPublisherListCorrections:string;

    corrections_revenue:number;
    corrections_leads:string;
    corrections_comment:string;
    uuid:string;
    name:string;
    hidden:boolean=true;
    list={rows:[],pagination:(<any>Object),sort:Object,filterParams:[], total_count:Object};
    constructor(http: Http,domains: Domains){
        this._http = http;
        this.getPublisherListCorrections = domains.getPublisherListCorrections;
        this.domain = domains.domain;
        this.csrf = domains.csrf;
        this.getAdvertiserListReports = domains.getAdvertiserListReports;
        this.getPublisherListReports = domains.getPublisherListReports;

    }

    showCorrection(uuid,corrections_comment,corrections_leads,corrections_revenue,name){
        this.hidden=false;
        this.corrections_revenue=corrections_revenue;
        this.corrections_leads=corrections_leads;
        this.corrections_comment=corrections_comment;
        this.uuid=uuid;
        this.name=name;
    }
}