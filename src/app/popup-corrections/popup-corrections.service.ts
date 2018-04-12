/**
 * Created by Алиска on 31.10.2017.
 */
/**
 * Created by Алиска on 07.07.2017.
 */
import { Component, ElementRef, HostListener, Input,Output, ViewChild, Inject, SimpleChange, EventEmitter, Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../domains';
import {CalendarPopupService} from '../calendar-popup/calendar-popup.service';

@Injectable()

export class PopupCorrectionsService {
    _http: Http;
    domain: string;
    csrf: string;
    body: any;
    getAdvertiserListReports:string;

    id:number;
    name:string;
    information:string;
    hidden:boolean=true;
    list={rows:[],pagination:(<any>Object),sort:Object,filterParams:[], total_count:Object};
    constructor(http: Http,domains: Domains, public calendarPopupService:CalendarPopupService){
        this._http = http;
        // this.url = domains.url;
        this.domain = domains.domain;
        this.csrf = domains.csrf;
        // this.getAdvertiserListReports = domains.getAdvertiserListReports;

    }

    showCorrections(id){
        this.calendarPopupService.hideCalendar();
        this.calendarPopupService.hideCalendar2();
        this.hidden=false;
        // this._http.get(this.domain + this.getAdvertiserListReports+uuid)
        //     .map((res: Response) => {
        //         return res.json();
        //
        //     })
        //     .subscribe(data=>{
        //         this.list=data;
        //         this.hidden=false;
        //     });
        // this.id=id;
        // this.name=name;
        // this.information=information;


    }
}