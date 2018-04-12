import { Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../domains';
import {Filters} from '../../filters';
import {RenderOffer} from '../render-offer';
import {PopupChange} from '../../popup-change';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import {CheckboxTableService} from "../../checkbox-table/checkbox-table.service";
import {GlobalLogin} from '../../global-login';

declare var jQuery:any;

export class Types{
  key:number;
  value:string;
}
const Enabled:Types[]=[
  {key:1,value:'Active'},
  {key:0,value:'Disabled'}
]

@Component({
  selector: 'app-payouts',
  templateUrl: './payouts.component.html',
  styleUrls: ['./payouts.component.scss'],
  host:{'class':'root'}
})
export class PayoutsComponent implements OnInit {
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
  list={rows:[],pagination:(<any>Object),sort:(<any>Object),filterParams:(<any>Object)};
  enabled=Enabled;
  id:number;
  offer_id:string;
  type_field:{[index:string]:boolean}={};
  chosen_value:any;
  user_name:string;

  page:any;
  page_count:any;
  page_button_next:boolean=true;
  page_button_next_disabled:boolean=true;
  page_button_next_arrow:boolean=true;
  page_button_prev:boolean=true;
  page_button_first:boolean=true;
  current_page:boolean=true;
  display_from:any;
  display_to:any;
  display_of:any;
  displaying:boolean=true;
  selected:number=0;
  
  publisher_id:any;

  not_found_result=false;

  item_name:string='';
  
  private name:any;
  public eventEmitter$: EventEmitter<any>;
  // public eventEmitter_offer$: EventEmitter<any>;
  @ViewChild('popup') popup:PopupChange;
  constructor(protected router:Router,public route: ActivatedRoute,http: Http,domains:Domains,public renderOffer:RenderOffer,public filters:Filters,public popupChange:PopupChange,public checkboxTableService:CheckboxTableService, public globalLogin:GlobalLogin) {
    
    this._http = http;
    this.domain=domains.domain;
    this.csrf = domains.csrf;
    this.urlGetList = domains.urlGetOfferPayoutsList;
    this.filters=filters;
    this.popupChange=popupChange;
    this.item_name='payouts';
    this.offer_id=localStorage.getItem("publisher_id");
    this.publisher_id=+localStorage.getItem("publisher_id");
    

    this.user_name=localStorage.getItem("publisher_name");
    this.renderOffer=renderOffer;
    if(this.route.snapshot.data['name']=='Update '+this.item_name){

      this.route.snapshot.data['breadcrumb']=this.user_name;
    }
    this.renderOffer.eventEmitters3.subscribe(item=>{
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

        if (typeof this.list.filterParams != 'undefined') {
          
          if(typeof this.list.filterParams.name != 'undefined'){
            this.name=this.list.filterParams.name.params;

          }


        }
      }

      this.savePage(item);
    });


    
    this.type_field['access']=false;
    this.type_field['input']=false;

    


    this._http.get(this.domain + this.csrf)
        .map((res: Response) => {
          this.body = res.json();
       
        })
        .subscribe(
            res=>this.result=res
        );
   
  }
  savePage(item){
    
    this.list=item;
    
    

  }
  ngOnInit() {
    // this.popupChange.ngOnInit();
    //
    // jQuery('.popup_link').css('display','none');
    this.route
        .params
        .subscribe(params => {
          console.log(params);
          this.offer_id = params['id'];
          this.renderOffer.getsPayouts(this.offer_id,this.user_name);

        });

   
  }
  ngAfterViewInit(){
    // this.filters.ngAfterViewInit();
    // this.popupChange.ngAfterViewInit();
  }
  chooseField(event,id,user_id,proffer_id,value,value_id,field,type,data) {
    this.popupChange.choosenField(event, id, user_id, proffer_id, value, this.field_name, field, type, this.type_field, null, this.list, this.popup, value_id, data)
  }
  changeField(value){
    this.popupChange.changedField(value,this.list,this.body.csrf,this.urlGetList);
  }

  sort(value:string){

    // console.log(this.offer_publisherList.rows[0].proffer_id)
    this.filters.sorts(value,this.urlGetList+this.offer_id)
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
  enter_search(value,object){

    this.filters.searches(value,this.urlGetList+this.offer_id).subscribe(
        res=>{
          this.list=res;
          this.checkboxTableService.Create(this.list);
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
            // this.search_field[value]=false;
            // jQuery('button[value="'+value+'"]').addClass('active');
            object.hidden_delete=false;
          }else{
            // this.search_field[value]=true;
            // jQuery('button[value="'+value+'"]').removeClass('active')
            object.hidden_delete=true;
          }
          //
          object.hidden=true;

          return true;

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
    //
    return false;

  }
  clear(value:string,object){
    console.log('clear')
    this.filters.clears(value,this.urlGetList+this.offer_id).subscribe(
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
          this.checkboxTableService.Create(this.list);
          object.hidden_delete=true;
          object.hidden=true;
          object.isActive=false;


          // jQuery('button[value="'+value+'"]').removeClass('active')
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
    this.filters.nexts(this.urlGetList+this.offer_id,this).subscribe(
        res=>{
          this.list=res;
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
    this.filters.prevs(this.urlGetList+this.offer_id,this).subscribe(
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
    this.filters.firsts(this.urlGetList+this.offer_id,this).subscribe(
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
