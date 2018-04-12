import { Component, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {FormComponent} from '../form/form.component'
import { Router } from '@angular/router';
import {Domains} from '../domains';
import {GlobalLogin} from '../global-login';


declare var jQuery:any;

export class Types{
  key:string;
  value:string;
}
const TYPES:Types[]=[
  {key:'publisher',value:'publisher'},
  {key:'admin',value:'admin'},
  {key:'advertiser',value:'advertiser'}
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[Domains]
})
export class HeaderComponent implements OnInit {
  _http: Http;
  urlLogOut: string;
  domain: string;
  result: Object;
  name:string;
  role:string;
  admin:boolean=false;
  publisher:boolean=false;
  advertizer:boolean=false;
  role_test:boolean=false;
  

  type=TYPES;
  typeUser:{[index:string]:boolean}={};

  constructor(http: Http, domains: Domains, private router: Router,public globalLogin:GlobalLogin) {
    this.domain = domains.domain;
    this.urlLogOut = domains.urlLogOut;

    this._http = http;
  }
  onEvent(item){
   
  }
  ngOnInit(){
   
  }
  logOut(){
    this._http.get(this.domain + this.urlLogOut)
        .map(this.extractData)
        .subscribe(
            res=>this.result=res
        );
    this.router.navigate(['/']);
    localStorage.clear();
 
    this.globalLogin.serverTime=false;
    this.globalLogin.role=null;
  }
  
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

}
