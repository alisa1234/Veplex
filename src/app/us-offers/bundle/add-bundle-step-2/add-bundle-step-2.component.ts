import { Component, OnInit,ViewChild,EventEmitter } from '@angular/core';
import {GlobalUsOffer} from '../../global-usoffer'
import { Router } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../../domains';
import {CountriesService} from '../../../countries.service';
import {PopupChange} from '../../../popup-change';
import {Filters} from '../../../filters';
import {RenderOffer} from '../../../add-offer/render-offer';
import {PopupInformationService} from '../../popup-information/popup-information.service';
import {CheckboxTableService} from "../../../checkbox-table/checkbox-table.service";
import {StatusService} from '../../../status.service';
import {PopupFilterDialogService} from '../../../popup-filter-dialog/popup-filter-dialog.service';
import {RenderUsOffer} from '../../render-usoffer';
import {GlobalLogin} from '../../../global-login';

declare var jQuery:any;

@Component({
  selector: 'app-add-bundle-step-2',
  templateUrl: './add-bundle-step-2.component.html',
  styleUrls: ['./add-bundle-step-2.component.scss'],
  host:{'class':'root'}
})
export class AddBundleStep2Component implements OnInit {
  _http: Http;
  domain: string;
  url: string;
  csrf: string;
  getAllBundleFiter: string;
  getAllBundle: string;
    urlUpdateAllBundle: string;
  body: any;
  urlGetList:string;
  list={rows:[],pagination:(<any>Object),sort:(<any>Object),filterParams:(<any>Object),data:(<any>Object)};
  list_filter={browser:[],os:[],countries:[]};
  filter_model:string;
  
  checkbox_arr=[];

  geo_filter:boolean=false;
  browser_filter:boolean=false;
  os_filter:boolean=false;
  offer_name_style:boolean=true;
  
  one:any;
  two:any;
  three:any;

  currentPage: number;
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

    not_found_result=false;
    update:boolean=false;
    bundle_name:string='';
    bundle_id_update:string='';

  @ViewChild('geo') geo;
  @ViewChild('browser') browser;
  @ViewChild('os') os;
    
