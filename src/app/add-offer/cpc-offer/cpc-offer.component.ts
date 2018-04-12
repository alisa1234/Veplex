import { Component,  AfterViewInit,ViewChild,OnInit, ElementRef,Pipe,PipeTransform,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../domains';
import {CountriesService} from '../../countries.service';
import {OfferListComponent} from '../offer-list/offer-list.component';
import {AddOfferComponent} from '../add-offer.component';
import {RenderOffer} from '../render-offer';
import {GlobalOffer} from '../global-offer';
import {CheckboxTableService} from "../../checkbox-table/checkbox-table.service";
import {InitChosen} from '../../initChosen';
import {GlobalLogin} from '../../global-login';

declare var jQuery:any;


declare var jQuery:any;

@Component({
  selector: 'app-cpc-offer',
  templateUrl: './cpc-offer.component.html',
  styleUrls: ['./cpc-offer.component.scss']
})
export class CpcOfferComponent extends GlobalOffer{
  device_value:any='null';
  information:string='';
  transaction_life:number;
  carriers:string='';
  platforms:string='';
  
  @ViewChild ('banner_upload')  upload_banner_file;
  @ViewChild ('screenshot_upload') upload_screenshot_file;
  @ViewChild ('countrie_chosen') countrie_chosen;
  @ViewChild ('geo_div') geo_div;

  private devices_values=[{'value':'null','name':'Device'},{'value':'0','name':'All'},{'value':'1','name':'Mobile'},{'value':'2','name':'Desktop'}];
  constructor(public router:Router,http: Http,domains: Domains, public _countrieService: CountriesService, public addOffer:AddOfferComponent,public renderOffer:RenderOffer, public checkboxTableService:CheckboxTableService, public initChosen:InitChosen, public globalLogin:GlobalLogin){
    super(router,http,domains,_countrieService,addOffer,renderOffer,initChosen,checkboxTableService,globalLogin);
  
  }
  send(formData:FormData=new FormData()){
    // this.device_value=jQuery("#device_value").val();
    let carriers=this.carriers;
    let platforms=this.platforms;
    let transaction_life=this.transaction_life;
    let information=this.information;
    let device_value=this.device_value;
    console.log('inform bla'+this.information, typeof this.information, typeof information)
    formData.append("Offer[device][]",this.device_value);
    this.FormDataCreate(formData,{
      // device:device_value,
      carriers:carriers,
      platforms:platforms,
      transaction_life:transaction_life,
      information:information
    });

    super.send(formData);
  }
  clear(){
    super.clear();
  }
}
