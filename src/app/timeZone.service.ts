/**
 * Created by Алиска on 03.01.2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

import {Domains} from './domains';

@Injectable()
export class TimeZoneService {
    _http: Http;
    timezone: string;
    
    constructor(http: Http, domain: Domains){
        this._http = http;
        this.timezone = domain.timeZones;
    }
    
    getTimezoneService() {
        return this._http.get(this.timezone)
            .map((res:Response) => res.json());
    }
}