import { Component, OnInit,AfterViewInit, EventEmitter,ViewChild, AfterViewChecked,} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../domains';
import {Filters} from '../../filters';
import {RenderOffer} from '../render-offer';
import {PopupChange} from '../../popup-change';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {CheckboxTableService} from "../../checkbox-table/checkbox-table.service";
import {GlobalLogin} from '../../global-login';

declare var jQuery:any;

export class Types{
  key:number;
  value:string;
}
const Accsess:Types[]=[
  {key:1,value: 'Public'},
  {key:2,value: 'Private'}
];
const Enabled:Types[]=[
  {key:1,value:'Active'},
  {key:0,value:'Disabled'}
]

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.scss'],
  host:{'class':'root'}
})
export class PublisherListComponent implements OnInit {
  _http: Http;
  _sort: string;
  currentPage: number;
  result: any;
  field_name: string;
  params: string;
  body:any;
  // offerLisrResult:any;

  domain:string;
  url:string;
  csrf: string;
  urlGetList:string;
  list={rows:[],pagination:(<any>Object),sort:Object};
  access=Accsess;
  enabled=Enabled;

  selected:number=0;

id:number;
  offer_id:string;
  publisher_id:number;
  offer_name:string;
  access_id:any;
  enebled_id:any;
  access_value:any;
  enebled_value:any;

  type_field:{[index:string]:boolean}={};

  cpa_flag:boolean=false;
  access_flag:boolean=false;
  enabled_flag:boolean=false;

  page:any;
  page_count:any;
  page_button_next:boolean=true;
  page_button_next_disabled:boolean=true;
  page_button_next_arrow:boolean=true;
  page_button_prev:boolean=true;
  page_button_first:boolean=true;
  current_page:boolean=true;
  displaying:boolean=true;
  display_from:any;
  display_to:any;
  display_of:any;
  chosen_value:any;

  not_found_result=false;

  public eventEmitter$: EventEmitter<any>;
  public eventEmitter_offer$: EventEmitter<any>;
  @ViewChild('popup') popup:PopupChange;
  constructor(public router:Router,public route: ActivatedRoute,http: Http,domains:Domains,public renderOffer:RenderOffer,public filters:Filters,public popupChange:PopupChange, public checkboxTableService:CheckboxTableService, public globalLogin:GlobalLogin) {

    this._http = http;
    this.domain=domains.domain;
    this.csrf = domains.csrf;
    this.urlGetList = domains.urlGetOfferPublisherList;
    this.filters=filters;
    this.popupChange=popupChange;
   

    this.offer_id=localStorage.getItem("offer_id");

    this.offer_name=localStorage.getItem("offer_name");


    if(this.route.snapshot.data['name']=='offerpublishers') {

      this.route.snapshot.data['breadcrumb'] = 'Update ' + this.offer_name;
    }
    
    this.renderOffer=renderOffer;
    console.log('hhhhh',this.offer_name);

    this.renderOffer.eventEmitters2.subscribe(item=>{
      
      this.list=item;
      if(this.list.rows.length==0){
        this.not_found_result=true;
      }else {
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
      }

      this.savePage(item)
    });

    this.type_field['access']=false;
    this.type_field['input']=false;
    
    
    this._http.get(this.domain + this.csrf)
        .map((res: Response) => {
          this.body = res.json();
          console.log('csrf=',this.body.csrf)
        })
        .subscribe(
            res=>this.result=res
        );
    console.log('this is offer-list id',this.renderOffer.offer_publisherList)
  
  }
  savePage(item){
    this.list=item;


  }

  ngOnInit() {
   
    this.route
        .params
        .subscribe(params => {
          console.log(params);
          this.id = params['id'];
          this.offer_id = params['id'];
          this.publisher_id = params['id'];
      
          this.renderOffer.getPublishers(this.offer_id,this.offer_name);
          // this.code = params['code'];
          // this.userEmail = params['email'];
        });
  }

  chooseField(event,id,user_id,proffer_id,value,value_id,field,type,data) {
    this.popupChange.choosenField(event, id, user_id, proffer_id, value, this.field_name, field, type, this.type_field, null, this.list, this.popup, value_id, data)
  }
  changeField(value){
    this.popupChange.changedField(value,this.list,this.body.csrf,this.urlGetList);
  }

  sort(value:string){
    
    // console.log(this.list.rows[0].proffer_id)
    this.filters.sorts(value,this.urlGetList+this.id)
        .subscribe(
            res=>{this.list=res;
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
            },
            (err) => {
              let error=err.json();
              if(error.logged==false){

                // window.location.replace(this.domain);
                this.router.navigate(['/']);
                let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                // localStorage.clear();
                localStorage.setItem('current_url',this.router.url);
                localStorage.setItem('current_breadcrumb',current_breadcrumb);
                this.globalLogin.serverTime=false;
                this.globalLogin.role=null;
              }


            }
        );
  }
  next(){
    this.filters.nexts(this.urlGetList+this.id,this).subscribe(
        res=>{this.list=res;
          console.log('next',this.list);
       
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

            // window.location.replace(this.domain);
            this.router.navigate(['/']);
            let current_breadcrumb=localStorage.getItem('breadcramb_arr');
            // localStorage.clear();
            localStorage.setItem('current_url',this.router.url);
            localStorage.setItem('current_breadcrumb',current_breadcrumb);
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
    this.filters.prevs(this.urlGetList+this.id,this).subscribe(
        res=>{this.list=res;
          console.log('prev',this.list);
        
          this.display_from=this.list.pagination.pageSize*(this.list.pagination.page + 1)-(this.list.pagination.pageSize-1);
          this.display_to=this.list.pagination.pageSize*(this.list.pagination.page + 1);
          this.display_of=this.list.pagination.totalCount;
        },
        (err) => {
          let error=err.json();
          if(error.logged==false){

            // window.location.replace(this.domain);
            this.router.navigate(['/']);
            let current_breadcrumb=localStorage.getItem('breadcramb_arr');
            // localStorage.clear();
            localStorage.setItem('current_url',this.router.url);
            localStorage.setItem('current_breadcrumb',current_breadcrumb);
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
    this.filters.firsts(this.urlGetList+this.id,this).subscribe(
        res=>{this.list=res;
          console.log('prev',this.list);
      
          this.display_from=this.list.pagination.pageSize*(this.list.pagination.page + 1)-(this.list.pagination.pageSize-1);
          this.display_to=this.list.pagination.pageSize*(this.list.pagination.page + 1);
          this.display_of=this.list.pagination.totalCount;
        },
        (err) => {
          let error=err.json();
          if(error.logged==false){

            // window.location.replace(this.domain);
            this.router.navigate(['/']);
            let current_breadcrumb=localStorage.getItem('breadcramb_arr');
            // localStorage.clear();
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
}
