import { Component, OnInit, EventEmitter,AfterViewInit,ViewChild } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../../domains';
import { Router } from '@angular/router';
import {PopupChange} from '../../../popup-change';
import {Filters} from '../../../filters';
import {InitChosen} from '../../../initChosen';
import {CheckboxTableService} from "../../../checkbox-table/checkbox-table.service";
import {CalendarService} from "../../../calendar/calendar.service";
import {RenderOffer} from '../../../add-offer/render-offer';
import {RenderUsOffer} from '../../render-usoffer';
import {RenderStatistic} from '../../../statistic/render-statistic';
import {GlobalLogin} from '../../../global-login'

declare var jQuery:any;

@Component({
  selector: 'app-bundle-list',
  templateUrl: './bundle-list.component.html',
  styleUrls: ['./bundle-list.component.scss'],
  host:{'class':'root'}
})
export class BundleListComponent implements OnInit {
  _http:Http;
  currentPage:number;
  result:Object;
  field_name:string;
  params:string;
  body:any;

  domain:string;
  url:string;
  csrf:string;
  urlGetList:string;

    bundle_name:string;
    bundle_id:string;

  total_rpm:any;
  total_epv:any;
  total_cr:any;
  total_revenue:any;
  total_leads:any;
  total_uniques:any;
  total_raw:any;
  total_type:any;
  total_share:any;

  list = {rows: [], pagination: (<any>Object), sort: (<any>Object), filterParams:(<any>Object),total_count:(<any>Object),filterTime:(<any>Object)};
list_offer:{[index:string]:any}={};
    
  display_from:any;
  display_to:any;
  display_of:any;
  displaying:boolean = true;

  page:any;
  page_count:any;
  page_button_next:boolean = true;
  page_button_next_disabled:boolean = true;
  page_button_next_arrow:boolean = true;
  page_button_prev:boolean = true;
  page_button_first:boolean = true;
  current_page:boolean = true;
    
    offer_list_get:boolean = true;
    show_offer:{[index:string]:boolean}={};
    // hide_offer:boolean = false;
    trend_arr=[];
    not_found_result=false;

    filter_model:string;


    start_day:string;
    end_day:string;
    today:any;
    dd:number;
    mm:number;
    yy:number;
    
    isFilter:boolean=false;
    
   value:string = "choose_action";
  public values=[{'id':'choose_action','title':'Choose action'},{'id':'today','title':'Today'},{'id':'yesterday','title':'Yesterday'},{'id':'this_w','title':'This week'},{'id':'last_w','title':'Last week'},{'id':'this_m','title':'This month'},{'id':'last_m','title':'Last month'},{'id':'this_y','title':'This year'},{'id':'last_y','title':'Last year'},{'id':'custom','title':'Custom'}]

  public eventEmitter$: EventEmitter<any>;

