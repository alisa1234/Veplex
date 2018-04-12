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
    // this.role=localStorage.getItem('role');
    // this.name=localStorage.getItem('name');




    // this.typeUser['publisher']=false;
    // this.typeUser['admin']=false;
    // this.typeUser['advertiser']=false;
 
    console.log('head',this.role)
    //
    // this.formComponent.eventEmitter$.subscribe(item => this.onEvent(item))
    // if(typeof this.globalLogin.role == 'publisher'){
    //   this.name=this.globalLogin.name;
    //   this.role=this.globalLogin.role;
    //   this.publisher=this.globalLogin.login;
    // debugger;
    // }
    // if(typeof this.globalLogin.role !='undefined'){
    // for(let key in this.typeUser){
    //   this.typeUser[key]=false;
    //   this.typeUser[this.globalLogin.role]=true;
    //   this.name=this.globalLogin.name;
    //   this.role=this.globalLogin.role;
    //   this.result=this.typeUser[this.globalLogin.role];
    //   debugger;
    // }
    // }
    
    
    // console.log('header',this.name,this.role,this.formComponent.name,this.formComponent.role)
  }
  onEvent(item){
   
  }
  ngOnInit(){
   
  }
  logOut(){
    console.log('logout')
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
