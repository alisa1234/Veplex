import { Component, OnInit,ViewChild, EventEmitter,AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../domains';
import {Filters} from '../../filters';
import {UsersService} from '../users.service';
import {StatusService} from '../../status.service';
import {PopupChange} from '../../popup-change';
import {CheckboxTableService} from "../../checkbox-table/checkbox-table.service";
import {GlobalLogin} from '../../global-login';

declare var jQuery:any;

export class Types{
  key:number;
  value:string;
}
const Status:Types[]=[
  {key:1,value:'Active'},
  {key:0,value:'Disabled'},
  {key:2,value:'Pending'}
]

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
  host:{'class':'root'}
})
export class AdminListComponent implements OnInit {
  _http: Http;
  domain: string;
  url: string;
  csrf: string;
  body: any;
  urlGetList:string;
  urlUsers:string;
  urlUpdate:string;
  module_name:string;
  
  currentPage: number;

  total_revenue:string;
  total_advertisers:string;
  total_accountmanagers:string;
  total_cost:string;
  total_profit:string;
  total_profit_margin:string;

  status_search:any;
  status_search_send:any;
  status=Status;

  staus_id:any;
  change_status:any;
  staus_value:any;

  field_name:any;

  chosen_value:any;

  result: any;
  list={rows:[],pagination:(<any>Object),sort:(<any>Object),filterParams:(<any>Object),filterTime:(<any>Object)};

  chosenReady:boolean=false;
  type_field:{[index:string]:boolean}={};

  page:any;
  page_count:any;

  display_from:any;
  display_to:any;
  display_of:any;
  displaying:boolean=true;

  page_button_next:boolean=true;
  page_button_next_disabled:boolean=true;
  page_button_next_arrow:boolean=true;
  page_button_prev:boolean=true;
  page_button_first:boolean=true;
  current_page:boolean=true;

  selected:number=0;
  filter_model:string;

    not_found_result=false;

  public value:any = "choose_action";
  public values=[{'id':'choose_action','title':'Choose action'},{'id':'today','title':'Today'},{'id':'yesterday','title':'Yesterday'},{'id':'this_w','title':'This week'},{'id':'last_w','title':'Last week'},{'id':'this_m','title':'This month'},{'id':'last_m','title':'Last month'},{'id':'this_y','title':'This year'},{'id':'last_y','title':'Last year'}]

  public eventEmitter$: EventEmitter<any>;
  @ViewChild('popup') popup:PopupChange;
  
  constructor(public router:Router,http: Http,domains: Domains,public filters:Filters, public usersService:UsersService,public statusService:StatusService,public popupChange:PopupChange, public checkboxTableService:CheckboxTableService, public globalLogin:GlobalLogin) {
   

    this._http = http;
    this.domain = domains.domain;
    this.csrf = domains.csrf;
    this.urlGetList=domains.urlUsersAdminsList;
    this.urlUsers=domains.urlUsers;
    this.urlUpdate=domains.urlUpdate;
    this.usersService=usersService;
    this.statusService=statusService;
    this.filters=filters;
    this.popupChange=popupChange;

    this.usersService.usersResult=undefined;

    this.type_field['status']=false;

    this.eventEmitter$ = new EventEmitter();
      localStorage.removeItem('user_id');
    
    this._http.get(this.domain + this.csrf)
        .map((res: Response) => {
          this.body = res.json();
        })
        .subscribe(
            res =>this.result = res
        );

    this._http.get(this.domain + this.urlGetList)
        .map((res: Response) => {
          return res.json();

        })
        .subscribe(
            data =>{
              this.list = data;
              this.module_name=data.module_name;
                if(this.list.rows.length==0){
                    this.not_found_result=true;
                }else {
                    this.checkboxTableService.Create(this.list);
                    this.eventEmitter$.emit(this.list.rows);

                    this.total_revenue = this.list.rows[0].total_revenue;
                    this.total_advertisers = this.list.rows[0].total_advertisers;
                    this.total_accountmanagers = this.list.rows[0].total_accountmanagers;
                    this.total_cost = this.list.rows[0].total_cost;
                    this.total_profit = this.list.rows[0].total_profit;
                    this.total_profit_margin = this.list.rows[0].total_profit_margin;

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
                    let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb',current_breadcrumb);
                    localStorage.setItem('current_url',this.router.url);
                    this.globalLogin.serverTime=false;
                    this.globalLogin.role=null;
                }


            });
    
  }

  ngOnInit() {
  }
  pushOnDate(value){
    this.filters.filterPeriods(value,this.urlGetList).subscribe(res=>{
      this.list=res;
        this.total_revenue = this.list.rows[0].total_revenue;
        this.total_advertisers = this.list.rows[0].total_advertisers;
        this.total_accountmanagers = this.list.rows[0].total_accountmanagers;
        this.total_cost = this.list.rows[0].total_cost;
        this.total_profit = this.list.rows[0].total_profit;
        this.total_profit_margin = this.list.rows[0].total_profit_margin;
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


        })
  }
  ngAfterViewInit(){
  }
  chooseField(event,id,user_id,proffer_id,value,value_id,field,type,data) {
    this.popupChange.choosenField(event, id, user_id, proffer_id, value, this.field_name, field, type, this.type_field, null, this.list, this.popup, value_id, data)
  }
  changeField(value){
    this.popupChange.changedField(value,this.list,this.body.csrf,this.urlGetList);
  }
  focus(){
    jQuery('.search-field input').focus();
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
  search_status(value:string){
    this.filters.searches_status(value,this.urlGetList,this.status_search_send).subscribe(
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
            jQuery('button[value="'+value+'"]').addClass('active');
            object.hidden_delete=false;
          }else{
            jQuery('button[value="'+value+'"]').removeClass('active')
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

          jQuery('button[value="'+value+'"]').removeClass('active')
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
  cleared(field){
    this.filters.cleards(field);
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
  filterPeriod(value:string){
    this.filters.filterPeriods(value,this.urlGetList).subscribe(
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
  update(id:string,item_name:string,name){
      localStorage.setItem("user_id", id.toString());
      localStorage.setItem("user_name", name);
    this.usersService.usersEdit(id,item_name,this.module_name);
      this.router.navigate(['/users/'+item_name+'-list/update',id]);
  }
  
  
}