  constructor(http:Http, domains:Domains, public router:Router, public popupChange:PopupChange, public filters:Filters, public initChosen:InitChosen, public checkboxTableService:CheckboxTableService,public renderOffer:RenderOffer, public calendarService:CalendarService, public renderUsOffer:RenderUsOffer,public renderStatistic:RenderStatistic,public globalLogin:GlobalLogin) {
    this._http = http;
    // this.url = domains.url;
    this.domain = domains.domain;
    this.csrf = domains.csrf;
    this.urlGetList = domains.urlGetAllBundle;
    // this.categories=domains.categories;
    this.popupChange = popupChange;
    this.filters = filters;
      this.renderUsOffer.update=false;
      this.renderUsOffer.bundle_id='';
      this.calendarService.name_class='bundle-list_calendar';
      this.calendarService.id='id_bundle-list_calendar';
      this.calendarService.id2='id2_bundle-list_calendar';
      this.calendarService.hideCalendar();
      localStorage.removeItem("offer_name");
      localStorage.removeItem('statistic_offer_id');
    let result:any;
      this.renderUsOffer.list2.rows=[];

    this.eventEmitter$ = new EventEmitter();

    this._http.get(this.domain + this.csrf)
        .map((res:Response) => {
          this.body = res.json();
        })
        .subscribe(
            res=>result = res
        );

    this._http.get(this.domain + this.urlGetList)
        .map((res:Response) => {
          return res.json();

        })
        .subscribe(
            res=> {
              this.list = res;
                

                console.log('this.list_offer5',this.list.rows.length);

                if(this.list.rows.length==0){
                    this.not_found_result=true;
                }else{
                    this.checkboxTableService.Create(this.list);
                    console.log(this.list);
                    this.eventEmitter$.emit(this.list.rows);

                    this.value=this.list.filterTime.type;
                    if (this.value == 'custom') {

                        this.calendarService.showCalendar();
                        this.calendarService.start_day=this.list.filterTime.start;
                        this.calendarService.end_day=this.list.filterTime.end;
                    }
                    
                    // this.total_type= this.list.rows[0].total_type;
                    this.total_share= this.list.total_count.share;
                    this.total_raw= this.list.total_count.raw;
                    this.total_uniques= this.list.total_count.uniques;
                    this.total_leads=this.list.total_count.leads;
                    this.total_revenue=this.list.total_count.revenue;
                    this.total_cr=this.list.total_count.cr;
                    this.total_epv=this.list.total_count.epv;
                    // this.total_rpm=this.list.rows[0].total_rpm;

                    
                    this.getResults(this.list);

                    if (typeof this.list.filterParams != 'undefined') {
                    
                        this.eventEmitter$.emit(this.list.filterParams);
                        if(typeof this.list.filterParams.bundle_name != 'undefined'){
                            this.bundle_name=this.list.filterParams.bundle_name.params;
                        
                        }
                        if(typeof this.list.filterParams.bundle_id != 'undefined'){
                            this.bundle_id=this.list.filterParams.bundle_id.params;
                        
                        }
                       
                       
                    }
                    // this.CreateCheckBox();
                    for(let i=0;i<this.list.rows.length;i++){
                        this.show_offer[this.list.rows[i].bundle_id]=true;


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
              // console.log('this.list_offer',this.list_offer)
              
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
    getListOffer(id){
      
        
        // this.show_offer[id]=true;
        // this.show_offer[id]=true;
        // this.hide_offer[id]=true;
        console.log('id bundle',id)
        if(this.show_offer[id]==true) {
            this.show_offer[id]=false;
        
            for (let i = 0; i < this.list.rows.length; i++) {
                // console.log('this.list_offer2',this.list.rows[i]);
                if (id == this.list.rows[i].bundle_id) {
                    let arr=[];
                  
                    for (let key in this.list.rows[i]) {
                        if (key == 'offers') {
                            // console.log('this.list_offer4',this.list.rows[i][key]);
                            this.list_offer[this.list.rows[i].bundle_id] = this.list.rows[i][key];
                            console.log('this.list_offer', this.list_offer)
                            this.offer_list_get = false;
                         

                        }


                    }
                  
                    for (let key of this.list_offer[this.list.rows[i].bundle_id]) {

                        arr.push(key);
                    }
                        // console.log('last',this.list_offer[key.length-1].offer_id)
                        // console.log('last',this.list_offer[this.list.rows[i].bundle_id][key])

                      
                        for(let i=0;i<arr.length;i++){
                        if(i!=0){
                         
                            jQuery("<tr class='hidden-row' id='bundle-"+id+"_offer-"+arr[i].offer_id+"'><td class='checkbox_field t9_1'></td> <td class='t9_2'></td> <td class='t9_3'>" + arr[i].offer_name + "</td> <td class='t9_4'><div class='page-table-trand_wr'><span class='page-table-trand_data'>" + arr[i].share + "</span><span id='tr_share_bundle-"+arr[i].bundle_id+"_offer-"+arr[i].offer_id+"'></span></div></td> <td class='t9_5'><div class='page-table-trand_wr'><span class='page-table-trand_data'>" + arr[i].raw + "</span> <span id='tr_raw_bundle-"+arr[i].bundle_id+"_offer-"+arr[i].offer_id+"' [class.page-table-trand_decrease]='"+arr[i].tr_raw+"' [class.page-table-trand]='"+!arr[i].tr_raw+"'></span></div></td> <td class='t9_6'><div class='page-table-trand_wr'><span class='page-table-trand_data'>" + arr[i].uniques + "</span> <span id='tr_uniques_bundle-"+arr[i].bundle_id+"_offer-"+arr[i].offer_id+"'></span></div></td> <td class='t9_7'><div class='page-table-trand_wr'><span class='page-table-trand_data'>" + arr[i].leads + "</span> <span id='tr_leads_bundle-"+arr[i].bundle_id+"_offer-"+arr[i].offer_id+"'></span></div></td> <td class='t9_8'><div class='page-table-trand_wr'><span class='page-table-trand_data'>" + arr[i].revenue + "</span> <span id='tr_revenue_bundle-"+arr[i].bundle_id+"_offer-"+arr[i].offer_id+"'></span></div></td> <td class='t9_9'><div class='page-table-trand_wr'><span class='page-table-trand_data'>" + arr[i].cr + "</span> <span id='tr_cr_bundle-"+arr[i].bundle_id+"_offer-"+arr[i].offer_id+"'></span></div></td> <td class='t9_10'><div class='page-table-trand_wr'><span class='page-table-trand_data'>" + arr[i].epv + "</span> <span id='tr_epv_bundle-"+arr[i].bundle_id+"_offer-"+arr[i].offer_id+"'></span></div></td><td class='t9_4'></td></tr>").insertAfter(jQuery('#bundle-'+id+"_offer-"+arr[i-1].offer_id));
                         
                        }else{
                          
                            jQuery("<tr class='hidden-row' id='bundle-"+id+"_offer-"+arr[0].offer_id+"'><td class='checkbox_field t9_1'></td> <td class='t9_2'></td> <td class='t9_3'>" + arr[0].offer_name + "</td> <td class='t9_4'><div class='page-table-trand_wr'><span class='page-table-trand_data'>" + arr[0].share + "</span><span id='tr_share_bundle-"+arr[i].bundle_id+"_offer-"+arr[i].offer_id+"'></span></div></td> <td class='t9_5'><div class='page-table-trand_wr'><span class='page-table-trand_data'>" + arr[0].raw + "</span> <span id='tr_raw_bundle-"+arr[i].bundle_id+"_offer-"+arr[i].offer_id+"' [class.page-table-trand_decrease]='"+arr[i].tr_raw+"' [class.page-table-trand]='"+!arr[i].tr_raw+"'></span></div></td> <td class='t9_6'><div class='page-table-trand_wr'><span class='page-table-trand_data'>" + arr[0].uniques + "</span> <span id='tr_uniques_bundle-"+arr[i].bundle_id+"_offer-"+arr[i].offer_id+"'></span></div></td> <td class='t9_7'><div class='page-table-trand_wr'><span class='page-table-trand_data'>" +arr[0].leads + "</span> <span id='tr_leads_bundle-"+arr[i].bundle_id+"_offer-"+arr[i].offer_id+"'></span></div></td> <td class='t9_8'><div class='page-table-trand_wr'><span class='page-table-trand_data'>" + arr[0].revenue + "</span> <span id='tr_revenue_bundle-"+arr[i].bundle_id+"_offer-"+arr[i].offer_id+"'></span></div></td> <td class='t9_9'><div class='page-table-trand_wr'><span class='page-table-trand_data'>" + arr[0].cr + "</span> <span id='tr_cr_bundle-"+arr[i].bundle_id+"_offer-"+arr[i].offer_id+"'></span></div></td> <td class='t9_10'><div class='page-table-trand_wr'><span class='page-table-trand_data'>" + arr[0].epv + "</span> <span id='tr_epv_bundle-"+arr[i].bundle_id+"_offer-"+arr[i].offer_id+"'></span></div></td><td class='t9_4'></td></tr>").insertAfter(jQuery('#' + id))
                        
                        }
                        
                        
                        if(arr[i].offer_id==arr[arr.length-1].offer_id){
                           
                            jQuery('#bundle-'+id+"_offer-"+arr[i].offer_id).addClass('hidden-row-last'+id);
                            jQuery('.hidden-row-last'+id+' td').css({borderBottomWidth:'1px',borderBottomColor:'#43c9e0'});
                        
                        }
                        
                        if(arr[i].tr_share==true){
                           
                            jQuery('#tr_share_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).addClass('page-table-trand');
                        }else{
                           
                            if(arr[i].tr_share==null){
                             
                                jQuery('#tr_share_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).removeClass();
                            }else{
                             
                                jQuery('#tr_share_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).addClass('page-table-trand_decrease');    
                            }
                           
                        }
                        
                        if(arr[i].tr_raw==true){
                            jQuery('#tr_raw_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).addClass('page-table-trand');
                        }else{
                            if(arr[i].tr_raw==null){
                                jQuery('#tr_raw_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).removeClass();
                            }else{
                                jQuery('#tr_raw_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).addClass('page-table-trand_decrease');    
                            }
                           
                        }
                        
                        if(arr[i].tr_uniques==true){
                            jQuery('#tr_uniques_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).addClass('page-table-trand');
                        }else{
                            if(arr[i].tr_uniques==null){
                                jQuery('#tr_uniques_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).removeClass();
                            }else{
                                jQuery('#tr_uniques_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).addClass('page-table-trand_decrease');    
                            }
                           
                        }
                        
                        if(arr[i].tr_leads==true){
                            jQuery('#tr_leads_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).addClass('page-table-trand');
                        }else{
                            if(arr[i].tr_leads==null){
                                jQuery('#tr_leads_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).removeClass();
                            }else{
                                jQuery('#tr_leads_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).addClass('page-table-trand_decrease');    
                            }
                           
                        }
                        
                        if(arr[i].tr_revenue==true){
                            jQuery('#tr_revenue_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).addClass('page-table-trand');
                        }else{
                            if(arr[i].tr_revenue==null){
                                jQuery('#tr_revenue_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).removeClass();
                            }else{
                                jQuery('#tr_revenue_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).addClass('page-table-trand_decrease');    
                            }
                           
                        }
                        
                        if(arr[i].tr_cr==true){
                            jQuery('#tr_cr_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).addClass('page-table-trand');
                        }else{
                            if(arr[i].tr_cr==null){
                                jQuery('#tr_cr_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).removeClass();
                            }else{
                                jQuery('#tr_cr_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).addClass('page-table-trand_decrease');    
                            }
                           
                        }
                        
                        if(arr[i].tr_epv==true){
                            jQuery('#tr_epv_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).addClass('page-table-trand');
                        }else{
                            if(arr[i].tr_epv==null){
                                jQuery('#tr_epv_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).removeClass();
                            }else{
                                jQuery('#tr_epv_bundle-'+arr[i].bundle_id+'_offer-'+arr[i].offer_id).addClass('page-table-trand_decrease');    
                            }
                           
                        }
                        }
                    // }
                }
                if(id==this.list.rows[this.list.rows.length-1].bundle_id){
                    jQuery('.hidden-row-last'+id+' td').css('borderBottomWidth','0px');
                }


            }
        }else {
              
            for (let i = 0; i < this.list.rows.length; i++) {
             
                if (id == this.list.rows[i].bundle_id) {
                   
                    let arr=[];
                    this.show_offer[id] = true;
                    for (let key of this.list_offer[this.list.rows[i].bundle_id]) {
                            
                        arr.push(key);
                     
                    }
                    for (let i = 0; i < arr.length; i++) {
                        jQuery('#bundle-'+id+"_offer-"+arr[i].offer_id).remove();
                       
                    }
                }
            }
        }
   }
  ngOnInit() {
  }
getResults(list){
    this.list=list;

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
  pushOnDate(value) {
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
        jQuery( ".datepicker" ).datepicker( "setDate", this.start_day );
      
      this.calendarService.showCalendar();
    }else{
        this.calendarService.hideCalendar();
    
    this.filters.filterPeriods(value, this.urlGetList).subscribe(res=> {
      this.list = res;
        this.total_raw= this.list.total_count.raw;
        this.total_uniques= this.list.total_count.uniques;
        this.total_leads=this.list.total_count.leads;
        this.total_revenue=this.list.total_count.revenue;
        this.total_cr=this.list.total_count.cr;
        this.total_epv=this.list.total_count.epv;
      
      console.log('filter')
        for(let i=0;i<this.list.rows.length;i++){
            this.show_offer[this.list.rows[i].bundle_id]=false;
            
            this.getListOffer(this.list.rows[i].bundle_id);

        }
    },
        (err) => {
            let error=err.json();
            if(error.logged==false){

                // window.location.replace(this.domain);
                this.router.navigate(['/']);
                localStorage.clear();
                this.globalLogin.serverTime=false;
                this.globalLogin.role=null;
            }


        })
    }
  }

  sort(value:string) {
      for(let i=0;i<this.list.rows.length;i++){
          for(let key in this.list_offer){
              if(key==this.list.rows[i].bundle_id)  {

                  this.show_offer[this.list.rows[i].bundle_id]=false;
                  this.getListOffer(this.list.rows[i].bundle_id);
              }
          }

      }
    this.filters.sorts(value, this.urlGetList)
        .subscribe(
            res=> {
              this.list = res;
              
                // for(let i=0;i<this.list.rows.length;i++){
                //     debugger;
                //     // for (let key in this.list.rows[i]) {
                //     //     if (key == 'offers') {
                //     //         // console.log('this.list_offer4',this.list.rows[i][key]);
                //     //         this.list_offer[this.list.rows[i].bundle_id] = this.list.rows[i][key];
                //     //         console.log('this.list_offer', this.list_offer)
                //     //         this.offer_list_get = false;
                //     //
                //     //
                //     //     }
                //     //
                //     //
                //     // }
                //     this.show_offer[this.list.rows[i].bundle_id]=false;
                //     debugger;
                //    this.getListOffer(this.list.rows[i].bundle_id);
                //  
                // }
               // for(let i=0;i<this.list.rows.length;i++){
               //     this.getListOffer(this.list.rows[i].bundle_id);
               //    
               // }
            },
            (err) => {
                let error=err.json();
                if(error.logged==false){

                    // window.location.replace(this.domain);
                    this.router.navigate(['/']);
                    localStorage.clear();
                    this.globalLogin.serverTime=false;
                    this.globalLogin.role=null;
                }


            }
        );
  }

  enter_search(value, object) {
      console.log('this.list_offer', this.list_offer,this.list);
      for(let i=0;i<this.list.rows.length;i++){
          for(let key in this.list_offer){
              if(key==this.list.rows[i].bundle_id)  {
                
                  this.show_offer[this.list.rows[i].bundle_id]=false;
                  this.getListOffer(this.list.rows[i].bundle_id);
              }
          }
        
      }
  
   
    this.filters.searches(value, this.urlGetList).subscribe(
        res=> {
            this.list = res;

            this.list_offer = {};
            // for(let i=0;i<this.list.rows.length;i++){
            //     for (let key in this.list.rows[i]) {
            //         if (key == 'offers') {
            //             console.log('this.list_offer', this.list_offer)
            //             debugger;
            //             this.show_offer[this.list.rows[i].bundle_id]=false;
            //             this.getListOffer(this.list.rows[i].bundle_id);
            //             // console.log('this.list_offer4',this.list.rows[i][key]);
            //             // this.list_offer[this.list.rows[i].bundle_id] = this.list.rows[i][key];
            //             //
            //             // this.offer_list_get = false;
            //             // debugger;
            //         }
            //     }
            //   
            //   
            //
            // }
            this.checkboxTableService.Create(this.list);
            this.eventEmitter$.emit(this.list.rows);
            this.total_share= this.list.total_count.share;
            this.total_raw= this.list.total_count.raw;
            this.total_uniques= this.list.total_count.uniques;
            this.total_leads=this.list.total_count.leads;
            this.total_revenue=this.list.total_count.revenue;
            this.total_cr=this.list.total_count.cr;
            this.total_epv=this.list.total_count.epv;
            if (typeof this.list.filterParams != 'undefined') {

                // jQuery('button[value="' + value + '"]').addClass('active');
                object.hidden_delete = false;
            } else {

                // jQuery('button[value="' + value + '"]').removeClass('active')
                object.hidden_delete = true;
            }
            object.hidden = true;

            return true;
        },
        (err) => {
            let error=err.json();
            if(error.logged==false){

                // window.location.replace(this.domain);
                this.router.navigate(['/']);
                localStorage.clear();
                this.globalLogin.serverTime=false;
                this.globalLogin.role=null;
            }


        }
    );
      }
  
  clear(value:string,object){
      console.log('this.list_offer', this.list_offer,this.list);
      for(let i=0;i<this.list.rows.length;i++){
          for(let key in this.list_offer){
              if(key==this.list.rows[i].bundle_id)  {
              
                  this.show_offer[this.list.rows[i].bundle_id]=false;
                
                  this.getListOffer(this.list.rows[i].bundle_id);
              }
          }

      }
    this.filters.clears(value,this.urlGetList).subscribe(
        res=>{this.list=res;
            console.log(this.list_offer)
      
            this.list_offer={};
          this.checkboxTableService.Create(res);
            this.eventEmitter$.emit(this.list.rows);
            this.total_share= this.list.total_count.share;
            this.total_raw= this.list.total_count.raw;
            this.total_uniques= this.list.total_count.uniques;
            this.total_leads=this.list.total_count.leads;
            this.total_revenue=this.list.total_count.revenue;
            this.total_cr=this.list.total_count.cr;
            this.total_epv=this.list.total_count.epv;
          object.hidden_delete=true;
          object.hidden=true;
            for(let i=0;i<this.list.rows.length;i++){
                for (let key in this.list.rows[i]) {
                    if (key == 'offers') {
                        // console.log('this.list_offer4',this.list.rows[i][key]);
                        this.list_offer[this.list.rows[i].bundle_id] = this.list.rows[i][key];
            
                        console.log('this.list_offer', this.list_offer)
                        this.offer_list_get = false;


                    }


                }
                this.show_offer[this.list.rows[i].bundle_id]=false;
                this.getListOffer(this.list.rows[i].bundle_id);

            }
          jQuery('button[value="'+value+'"]').removeClass('actives')
        },
        (err) => {
            let error=err.json();
            if(error.logged==false){

                // window.location.replace(this.domain);
                this.router.navigate(['/']);
                localStorage.clear();
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

                // window.location.replace(this.domain);
                this.router.navigate(['/']);
                localStorage.clear();
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
        res=>{this.list=res;

          this.display_from=this.list.pagination.pageSize*(this.list.pagination.page + 1)-(this.list.pagination.pageSize-1);
          this.display_to=this.list.pagination.pageSize*(this.list.pagination.page + 1);
          this.display_of=this.list.pagination.totalCount;
        },
        (err) => {
            let error=err.json();
            if(error.logged==false){

                // window.location.replace(this.domain);
                this.router.navigate(['/']);
                localStorage.clear();
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
  first() {
    this.currentPage = 1;
    this.filters.firsts(this.urlGetList, this).subscribe(
        res=> {
          this.list = res;

          this.display_from = this.list.pagination.pageSize * (this.list.pagination.page + 1) - (this.list.pagination.pageSize - 1);
          this.display_to = this.list.pagination.pageSize * (this.list.pagination.page + 1);
          this.display_of = this.list.pagination.totalCount;
        },
        (err) => {
            let error=err.json();
            if(error.logged==false){

                // window.location.replace(this.domain);
                this.router.navigate(['/']);
                localStorage.clear();
                this.globalLogin.serverTime=false;
                this.globalLogin.role=null;
            }


        });
    if (this.currentPage == 1) {
      this.page_button_first = true;
      this.page_button_prev = true;
      this.page_button_next = false;
      this.current_page = true;
    }
  }
// update(id:number,offer_id:number){
//   this.id=id;
//   // this.value=value;
//   this.renderOffer.renderUpdateUsoffer(this.id,offer_id);
// }
sendDate(start_day,end_day){

    this.filters.sendDate(this.urlGetList,start_day,end_day).subscribe(
        res=> {
            this.list = res;
            for(let i=0;i<this.list.rows.length;i++){
                this.show_offer[this.list.rows[i].bundle_id]=false;
                this.getListOffer(this.list.rows[i].bundle_id);

            }
        },
        (err) => {
            let error=err.json();
            if(error.logged==false){

                // window.location.replace(this.domain);
                this.router.navigate(['/']);
                localStorage.clear();
                this.globalLogin.serverTime=false;
                this.globalLogin.role=null;
            }


        })
}
    update(value:string,bundle_id:string){
        this.value=value;
        let update=true;
      // localStorage.setItem('bundle_id',bundle_id);
        this.renderUsOffer.renderUpdate(bundle_id,update);
        this.router.navigate(['users/bundle-list/add-bundle-step-1']);
    }
    getDetail(id,name){
        localStorage.setItem('statistic_offer_name',name);
        localStorage.setItem('statistic_offer_id',id);

        // this.renderStatistic.getBundleDetail(id);
        this.router.navigate(['/statistic/bundles-list/detail-statistic',id]);

    }
    getConversions(id,name){
        localStorage.setItem('statistic_offer_name',name);
        localStorage.setItem('statistic_offer_id',id);

        // this.renderStatistic.getBundleDetail(id);
        this.router.navigate(['/statistic/bundles-list/conversions',id]);

    }
}
