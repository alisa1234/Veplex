    import { Component, OnInit, ViewChildren, QueryList, ViewChild, AfterViewChecked, EventEmitter } from '@angular/core';
    import {Http, Response, Headers} from '@angular/http';
    import {HttpErrorResponse} from '@angular/common/http';
    import {Domains} from '../../domains';
    import { Router } from '@angular/router';
    import {RenderOffer} from '../render-offer';
    import {PopupChange} from '../../popup-change';
    import {Filters} from '../../filters';
    import {StatusService} from '../../status.service';
    import {InitChosen} from '../../initChosen';
    import {CheckboxTableService} from "../../checkbox-table/checkbox-table.service";
    import {GlobalLogin} from '../../global-login';
    
    declare var jQuery:any;
    
    
    
    @Component({
        selector: 'app-offer-list',
        templateUrl: './offer-list.component.html',
        styleUrls: ['./offer-list.component.scss'],
        host:{'class':'root'}
    })
    
    export class OfferListComponent{
        _http: Http;
        currentPage: number;
        result: Object;
        field_name: string;
        params: string;
        body:any;
        domain:string;
        url:string;
        csrf: string;
        urlGetList: string;
        
        categories: string;
        
        id:number;
        value:string;
        
        status_search:any;
        filter_model:string;
        
        list={rows:[],pagination:(<any>Object),sort:(<any>Object),filterParams:(<any>Object),logged:(<any>Object)};
        
        type_field:{[index:string]:boolean}={};
        categories_list={rows:[]};
        
        display_from:any;
        display_to:any;
        display_of:any;
        displaying:boolean=true;
        
        
        trigger:boolean;
            
        page:any;
        page_count:any;
        page_button_next:boolean=true;
        page_button_next_disabled:boolean=true;
        page_button_next_arrow:boolean=true;
        page_button_prev:boolean=true;
        page_button_first:boolean=true;
        current_page:boolean=true;
        
        not_found_result=false;
        
        public eventEmitter$: EventEmitter<any>;
        private name:string;
        private id_filter:string;
        
        @ViewChild('popup') popup:PopupChange;
    
        constructor(http: Http,domains:Domains,public router: Router,public renderOffer:RenderOffer,public popupChange:PopupChange,public filters:Filters,public statusService:StatusService,public initChosen:InitChosen, public checkboxTableService:CheckboxTableService, public globalLogin:GlobalLogin) {
            this._http = http;
            this.domain=domains.domain;
            this.csrf = domains.csrf;
            this.urlGetList=domains.urlGetAllOffer;
            this.categories=domains.categories;
            this.popupChange=popupChange;
            this.filters=filters;
            this.statusService=statusService;
            
            localStorage.removeItem("offer_id");
   
              
            this.renderOffer=renderOffer;
            this.initChosen=initChosen;
            this.type_field['status']=false;
            this.type_field['enabled']=false;
            this.type_field['access']=false;
            this.type_field['input']=false;
            this.type_field['category_id']=false;
            
            this.eventEmitter$ = new EventEmitter();
            
            let result:any;
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
                            }
                            else {
                                this.checkboxTableService.Create(this.list);
                                this.eventEmitter$.emit(this.list.rows);

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
                                    if (typeof this.list.filterParams.id != 'undefined') {
                                        this.id_filter = this.list.filterParams.id.params;

                                    }
                                    if (typeof this.list.filterParams.name != 'undefined') {
                                        this.name = this.list.filterParams.name.params;

                                    }
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
                            let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                            localStorage.setItem('current_url',this.router.url);
                            localStorage.setItem('current_breadcrumb',current_breadcrumb);
                            this.globalLogin.serverTime=false;
                            this.globalLogin.role=null;
                        }
                    
                       
            }
                );
            
            this._http.get(this.domain + this.categories)
                .map((res: Response) => {
                  return res.json();
                })
                .subscribe(
                    res=>{this.categories_list=res;
                       
                    });
        }

    
        chooseField(event,id,user_id,proffer_id,value,value_id,field,type,data) {
            this.popupChange.choosenField(event, id, user_id, proffer_id, value, this.field_name, field, type, this.type_field, this.categories_list, this.list, this.popup, value_id, data)
        }
            
        changeField(value){
            this.popupChange.changedField(value,this.list,this.body.csrf,this.urlGetList);
        }
        
        sort(value:string){
            this.filters.sorts(value,this.urlGetList)
                .subscribe(
                    res=>{
                        this.list=res;
                },
                    (err) => {
                        let error=err.json();
                        if(error.logged==false){
                            this.router.navigate(['/']);
                            let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                            localStorage.setItem('current_url',this.router.url);
                            localStorage.setItem('current_breadcrumb',current_breadcrumb);
                            this.globalLogin.serverTime=false;
                            this.globalLogin.role=null;
                        }


                    });
        }
        
        enter_search(value,object){
            this.filters.searches(value,this.urlGetList).subscribe(
                res=>{
                    this.list=res;
                    if(typeof this.list.filterParams != 'undefined'){
                        jQuery('button[value="'+value+'"]').addClass('actives');
                        object.hidden_delete=false;
                    }else{
                        jQuery('button[value="'+value+'"]').removeClass('actives')
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
                        localStorage.setItem('current_url',this.router.url);
                        localStorage.setItem('current_breadcrumb',current_breadcrumb);
                        this.globalLogin.serverTime=false;
                        this.globalLogin.role=null;
                    }


                });
          return false;
        }
    
        clear(value:string,object){
            this.filters.clears(value,this.urlGetList).subscribe(
                res=>{this.list=res;
                    this.checkboxTableService.Create(res);
                    object.hidden_delete=true;
                    object.hidden=true;
                    
                    jQuery('button[value="'+value+'"]').removeClass('actives')
                },
                (err) => {
                    let error=err.json();
                    if(error.logged==false){
                        this.router.navigate(['/']);
                        let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                        localStorage.setItem('current_url',this.router.url);
                        localStorage.setItem('current_breadcrumb',current_breadcrumb);
                        this.globalLogin.serverTime=false;
                        this.globalLogin.role=null;
                    }


                });
        }
    
        next(){
            this.filters.nexts(this.urlGetList,this).subscribe(
                res=>{this.list=res;
                    
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
                        localStorage.setItem('current_url',this.router.url);
                        localStorage.setItem('current_breadcrumb',current_breadcrumb);
                        this.globalLogin.serverTime=false;
                        this.globalLogin.role=null;
                    }


                });
                     
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
                res=>{this.list=res;
                    this.display_from=this.list.pagination.pageSize*(this.list.pagination.page + 1)-(this.list.pagination.pageSize-1);
                    this.display_to=this.list.pagination.pageSize*(this.list.pagination.page + 1);
                    this.display_of=this.list.pagination.totalCount;
                },
                (err) => {
                    let error=err.json();
                    if(error.logged==false){
                        this.router.navigate(['/']);
                        let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                        localStorage.setItem('current_url',this.router.url);
                        localStorage.setItem('current_breadcrumb',current_breadcrumb);
                        this.globalLogin.serverTime=false;
                        this.globalLogin.role=null;
                    }


                });
            
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
                    this.display_from=this.list.pagination.pageSize*(this.list.pagination.page + 1)-(this.list.pagination.pageSize-1);
                    this.display_to=this.list.pagination.pageSize*(this.list.pagination.page + 1);
                    this.display_of=this.list.pagination.totalCount;
                },
                (err) => {
                    let error=err.json();
                    if(error.logged==false){
                        this.router.navigate(['/']);
                        let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                        localStorage.setItem('current_url',this.router.url);
                        localStorage.setItem('current_breadcrumb',current_breadcrumb);
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
        
        getPublishers(id:number,name:string){
            localStorage.setItem("offer_id", id.toString());
            localStorage.setItem("offer_name", name);
            this.router.navigate(['offer/offer-list/publisher-list',id]);
        }
            
        update(value:string,id:number,name){
            this.id=id;
            this.value=value;
            localStorage.setItem("offer_id", id.toString());
            localStorage.setItem("offer_name", name);
            
            this.renderOffer.renderUpdate(id);
            this.router.navigate(['offer/offer-list/update/',id]);
        }
    }
