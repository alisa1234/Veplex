/**
 * Created by Алиска on 19.07.2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

declare var jQuery:any;


import {Domains} from './domains';
export class Dictionary{
    [ index: string ]: string;
}
@Injectable()

export class OfferTypeService {
    _http: Http;
    countries_api: string;
    result:any;
    countriesLoaded:boolean=false;
    countr: Dictionary;
    domain:string;
    urlGetOfferType:string;

    constructor(http: Http,domain: Domains){
        this._http = http;
        this.countries_api = domain.countries;
        this.domain = domain.domain;
        this.urlGetOfferType = domain.urlGetOfferType;
    }

    getTypeOfferService(){
        return this._http.get(this.domain + this.urlGetOfferType)
            .map((res: Response) => {
                return res.json();
            })
    }
}