  constructor(public router:Router,http: Http,domains: Domains, public _countrieService: CountriesService,public filters:Filters,public popupChange:PopupChange,public popupInformationService:PopupInformationService,public statusService:StatusService, public checkboxTableService:CheckboxTableService, public renderUsOffer:RenderUsOffer,public popupFilterDialogService:PopupFilterDialogService, public globalLogin:GlobalLogin) {
    this._http = http;
    this.domain = domains.domain;
    this.getAllBundleFiter = domains.getAllBundleFiter;
    this.getAllBundle = domains.urlGetAllBundle;
    this.urlUpdateAllBundle = domains.urlUpdateAllBundle;
    this.urlGetList = domains.urlGetAllBundle+'?step=2';
    this.csrf = domains.csrf;
    this.renderUsOffer=renderUsOffer;

      this.renderUsOffer.list_step1.rows=[];
    // this.renderUsOffer.eventEmitter$.subscribe(item=>{
    //   this.list=this.renderUsOffer.list_step2;
    if(this.renderUsOffer.update2==true){
        debugger;
        this.update=this.renderUsOffer.update2;
        if(this.renderUsOffer.list3.rows.length!=0){
      debugger;
            
            this.renderUsOffer.getStep2(this.renderUsOffer.array_offers,this.renderUsOffer.bundle_id);
            this.renderUsOffer.eventEmitter$.subscribe(item=> {
                this.list =item;
                this.update=this.renderUsOffer.update2;

                this.bundle_id_update='Update bundle ID'+this.renderUsOffer.bundle_id;

                if (this.list.rows.length == 0) {
                    this.not_found_result = true;
                } else {
                    // this.eventEmitter$.emit(this.list_filter);
                    this.bundle_name=this.list.data.name;
                    this.popupFilterDialogService.getAllBundleFilters(this.list);
                    this.sortGroup(this.list);

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

                        if (typeof this.list.filterParams.country_name != 'undefined') {

                            this.geo_filter = true;
                            this.offer_name_style = false;
                            console.log('geo', this.geo)
                        }else{this.geo_filter = false;}
                        if (typeof this.list.filterParams.browser_name != 'undefined') {

                            this.browser_filter = true;
                            this.offer_name_style = false;
                        }
                        if (typeof this.list.filterParams.os_name != 'undefined') {

                            this.os_filter = true;
                            this.offer_name_style = false;
                        }

                        if (this.geo_filter == true && this.browser_filter != true && this.os_filter != true || this.geo_filter != true && this.browser_filter == true && this.os_filter != true || this.geo_filter != true && this.browser_filter != true && this.os_filter == true) {
                            this.one = true;
                        }
                        if (this.geo_filter == true && this.browser_filter == true && this.os_filter != true || this.geo_filter != true && this.browser_filter == true && this.os_filter == true || this.geo_filter == true && this.browser_filter != true && this.os_filter == true) {
                            this.two = true;
                            this.one = false;
                        }
                        if (this.geo_filter == true && this.browser_filter == true && this.os_filter == true) {
                            this.three = true;
                            this.two = false;
                        }
                    }
                }
                // }
            })
        }else{
          debugger;
            this.renderUsOffer.eventEmitter$.subscribe(item=> {
                debugger;
                this.list = item;
                this.update=this.renderUsOffer.update2;
             
        
                this.bundle_id_update='Update bundle ID'+this.renderUsOffer.bundle_id;
                if (this.list.rows.length == 0) {
                    this.not_found_result = true;
                } else {
                    // this.eventEmitter$.emit(this.list_filter);
                    this.bundle_name=this.list.data.name;
                    this.popupFilterDialogService.getAllBundleFilters(this.list);

                    this.sortGroup(this.list);
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
        
                        if (typeof this.list.filterParams.country_name != 'undefined') {

                            this.geo_filter = true;
                            this.offer_name_style = false;
                            console.log('geo', this.geo)
                        }else{this.geo_filter = false;}
                        if (typeof this.list.filterParams.browser_name != 'undefined') {
                           
                            this.browser_filter = true;
                            this.offer_name_style = false;
                            
                        }else{this.browser_filter = false;}
                        if (typeof this.list.filterParams.os_name != 'undefined') {
                           
                            this.os_filter = true;
                            this.offer_name_style = false;
                          
                        }else{this.os_filter = false;}
        
                        if (this.geo_filter == true && this.browser_filter != true && this.os_filter != true || this.geo_filter != true && this.browser_filter == true && this.os_filter != true || this.geo_filter != true && this.browser_filter != true && this.os_filter == true) {
                            this.one = true;
                        }
                        if (this.geo_filter == true && this.browser_filter == true && this.os_filter != true || this.geo_filter != true && this.browser_filter == true && this.os_filter == true || this.geo_filter == true && this.browser_filter != true && this.os_filter == true) {
                            this.two = true;
                            this.one = false;
                        }
                        if (this.geo_filter == true && this.browser_filter == true && this.os_filter == true) {
                            this.three = true;
                            this.two = false;
                        }
                    }
                }
                // }
            })
        }
    }else {
        debugger;
        if (this.renderUsOffer.trigger != true){
            debugger;
            this._http.get(this.domain + this.urlUpdateAllBundle + '?step=2&offers_id=[' + this.renderUsOffer.array_offers + ']' + '&id=' + this.renderUsOffer.bundle_id)
                .map((res:Response)=> {
                    return res.json();
                })
                .subscribe(data=> {
                        this.list = data;
                        this.update = this.renderUsOffer.update;

                        debugger;

                        if (this.list.rows.length == 0) {
                            this.not_found_result = true;
                        } else {
                            // this.eventEmitter$.emit(this.list_filter);
                            this.bundle_name = this.list.data.name;
                            this.popupFilterDialogService.getAllBundleFilters(this.list);

                            this.sortGroup(this.list);
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

                                if (typeof this.list.filterParams.country_name != 'undefined') {

                                    this.geo_filter = true;
                                    this.offer_name_style = false;
                                    console.log('geo', this.geo)
                                } else {
                                    this.geo_filter = false;
                                }
                                if (typeof this.list.filterParams.browser_name != 'undefined') {

                                    this.browser_filter = true;
                                    this.offer_name_style = false;
                                }
                                if (typeof this.list.filterParams.os_name != 'undefined') {

                                    this.os_filter = true;
                                    this.offer_name_style = false;
                                }

                                if (this.geo_filter == true && this.browser_filter != true && this.os_filter != true || this.geo_filter != true && this.browser_filter == true && this.os_filter != true || this.geo_filter != true && this.browser_filter != true && this.os_filter == true) {
                                    this.one = true;
                                }
                                if (this.geo_filter == true && this.browser_filter == true && this.os_filter != true || this.geo_filter != true && this.browser_filter == true && this.os_filter == true || this.geo_filter == true && this.browser_filter != true && this.os_filter == true) {
                                    this.two = true;
                                    this.one = false;
                                }
                                if (this.geo_filter == true && this.browser_filter == true && this.os_filter == true) {
                                    this.three = true;
                                    this.two = false;
                                }
                            }
                        }
                    },
                    (err) => {
                        let error = err.json();
                        if (error.logged == false) {
                            debugger;
                            // window.location.replace(this.domain);
                            this.router.navigate(['/']);
                            // let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                            // localStorage.setItem('current_breadcrumb',current_breadcrumb);
                            localStorage.setItem('current_url', this.router.url);
                            this.globalLogin.serverTime = false;
                            this.globalLogin.role = null;
                        }


                    })
    }else{
            debugger;
            this.renderUsOffer.trigger=false;
            this.renderUsOffer.eventEmitter$.subscribe(item=> {
                debugger;
                this.list = item;
                this.update=this.renderUsOffer.update2;


                this.bundle_id_update='Update bundle ID'+this.renderUsOffer.bundle_id;
                if (this.list.rows.length == 0) {
                    this.not_found_result = true;
                } else {
                    // this.eventEmitter$.emit(this.list_filter);
                    this.bundle_name=this.list.data.name;
                    this.popupFilterDialogService.getAllBundleFilters(this.list);
                    this.sortGroup(this.list);

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

                        if (typeof this.list.filterParams.country_name != 'undefined') {

                            this.geo_filter = true;
                            this.offer_name_style = false;
                            console.log('geo', this.geo)
                        }else{this.geo_filter = false;}
                        if (typeof this.list.filterParams.browser_name != 'undefined') {

                            this.browser_filter = true;
                            this.offer_name_style = false;

                        }else{this.browser_filter = false;}
                        if (typeof this.list.filterParams.os_name != 'undefined') {

                            this.os_filter = true;
                            this.offer_name_style = false;

                        }else{this.os_filter = false;}

                        if (this.geo_filter == true && this.browser_filter != true && this.os_filter != true || this.geo_filter != true && this.browser_filter == true && this.os_filter != true || this.geo_filter != true && this.browser_filter != true && this.os_filter == true) {
                            this.one = true;
                        }
                        if (this.geo_filter == true && this.browser_filter == true && this.os_filter != true || this.geo_filter != true && this.browser_filter == true && this.os_filter == true || this.geo_filter == true && this.browser_filter != true && this.os_filter == true) {
                            this.two = true;
                            this.one = false;
                        }
                        if (this.geo_filter == true && this.browser_filter == true && this.os_filter == true) {
                            this.three = true;
                            this.two = false;
                        }
                    }
                }
                // }
            })
        }
    }

    
    
    console.log('res',this.list)
    let result:any;

    this._http.get(this.domain + this.csrf)
        .map((res: Response) => {
          this.body = res.json();
        })
        .subscribe(
            res=>result=res
        );

    this._http.get(this.domain + this.getAllBundleFiter)
        .map((res: Response) => {
          return res.json();
        })
        .subscribe(
            res=>{this.list_filter=res;
              console.log('filters',this.list_filter);
               
            
            }
        );
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
  selectCheck(event,field){
     
    this.popupFilterDialogService.choosenField(event,field,this.list_filter,this.list);
  }
  send(){
    let filter='';
    let result;
    console.log('send',this.popupFilterDialogService.checkbox_arr[this.popupFilterDialogService.field],this.popupFilterDialogService.field);
    if(this.popupFilterDialogService.checkbox_arr[this.popupFilterDialogService.field].length==0) {
        
        filter += "&filter[" + this.popupFilterDialogService.field + "][params][0][id]=" + this.popupFilterDialogService.checkbox_arr[this.popupFilterDialogService.field];
        
    }else{
        for (let i = 0; i < this.popupFilterDialogService.checkbox_arr[this.popupFilterDialogService.field].length; i++) {
           
            filter += "&filter[" + this.popupFilterDialogService.field + "][params][" + i + "][id]=" + this.popupFilterDialogService.checkbox_arr[this.popupFilterDialogService.field][i];

        }
    }

    console.log('send2',filter);
    this._http.get(this.domain + this.urlUpdateAllBundle+'?step=2&offers_id=['+this.renderUsOffer.array_offers+']'+'&id='+this.renderUsOffer.bundle_id+ filter)
        .map((res: Response) => {
          return res.json();
        })
        .subscribe(
            data=>{
                this.list=data;
                this.sortGroup(this.list);
                if(typeof this.list.filterParams != 'undefined'){
              if(typeof this.list.filterParams.country_name !='undefined'){

                this.geo_filter=true;
                this.offer_name_style=false;
                console.log('geo',this.geo)
              }else{
                  this.geo_filter=false;
              }
              if(typeof this.list.filterParams.browser_name !='undefined'){
                this.browser_filter=true;
                this.offer_name_style=false;
              }else{
                  this.browser_filter=false;
              }
              if(typeof this.list.filterParams.os_name !='undefined'){
                this.os_filter=true;
                this.offer_name_style=false;
              }else{
                 
                  this.os_filter=false;
              }
              
              if(this.geo_filter==true && this.browser_filter!=true && this.os_filter!=true || this.geo_filter!=true && this.browser_filter==true && this.os_filter!=true || this.geo_filter!=true && this.browser_filter!=true && this.os_filter==true){
                this.one=true;
              }
              if(this.geo_filter==true && this.browser_filter==true && this.os_filter!=true || this.geo_filter!=true && this.browser_filter==true && this.os_filter==true || this.geo_filter==true && this.browser_filter!=true && this.os_filter==true){
                this.two=true;
                this.one=false;
              }
              if(this.geo_filter==true && this.browser_filter==true && this.os_filter==true){
                this.three=true;
                this.two=false;
              }

                if(this.list.pagination.totalCount>100){

                    this.display_from=this.list.pagination.pageSize*(this.list.pagination.page + 1)-(this.list.pagination.pageSize-1);
                    this.display_to=this.list.pagination.pageSize*(this.list.pagination.page + 1);
                    this.display_of=this.list.pagination.totalCount;
                }else{

                    this.display_from= this.list.pagination.pageSize*(this.list.pagination.page + 1)-(this.list.pagination.pageSize-1);
                    this.display_to=this.list.pagination.totalCount;
                    this.display_of=this.list.pagination.totalCount;
                }
                }else{
                    this.geo_filter=false;
                    this.os_filter=false;
                    this.browser_filter=false;
                    
                }
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


            });
  }
    chooseField(event,id,user_id,proffer_id,value,value_id,field,type,data) {
        this.popupChange.choosenField(event, id, user_id, proffer_id, value, field, field, type, type, null, this.list, null, value_id, data)
    }

    changeField(value){
        this.popupChange.changedField(value,this.list,this.body.csrf,this.urlGetList);
    }

    ValueCheckbox(id){
    this.checkbox_arr.push(id);
    console.log('ValueCheckbox', this.checkbox_arr)
  }

  sort(value:string){

    this.filters.sorts(value,this.urlGetList)
        .subscribe(
            res=>{console.log(res);this.list=res;this.sortGroup(this.list);console.log('sort',this.list);},
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


            }
        );
  }
  enter_search(value,object){

    this.filters.searches(value,this.urlGetList).subscribe(
        res=>{
          this.list=res;
            this.sortGroup(this.list);
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
        res=>{this.list=res;
          this.checkboxTableService.Create(res);
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

          jQuery('button[value="'+value+'"]').removeClass('actives')
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


        }
    );
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
            this.sortGroup(this.list);
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
            this.sortGroup(this.list);
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

    getStep3_Edit(){
        this.update=true;
        localStorage.setItem("bundle_id", this.list.data.id.toString());
       
        localStorage.setItem("bundle_name", this.list.data.name);
      
        this.renderUsOffer.getStep3(this.list.data.id,this.update);

        this.router.navigate(['users/bundle-list/update-bundle-step-3', this.list.data.id]);
    }
    getStep3_Add(){
       
        this.router.navigate(['users/bundle-list/add-bundle-step-3']);
    }
}
