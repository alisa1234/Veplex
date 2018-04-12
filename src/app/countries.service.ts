import { Injectable,EventEmitter } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import {GlobalLogin} from './global-login';
import { Router } from '@angular/router';

declare var jQuery:any;


import {Domains} from './domains';
export class Dictionary{
  [ index: string ]: string;
}
@Injectable()

export class CountriesService {
  _http: Http;
  countries_api: string;
  result:any;
  countriesLoaded:boolean=false;
  countr: Dictionary;

  eventEmitter$:EventEmitter<any>;
  countries:any;
  constructor(http: Http,domain: Domains, public globalLogin:GlobalLogin,public router: Router){
    this._http = http;
    this.countries_api = domain.countries;
    this.eventEmitter$=new EventEmitter();
    this.getCountriesService();
  }
  
  getCountriesService(){
   this._http.get(this.countries_api)
        .map((res: Response) =>{return  res.json()})
       .subscribe((data)=>{
         this.countries=data.countries;
         this.eventEmitter$.emit( this.countries);
        
    },
           (err) => {
               let error=err.json();
               if(error.logged==false){

                   // window.location.replace(this.domain);
                   this.router.navigate(['/']);
                   let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                   localStorage.setItem('current_breadcrumb',current_breadcrumb);
                   localStorage.setItem('current_url',this.router.url);
                   this.globalLogin.serverTime=false;
                   this.globalLogin.role=null;
               }


           })
  }
}
