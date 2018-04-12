/**
 * Created by Алиска on 28.06.2017.
 */
import { Component, ElementRef, HostListener, Input,Output, ViewChild, Inject, SimpleChange, EventEmitter, Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../domains';


@Injectable()

export class PopupInvoiceService {
    _http: Http;
    domain: string;
    csrf: string;
    body: any;
    getAdvertiserInvoice:string;

    hidden:boolean=true;
    constructor(http: Http,domains: Domains){
        this._http = http;
        // this.url = domains.url;
        this.domain = domains.domain;
        this.csrf = domains.csrf;
        this.getAdvertiserInvoice = domains.getAdvertiserInvoice;

    }
    showInvoice(uuid){
        this._http.get(this.domain + this.getAdvertiserInvoice+uuid)
            .map((res: Response) => {
                return res.json();

            })
            .subscribe(data=>{
                // this.list=data;
                // debugger;
                this.hidden=false;
            });
        // this.id=id;
        // this.name=name;
        // this.information=information;


    }
}