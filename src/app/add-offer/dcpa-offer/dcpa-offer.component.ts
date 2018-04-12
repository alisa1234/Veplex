import { Component,  AfterViewInit,ViewChild,OnInit, ElementRef,Pipe,PipeTransform,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../domains';
import {CountriesService} from '../../countries.service';
import {OfferListComponent} from '../offer-list/offer-list.component';
import {AddOfferComponent} from '../add-offer.component';
import {RenderOffer} from '../render-offer';
import {CpaOfferComponent} from '../cpa-offer/cpa-offer.component';
import {CheckboxTableService} from "../../checkbox-table/checkbox-table.service";
import {InitChosen} from '../../initChosen';
import {GlobalLogin} from '../../global-login';

declare var jQuery:any;

@Component({
  selector: 'app-dcpa-offer',
  templateUrl: './dcpa-offer.component.html',
  styleUrls: ['./dcpa-offer.component.scss']
})
export class DcpaOfferComponent extends CpaOfferComponent {
  @ViewChild ('banner_upload')  upload_banner_file;
  @ViewChild ('screenshot_upload') upload_screenshot_file;
  @ViewChild ('countrie_chosen') countrie_chosen;
  @ViewChild ('geo_div') geo_div;

  device_value:any='null';
  information:string='';
  transaction_life:number;
  carriers:string='';
  platforms:string='';
  constructor(public router:Router,http: Http,domains: Domains, public _countrieService: CountriesService, public addOffer:AddOfferComponent,public renderOffer:RenderOffer, public checkboxTableService:CheckboxTableService, public initChosen:InitChosen, public globalLogin:GlobalLogin){
    super(router,http,domains,_countrieService,addOffer,renderOffer,checkboxTableService,initChosen,globalLogin);
  }
  send(formData:FormData=new FormData()){
  let carriers=this.carriers;
  let platforms=this.platforms;
  let transaction_life=this.transaction_life;
  let information=this.information;
  let device_value=this.device_value;
  formData.append("Offer[device][]",this.device_value);
  this.FormDataCreate(formData,{
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