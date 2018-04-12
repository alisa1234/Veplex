import { Component, OnInit,AfterViewInit,EventEmitter } from '@angular/core';
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
import {RenderUsOffer} from '../../render-usoffer';
import {Location} from '@angular/common';
import {PopupScreensService} from '../../../popup-screens/popup-screens.service';
import {GlobalLogin} from '../../../global-login';

declare var jQuery:any;

@Component({
  selector: 'app-add-bundle-step-1',
  templateUrl: './add-bundle-step-1.component.html',
  styleUrls: ['./add-bundle-step-1.component.scss'],
  host:{'class':'root'}
})
export class AddBundleStep1Component implements OnInit {
    _http: Http;
    domain: string;
    url: string;
    csrf: string;
    body: any;

    currentPage: number;

    result: any;

    display_from:any;
    display_to:any;
    display_of:any;
    displaying:boolean=true;

    page:any;
    page_count:any;
    page_button_next:boolean=true;
    page_button_next_disabled:boolean=true;
    page_button_next_arrow:boolean=true;
    page_button_prev:boolean=true;
    page_button_first:boolean=true;
    current_page:boolean=true;
    
  urlGetList:string;
  list={rows:[],pagination:(<any>Object),sort:(<any>Object),filterParams:(<any>Object)};
    list_step2:any;
  filter_model:string;
    isInfo:{[index:string]:boolean}={};
    isChoose:{[index:string]:boolean}={};
    isScreen:{[index:string]:boolean}={};
    array_offers=[];
    selected:number=0;

    not_found_result=false;

    next_disable:boolean=true;
    update_bundle:boolean=false;
    
    bundle_id:string='';
    bundle_id_update:string='';
    public eventEmitter$: EventEmitter<any>;

  constructor(public router:Router,http: Http,domains: Domains, public _countrieService: CountriesService,public filters:Filters,public popupChange:PopupChange,public renderOffer:RenderOffer,public popupInformationService:PopupInformationService,public statusService:StatusService, public checkboxTableService:CheckboxTableService, public renderUsOffer:RenderUsOffer, public location:Location, public popupScreensService:PopupScreensService, public globalLogin:GlobalLogin) {
      this._http = http;
      this.domain = domains.domain;
      this.csrf = domains.csrf;
      this.urlGetList=domains.urlUpdateAllBundle;
    let result:any;
      this.filter_model='offer';
      this.eventEmitter$=new EventEmitter();
   
      // this.bundle_id=localStorage.getItem('bundle_id');
      this.renderUsOffer.list3.rows=[];
      
      
    this._http.get(this.domain + this.csrf)
        .map((res: Response) => {
          this.body = res.json();
        })
        .subscribe(
            res=>result=res
        );

     
     
      if(this.renderUsOffer.update==true){
          this.update_bundle=true;
          
          if(this.renderUsOffer.list2.rows.length!=0 && this.renderUsOffer.list_step1.rows.length!=this.renderUsOffer.list2.rows.length ){
              
              // this.list=this.renderUsOffer.list2;
              this.renderUsOffer.renderUpdate(this.renderUsOffer.bundle_id,true);
            
              this.renderUsOffer.eventEmitter$3.subscribe(item=>{
                  this.list=item;
                 
             
              if(this.list.rows.length==0){
                  this.not_found_result=true;
              }else {

                    this.bundle_id_update='Bundle ID'+this.renderUsOffer.bundle_id;
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

                  for (let i = 0; i < this.list.rows.length; i++) {
                      this.isChoose[this.list.rows[i].id] = false;
                      this.isInfo[this.list.rows[i].id] = false;
                      this.isScreen[this.list.rows[i].id] = false;

                      if (this.list.rows[i].information != null) {

                          this.isInfo[this.list.rows[i].id] = true;

                      }
                      if (this.list.rows[i].pics_url != null) {

                          this.isScreen[this.list.rows[i].id] = true;

                      }
                      if( this.list.rows[i].plus==true){
                          this.isChoose[ this.list.rows[i].id] = false;
                          this.chooseOffer( this.list.rows[i].id);


                      }
                  }



                  // else{
                  //     this.renderUsOffer.renderUpdate(this.bundle_id,true);
                  //     this.renderUsOffer.eventEmitter$3.subscribe(item=>{
                  //         debugger;
                  //         for(let i=0;i<item.rows.length;i++){
                  //             if(item.rows[i].plus==true){
                  //                 this.isChoose[item.rows[i].id] = false;
                  //                 this.chooseOffer(item.rows[i].id);
                  //                 debugger;
                  //
                  //             }
                  //         }
                  //     })
                  // }

              }
              })
          }else {
            
              this.renderUsOffer.eventEmitter$3.subscribe(item=>{

                      this.list=item;
                  // for(let i=0;i<item.rows.length;i++){
                  //     if(item.rows[i].plus==true){
                  //         this.isChoose[item.rows[i].id] = false;
                  //         this.chooseOffer(item.rows[i].id);
                  //       
                  //
                  //     }
                  // }

                  if(this.list.rows.length==0){
                      this.not_found_result=true;
                  }else {

                      this.bundle_id_update='Bundle ID'+this.renderUsOffer.bundle_id+'- ';
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

                      for (let i = 0; i < this.list.rows.length; i++) {
                          this.isChoose[this.list.rows[i].id] = false;
                          this.isInfo[this.list.rows[i].id] = false;
                          this.isScreen[this.list.rows[i].id] = false;

                          if (this.list.rows[i].information != null) {

                              this.isInfo[this.list.rows[i].id] = true;

                          }
                          if (this.list.rows[i].pics_url != null) {

                              this.isScreen[this.list.rows[i].id] = true;

                          }
                          if( this.list.rows[i].plus==true){
                              this.isChoose[ this.list.rows[i].id] = false;
                              this.chooseOffer( this.list.rows[i].id);


                          }
                      }



                      // else{
                      //     this.renderUsOffer.renderUpdate(this.bundle_id,true);
                      //     this.renderUsOffer.eventEmitter$3.subscribe(item=>{
                      //         debugger;
                      //         for(let i=0;i<item.rows.length;i++){
                      //             if(item.rows[i].plus==true){
                      //                 this.isChoose[item.rows[i].id] = false;
                      //                 this.chooseOffer(item.rows[i].id);
                      //                 debugger;
                      //
                      //             }
                      //         }
                      //     })
                      // }

                  }
              })    
          }
          
          this.renderUsOffer.update=false;
       
      }else{
     
          this._http.get(this.domain+this.urlGetList+'?step=1&id='+this.renderUsOffer.bundle_id)
              .map((res:Response)=>{
                  return res.json();
              })
              .subscribe(data=>{
                  this.list=data;
                  // this.update_bundle=true;
               
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

                      for (let i = 0; i < this.list.rows.length; i++) {
                          this.isChoose[this.list.rows[i].id] = false;
                          this.isInfo[this.list.rows[i].id] = false;
                          this.isScreen[this.list.rows[i].id] = false;

                          if (this.list.rows[i].information != null) {

                              this.isInfo[this.list.rows[i].id] = true;

                          }
                          if (this.list.rows[i].pics_url != null) {

                              this.isScreen[this.list.rows[i].id] = true;

                          }
                          if( this.list.rows[i].plus==true){
                              this.isChoose[ this.list.rows[i].id] = false;
                              this.chooseOffer( this.list.rows[i].id);

                              
                          }
                      }



                      // else{
                      //     this.renderUsOffer.renderUpdate(this.bundle_id,true);
                      //     this.renderUsOffer.eventEmitter$3.subscribe(item=>{
                      //         debugger;
                      //         for(let i=0;i<item.rows.length;i++){
                      //             if(item.rows[i].plus==true){
                      //                 this.isChoose[item.rows[i].id] = false;
                      //                 this.chooseOffer(item.rows[i].id);
                      //                 debugger;
                      //
                      //             }
                      //         }
                      //     })
                      // }

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


                  })
      }
  }

