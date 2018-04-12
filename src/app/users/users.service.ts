import { Injectable,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../domains';
import {GlobalLogin} from '../global-login';

@Injectable()
export class UsersService {
  _http: Http;
  domain:string;
  url:string;
  csrf: string;
  urlUsersAdvertisersAdd:string;
  item_name:string;
    module_name:string;
    urlUsers:string;
    urlUpdate:string;
    urlUsersAdvertizer:string;
  
  usersResult:any;
  public eventEmitters: EventEmitter<any>;

  constructor(http: Http,public router: Router,domains:Domains, public globalLogin:GlobalLogin) {
    this._http = http;
    // this.url = domains.url;
    this.domain = domains.domain;
    this.csrf = domains.csrf;
      this.urlUpdate=domains.urlUpdate;
      this.urlUsers=domains.urlUsers;
      this.eventEmitters = new EventEmitter();
      // this.urlUsersAdvertizer=domains.urlUsersAdvertizer;

    // this.urlUsersAdvertisersAdd=domains.urlUsersAdvertisersAdd;
  }
  
  usersEdit(id:string,item_name:string,module_name:string){
     
      // if(item_name=='advertiser'){
      //     item_name='usersa';
      //     this.urlUsers=this.urlUsersAdvertizer;
      // }
    console.log(id,item_name,module_name)
    // let headers=new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this._http.get(this.domain + this.urlUsers+module_name+this.urlUpdate + id)
        .map((res: Response)  => {return res.json();})
        .subscribe(res=>{
            this.item_name=item_name;
            this.module_name=module_name;
          this.usersResult=res.data;
          
          console.log('users result',this.usersResult,item_name);
        
          this.eventEmitters.emit(this.usersResult);
          
          
          
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
