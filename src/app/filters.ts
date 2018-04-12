/**
 * Created by Алиска on 02.03.2017.
 */
import { Injectable,AfterViewInit } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from './domains';
import {StatusService} from './status.service';
import {InitChosen} from './initChosen';


declare var jQuery:any;

@Injectable()
export class Filters implements AfterViewInit{

    _sort: string;
    currentPage: number;
    field_name: string;
    params: string;
    period:string;
    status_search:any;
    value:any;
    url:string;
    
    dropdawns:string[]=['countries','access','type','status','category_id'];
    
    _http: Http;
    domain:string;
    constructor(http: Http,domains:Domains,public statusService:StatusService,public initChosen:InitChosen){
        this._http = http;
        this.domain = domains.domain;
        this.statusService=statusService;
        this.initChosen=initChosen;
        this.currentPage=1;
        
    }
    ngOnInit(){
   
    }
    ngAfterViewInit(){
        
        let self=this;
        jQuery(document).click(function (e) {
            let value=e.target.value;

            jQuery('#dialog_choose').click(function (e) {
                e.stopPropagation();
            })
            if(e.target.className!='page-table_prc' && e.target.className!='search-table'){
            }

        })
    }
    getStatusSearch(status_search){
       
        this.status_search=status_search
        if(typeof this.status_search !='undefined'){
            
        }
    }
sorts(value:string,url:string){
  
    jQuery('.page-table_sort_wr>a').removeClass().addClass('page-table_sort');
    if(this._sort == value){
    
        this._sort = '-'+this._sort;
        jQuery('#'+value+'_sort').removeClass().addClass('page-table_sort-up')
    
    }else{this._sort = value;jQuery('#'+value+'_sort').removeClass().addClass('page-table_sort-down')}

    return this._http.get(this.domain+url +"?page="+ this.currentPage + '&sort=' + this._sort)
        .map((res: Response) => res.json())
        

}
searches(value:string,url:string){
    this.url=url;
    this.field_name = value;
    this.params = (<HTMLInputElement>event.target).value;
    let logic = 'ilike';
    let creds = "?filter[" + this.field_name + "][params]=" + this.params;
    let creds2 = "?filter[" + this.field_name + "][logic]=" + logic + "&filter[" + this.field_name + "][params]=" + this.params;
    let headers=new Headers();


    return this._http.get(this.domain+url+creds)
        .map((res: Response) => res.json())
      
}
    searches_status(value:string,url:string,status:any){
       

        this.field_name = value;
        this.params = status;
        let creds='';
        let logic = 'ilike';
        if(Array.isArray(status) && status.length > 0) {
            for (let i = 0; i < status.length; i++) {

                creds += "&filter[" + this.field_name + "][params][" + i + "][id]=" + status[i]
            }
        }else{
            creds = "&filter[" + this.field_name + "][params][0][id]=" + creds

        }
        
    


        return this._http.get(this.domain+url +"?"+creds)
            .map((res: Response) => res.json())
     
    }

clears(value:string,url:string) {

    this.field_name = value;
    let params = (<HTMLInputElement[]><any>document.getElementsByClassName('search__close'));
   
    for (let i = 0; i < params.length; i++) {

        if(this.field_name==params[i].id){
            
            params[i].value = "";
        }
    }

    var logic = 'ilike';
    let creds = "?filter[" + this.field_name + "][params]=" + '';

    return  this._http.get(this.domain+url+creds)
        .map((res: Response) =>  res.json())
    
}

    cleards(field){
      
        jQuery('#'+field+'_popup').val('');
    }
    
nexts(url:string,object) {
    object.currentPage ++;
    return this._http.get(this.domain+url +'?page='+ object.currentPage)
        .map((res: Response) => res.json())
       
}

prevs(url:string,object) {
    object.currentPage --;
    return  this._http.get(this.domain+url +'?page='+ object.currentPage)
        .map((res: Response) =>res.json())
  
}
    firsts(url:string,object){
        return  this._http.get(this.domain+url +'?page=1')
            .map((res: Response) =>res.json())
        
    }
filterPeriods(value:string,url:string){
  this.period = value;

    return  this._http.get(this.domain +url+ "?filterPeriod="+this.period)
      .map((res: Response) =>res.json())
      

}
    sendDate(url,start_day,end_day){
        return this._http.get(this.domain+url+'?filterDateStart='+start_day+'&filterDateEnd='+end_day)
            .map((res: Response) => res.json())
    }
}