  ngOnInit() {
  
  }
    ngAfterViewInit(){
        // this.renderUsOffer.eventEmitter$.subscribe(item=>{
        //     for(let i=0;i<item.rows.length;i++){
        //         if(item.rows[i].plus==true){
        //             this.isChoose[item.rows[i].id] = false;
        //             // this.chooseOffer(item.rows[i].id);
        //             
        //         }
        //     }
        //
        // })
    }
    
  sort(value:string){
    this.filters.sorts(value,this.urlGetList)
        .subscribe(
            res=>{this.list=res;},
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

            // jQuery('button[value="'+value+'"]').addClass('active');
            object.hidden_delete=false;
          }else{

            // jQuery('button[value="'+value+'"]').removeClass('active')
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
    chooseOffer(id){
        console.log('id');
        let selected_count:number = 0;
        
        if(this.isChoose[id]==true){
            
            this.isChoose[id]=false;
            for(let i=0;i<this.array_offers.length;i++){
                if(this.array_offers[i]==id){
                    this.array_offers.splice(i,1);
                    selected_count--;
                }
                // this.selected=this.array_offers.length;
            }
            
            console.log('arr del',this.array_offers);
        }else{
            this.isChoose[id]=true;
            this.array_offers.push(id);
            selected_count++;
           
            console.log('arr add',this.array_offers);
        }
        this.selected=this.array_offers.length;
        if(this.array_offers.length!=0){
          
            this.next_disable=false;
        }else{
          
            this.next_disable=true;
        }
       
    }
    update(){
        let array_offers=this.array_offers;
        let csrf=this.body.csrf;
    
        this.renderUsOffer.getStep2(this.array_offers,this.update_bundle);
        this.router.navigate(['/users/bundle-list/add-bundle-step-2']);
        
    }
}
