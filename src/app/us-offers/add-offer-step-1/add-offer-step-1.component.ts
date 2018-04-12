import { Component, OnInit , EventEmitter} from '@angular/core';
import {GlobalUsOffer} from '../global-usoffer'
import { Router } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../domains';
import {CountriesService} from '../../countries.service';
import {PopupChange} from '../../popup-change';
import {Filters} from '../../filters';
import {RenderOffer} from '../../add-offer/render-offer';
import {PopupInformationService} from '../popup-information/popup-information.service';
import {PopupScreensService} from '../../popup-screens/popup-screens.service';
import {GlobalLogin} from '../../global-login';
import {StatusService} from '../../status.service';

@Component({
  selector: 'app-add-offer-step-1',
  templateUrl: './add-offer-step-1.component.html',
  styleUrls: ['./add-offer-step-1.component.scss'],
    host:{'class':'root'}
})
export class AddOfferStep1Component extends GlobalUsOffer implements OnInit {
  urlGetList:string;
    getUnLock:string;
  list={rows:[],pagination:(<any>Object),sort:(<any>Object),filterParams:(<any>Object)};
    id:number;

    isInfo:{[index:string]:boolean}={};
    isScreen:{[index:string]:boolean}={};
    filter_model:string;

    not_found_result=false;
  constructor(public router:Router,http: Http,domains: Domains, public _countrieService: CountriesService,public filters:Filters,public popupChange:PopupChange,public renderOffer:RenderOffer,public popupInformationService:PopupInformationService,public statusService:StatusService, public popupScreensService:PopupScreensService, public globalLogin:GlobalLogin) {
    super(router,http,domains,_countrieService,filters,popupChange,statusService,globalLogin)
    this.urlGetList=domains.urlGetUsOfferStep_1 ;
    this.getUnLock=domains.getUnLock ;
    let result:any;
      this.renderOffer=renderOffer;
      this.filter_model='offer';

    this._http.get(this.domain + this.csrf)
        .map((res: Response) => {
          this.body = res.json();
        })
        .subscribe(
            res=>result=res
        );

    this._http.get(this.domain + this.urlGetList)
        .map((res: Response) => {
          return res.json();

        })
        .subscribe(
            res=> {
                this.list = res;
                if (this.list.rows.length == 0) {
                    this.not_found_result = true;
                } else {
                    for (let i = 0; i < this.list.rows.length; i++) {
                        this.isInfo[this.list.rows[i].id] = false;
                        this.isScreen[this.list.rows[i].id] = false;
                        if (this.list.rows[i].information != null) {
                            this.isInfo[this.list.rows[i].id] = true;

                        }
                        console.log('i='+i,this.list.rows[i].pics_url);
                        if (this.list.rows[i].pics_url != null) {

                            this.isScreen[this.list.rows[i].id] = true;
                          
                        }

                    }

                    this.currentPage = this.list.pagination.page + 1;
                    this.page_count = this.list.pagination.pageCount;
                    if (this.currentPage < this.page_count) {
                        this.page_button_next = false;
                    }
                    if (this.currentPage == this.page_count) {
                        this.page_button_next_disabled = false;
                    }
                    if (this.currentPage <= this.page_count) {
                        this.displaying = false;
                    }
                    if (typeof this.list.filterParams != 'undefined') {
                        this.eventEmitter$.emit(this.list.filterParams);
                    }

                    if (this.list.pagination.totalCount > 100) {

                        this.display_from = this.list.pagination.pageSize * (this.list.pagination.page + 1) - (this.list.pagination.pageSize - 1);
                        this.display_to = this.list.pagination.pageSize * (this.list.pagination.page + 1);
                        this.display_of = this.list.pagination.totalCount;
                    } else {

                        this.display_from = this.list.pagination.pageSize * (this.list.pagination.page + 1) - (this.list.pagination.pageSize - 1);
                        this.display_to = this.list.pagination.totalCount;
                        this.display_of = this.list.pagination.totalCount;
                    }
                }
            },
            (err) => {
                let error=err.json();
                if(error.logged==false){
                    this.router.navigate(['/']);
                    localStorage.setItem('current_breadcrumb','[{"label":"Offers","params":{},"url":"/users/usoffer-list"}]');
                    localStorage.setItem('current_url','/users/usoffer-list');
                    this.globalLogin.serverTime=false;
                    this.globalLogin.role=null;
                }


            });
  }
    
