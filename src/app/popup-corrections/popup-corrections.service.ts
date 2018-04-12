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
        this.domain = domains.domain;
        this.csrf = domains.csrf;

    }

    showCorrections(id){
        this.calendarPopupService.hideCalendar();
        this.calendarPopupService.hideCalendar2();
        this.hidden=false;
    }
}