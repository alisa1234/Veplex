import { Component, OnInit, EventEmitter, ViewChild, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../domains';
import {Filters} from '../../filters';
import {StatusService} from '../../status.service';
import {RenderOffer} from '../../add-offer/render-offer';
import {PopupChange} from '../../popup-change';
import {CheckboxTableService} from "../../checkbox-table/checkbox-table.service";
import {CalendarService} from "../../calendar/calendar.service";
import {PopupInvoiceService} from "../../popup-invoice/popup-invoice.service";
import {PopupReportsService} from "../../popup-reports/popup-reports.service";
import {PopupPaymentsCorrectionsService} from "../../popup-payments-corrections/popup-payments-corrections.service";
import {GlobalLogin} from '../../global-login';

declare var jQuery:any;

@Component({
  selector: 'app-payments-publisher',
  templateUrl: './payments-publisher.component.html',
  styleUrls: ['./payments-publisher.component.scss'],
  host:{'class':'root'}
})
export class PaymentsPublisherComponent implements OnInit {
  _http: Http;
  domain: string;
  url: string;
  csrf: string;
  body: any;
  urlGetList:string;
  downloadCSV:string;
  resendCSV:string;
  currentPage: number;

  result: any;
  // list={rows:[],pagination:(<any>Object),sort:Object,filterParams:[]};
  list={rows:[],pagination:(<any>Object),sort:(<any>Object),filterParams:(<any>Object), total_count:(<any>Object),filterTime:(<any>Object)};

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
  
  total_revenue:string;
  total_amount:string;

  filter_model:string;

  not_found_result=false;

  start_day:string;
  end_day:string;
  today:any;
  dd:number;
  mm:number;
  yy:number;
  
  group:number;
  group2:number;

  public value:any = "choose_action";
  public values=[{'id':'choose_action','title':'Choose action'},{'id':'today','title':'Today'},{'id':'yesterday','title':'Yesterday'},{'id':'this_w','title':'This week'},{'id':'last_w','title':'Last week'},{'id':'this_m','title':'This month'},{'id':'last_m','title':'Last month'},{'id':'this_y','title':'This year'},{'id':'last_y','title':'Last year'},{'id':'custom','title':'Custom'}]

  public eventEmitter$: EventEmitter<any>;
  constructor(public router:Router,http: Http,domains: Domains,public filters:Filters,public statusService:StatusService,public renderOffer:RenderOffer,public popupChange:PopupChange, public checkboxTableService:CheckboxTableService, public calendarService:CalendarService, public popupReportsService:PopupReportsService, public popupInvoiceService:PopupInvoiceService, public globalLogin:GlobalLogin, public PopupPaymentsCorrectionsService:PopupPaymentsCorrectionsService) {
    this._http = http;
    this.downloadCSV = domains.downloadCSVPublisher;
    this.resendCSV = domains.resendCSVPublisher;
    this.domain = domains.domain;
    this.csrf = domains.csrf;
    this.urlGetList = domains.urlGetsPaymentsPublisherList;

    this.eventEmitter$ = new EventEmitter();
    this.calendarService.name_class='payments-publisher_calendar';
    this.calendarService.id='id_payments-publisher_calendar';
    this.calendarService.id2='id2_payments-publisher_calendar';
    this.calendarService.hideCalendar();

    this.filter_model='paymentspublishers';
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
              // this.list = data;
              // this.module_name=data.module_name;
              console.log('data23',data,this.list);
              if(this.list.rows.length==0){
                this.not_found_result=true;
              }else {
                this.checkboxTableService.Create(this.list);
                console.log(this.list);
                this.sortGroup(this.list);
                this.eventEmitter$.emit(this.list.rows);
                this.total_amount=this.list.total_count.amount;
                this.total_revenue=this.list.total_count.revenue;
                this.value=this.list.filterTime.type;
                if (this.value == 'custom') {

                  this.calendarService.showCalendar();
                  this.calendarService.start_day=this.list.filterTime.start;
                  this.calendarService.end_day=this.list.filterTime.end;
                }

                // this.total_revenue = this.list.total_count.revenue;
                // this.total_cost = this.list.total_count.cost;
                // this.total_profit = this.list.total_count.profit;
                // this.total_profit_margin = this.list.total_count.profit_margin;

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


                // console.log('dsafs', this.total_revenue)
                if (typeof this.list.filterParams != 'undefined') {
                  this.eventEmitter$.emit(this.list.filterParams);
                }
                // this.CreateCheckBox();
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
            });
  }

  ngOnInit() {
  }
  sortGroup(list){
    let index=0;
    for(let i=0;i<list.rows.length;i++){
      let a=list.rows[0].gr;
      // this.group=a;
      debugger;
      if(a==list.rows[i].gr){

        list.rows[i].gr=i+1;
        debugger;
      }else{
        a=list.rows[i].gr;
        list.rows[i].gr=index+1;
        index=list.rows[i].gr;
        debugger;
      }
    }
    this.list=list;
    debugger;
  }
  pushOnDate(value){
    if (value == 'custom') {
      this.today = new Date();
      this.dd = this.today.getDate();
      this.mm = this.today.getMonth() + 1;
      this.yy = this.today.getFullYear();

      if (this.dd < 10) {
        this.dd =+ '0' + this.dd;
      }
      if (this.mm < 10){
        this.mm =+ '0' + this.mm;
      }
      this.start_day=this.mm+'/'+this.dd+'/'+this.yy;
      this.end_day=this.mm+'/'+this.dd+'/'+this.yy;
      jQuery( "."+this.calendarService.name_class).datepicker( "setDate", this.start_day );

      this.calendarService.showCalendar();
    }else{
      this.calendarService.hideCalendar();

      this.filters.filterPeriods(value,this.urlGetList).subscribe(res=>{
        this.list=res;
        this.sortGroup(this.list);
        // this.total_revenue = this.list.total_count.revenue;
        // this.total_cost = this.list.total_count.cost;
        // this.total_profit = this.list.total_count.profit;
        // this.total_profit_margin = this.list.total_count.profit_margin;

        console.log('filter')
      })
    }
  }
  sendDate(start_day,end_day){

    this.filters.sendDate(this.urlGetList,start_day,end_day).subscribe(
        res=> {
          this.list = res;
          this.sortGroup(this.list);
        })
  }

  sort(value:string){
    this.filters.sorts(value,this.urlGetList)
        .subscribe(
            res=>{
              this.list=res;
              this.sortGroup(this.list);
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
  }

  enter_search(value,object){
    this.filters.searches(value,this.urlGetList).subscribe(
        res=>{
          this.list=res;
          this.sortGroup(this.list);
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
    return false;
  }

  clear(value:string,object){
    this.filters.clears(value,this.urlGetList).subscribe(
        res=>{this.list=res;
          this.sortGroup(this.list);
          this.checkboxTableService.Create(res);
          object.hidden_delete=true;
          object.hidden=true;

          jQuery('button[value="'+value+'"]').removeClass('actives')
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
  }

  next(){
    this.filters.nexts(this.urlGetList,this).subscribe(
        res=>{this.list=res;
          this.sortGroup(this.list);
          this.display_from=this.list.pagination.pageSize*(this.list.pagination.page + 1)-(this.list.pagination.pageSize-1);
          this.display_to=this.list.pagination.pageSize*(this.list.pagination.page + 1);
          this.display_of=this.list.pagination.totalCount;
          if(this.currentPage==this.page_count){
            this.display_to=this.list.pagination.totalCount;
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
          this.sortGroup(this.list);
          this.display_from=this.list.pagination.pageSize*(this.list.pagination.page + 1)-(this.list.pagination.pageSize-1);
          this.display_to=this.list.pagination.pageSize*(this.list.pagination.page + 1);
          this.display_of=this.list.pagination.totalCount;
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
          this.sortGroup(this.list);
          this.display_from=this.list.pagination.pageSize*(this.list.pagination.page + 1)-(this.list.pagination.pageSize-1);
          this.display_to=this.list.pagination.pageSize*(this.list.pagination.page + 1);
          this.display_of=this.list.pagination.totalCount;
        });

    if(this.currentPage==1){
      this.page_button_first=true;
      this.page_button_prev=true;
      this.page_button_next=false;
      this.current_page=true;
    }
  }
}