  ngOnInit() {
  }
    sort(value:string){
        this.filters.sorts(value,this.urlGetList)
            .subscribe(
                res=>{this.list=res;},
                (err) => {
                    let error=err.json();
                    if(error.logged==false){
                        this.router.navigate(['/']);
                        let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                        localStorage.setItem('current_breadcrumb',current_breadcrumb);
                        localStorage.setItem('current_url',this.router.url);
                        this.globalLogin.serverTime=false;
                        this.globalLogin.role=null;
                    }


                }
            );
    }
    enter_search(value,object){
    
        this.filters.searches(value,this.urlGetList).subscribe(
            res=>{
                this.list=res;
                this.currentPage = this.list.pagination.page + 1;
                this.page_count = this.list.pagination.pageCount;
                if (this.currentPage < this.page_count) {
                    this.page_button_next = false;
                }
                if (this.currentPage == this.page_count) {
                    this.page_button_next_disabled = false;
                }
                if (this.currentPage <= this.page_count) {
                    this.displaying = false;
                }

                if (this.list.pagination.totalCount > 100) {

                    this.display_from = this.list.pagination.pageSize * (this.list.pagination.page + 1) - (this.list.pagination.pageSize - 1);
                    this.display_to = this.list.pagination.pageSize * (this.list.pagination.page + 1);
                    this.display_of = this.list.pagination.totalCount;
                } else {

                    this.display_from = this.list.pagination.pageSize * (this.list.pagination.page + 1) - (this.list.pagination.pageSize - 1);
                    this.display_to = this.list.pagination.totalCount;
                    this.display_of = this.list.pagination.totalCount;
                }

                if(typeof this.list.filterParams != 'undefined'){
                    object.hidden_delete=false;
                }else{
                    object.hidden_delete=true;
                }
                object.hidden=true;
              
                return true;
            },
            (err) => {
                let error=err.json();
                if(error.logged==false){
                    this.router.navigate(['/']);
                    let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb',current_breadcrumb);
                    localStorage.setItem('current_url',this.router.url);
                    this.globalLogin.serverTime=false;
                    this.globalLogin.role=null;
                }


            }
        );

        return false;
    }
    add(id){
        this.renderOffer.addOffer(id);
        localStorage.setItem("offer_id",id);
       
    }
    clear(value:string,object){
        this.filters.clears(value,this.urlGetList).subscribe(
            res=>{
                this.list=res;
                this.currentPage = this.list.pagination.page + 1;
                this.page_count = this.list.pagination.pageCount;
                if (this.currentPage < this.page_count) {
                    this.page_button_next = false;
                }
                if (this.currentPage == this.page_count) {
                    this.page_button_next_disabled = false;
                }
                if (this.currentPage <= this.page_count) {
                    this.displaying = false;
                }

                if (this.list.pagination.totalCount > 100) {

                    this.display_from = this.list.pagination.pageSize * (this.list.pagination.page + 1) - (this.list.pagination.pageSize - 1);
                    this.display_to = this.list.pagination.pageSize * (this.list.pagination.page + 1);
                    this.display_of = this.list.pagination.totalCount;
                } else {

                    this.display_from = this.list.pagination.pageSize * (this.list.pagination.page + 1) - (this.list.pagination.pageSize - 1);
                    this.display_to = this.list.pagination.totalCount;
                    this.display_of = this.list.pagination.totalCount;
                }

                object.hidden_delete=true;
                object.hidden=true;
                object.isActive=false;
            },
            (err) => {
                let error=err.json();
                if(error.logged==false){
                    this.router.navigate(['/']);
                    let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb',current_breadcrumb);
                    localStorage.setItem('current_url',this.router.url);
                    this.globalLogin.serverTime=false;
                    this.globalLogin.role=null;
                }


            }
        );
    }
    next(){
        this.filters.nexts(this.urlGetList,this).subscribe(
            res=>{
                this.list=res;
                this.display_from=this.list.pagination.pageSize*(this.list.pagination.page + 1)-(this.list.pagination.pageSize-1);
                this.display_to=this.list.pagination.pageSize*(this.list.pagination.page + 1);
                this.display_of=this.list.pagination.totalCount;
                if(this.currentPage==this.page_count){
                    this.display_to=this.list.pagination.totalCount;
                }
            },
            (err) => {
                let error=err.json();
                if(error.logged==false){
                    this.router.navigate(['/']);
                    let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb',current_breadcrumb);
                    localStorage.setItem('current_url',this.router.url);
                    this.globalLogin.serverTime=false;
                    this.globalLogin.role=null;
                }


            }
        );
        if(this.currentPage<this.page_count && this.currentPage!=this.page_count){
            this.page_button_next_arrow=false;
            this.page_button_prev=false;
            this.page_button_next=true;
            this.current_page=false;
        }else{
            this.page_button_next=true;
            this.page_button_first=false;
            this.page_button_next_arrow=true;
        }
        if(this.currentPage>2){
            this.page_button_first=false;
        }
    }
    prev(){
        this.filters.prevs(this.urlGetList,this).subscribe(
            res=>{
                this.list=res;
                console.log('prev',this.list);
                this.display_from=this.list.pagination.pageSize*(this.list.pagination.page + 1)-(this.list.pagination.pageSize-1);
                this.display_to=this.list.pagination.pageSize*(this.list.pagination.page + 1);
                this.display_of=this.list.pagination.totalCount;
            },
            (err) => {
                let error=err.json();
                if(error.logged==false){
                    this.router.navigate(['/']);
                    let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb',current_breadcrumb);
                    localStorage.setItem('current_url',this.router.url);
                    this.globalLogin.serverTime=false;
                    this.globalLogin.role=null;
                }


            }
        );
        if(this.currentPage<this.page_count && this.currentPage!=1){
            this.page_button_next_arrow=false;
            this.page_button_prev=false;
            this.current_page=false;

        }
        if(this.currentPage==1){
            this.page_button_prev=true;
            this.page_button_next=false;
            this.page_button_next_arrow=true;
            this.page_button_first=true;
            this.current_page=true;
        }
        if(this.currentPage==2){
            this.page_button_first=true;
        }
    }
    first(){
        this.currentPage=1;
        this.filters.firsts(this.urlGetList,this).subscribe(
            res=>{this.list=res;
                console.log('prev',this.list);
                this.display_from=this.list.pagination.pageSize*(this.list.pagination.page + 1)-(this.list.pagination.pageSize-1);
                this.display_to=this.list.pagination.pageSize*(this.list.pagination.page + 1);
                this.display_of=this.list.pagination.totalCount;
            },
            (err) => {
                let error=err.json();
                if(error.logged==false){
                    this.router.navigate(['/']);
                    let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb',current_breadcrumb);
                    localStorage.setItem('current_url',this.router.url);
                    this.globalLogin.serverTime=false;
                    this.globalLogin.role=null;
                }


            });
        if(this.currentPage==1){
            this.page_button_first=true;
            this.page_button_prev=true;
            this.page_button_next=false;
            this.current_page=true;
        }
    }
    getUnlock(offer_id){

        let senLock = "offer_id=" + offer_id + '&_csrf='+this.body.csrf;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this._http.post(this.domain + this.getUnLock, senLock,{headers: headers})
            .map((res: Response) => {
                this.body = res.json();
            })
            .subscribe(
                res =>{let result = res;

                  if(this.body.saved=='ok'){
                      for(let i=0;i<this.list.rows.length;i++){
                          if(this.list.rows[i].id==offer_id){
                              this.list.rows[i].access=0;
                              this.list.rows[i].user_access=2;
                              console.log('boroda',this.list.rows[i])
                          }

                      }
                  }
                },
                (err) => {
                    let error=err.json();
                    if(error.logged==false){
                        this.router.navigate(['/']);
                        let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                        localStorage.setItem('current_breadcrumb',current_breadcrumb);
                        localStorage.setItem('current_url',this.router.url);
                        this.globalLogin.serverTime=false;
                        this.globalLogin.role=null;
                    }


                }
            );
    }
}
