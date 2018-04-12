import { Component,  AfterViewInit,ViewChild,OnInit, ElementRef,Pipe,PipeTransform,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../domains';
import {CountriesService} from '../../countries.service';
import {OfferListComponent} from '../offer-list/offer-list.component';
import {AddOfferComponent} from '../add-offer.component';
import {RenderOffer} from '../render-offer';
import {GlobalOffer} from '../global-offer';

declare var jQuery:any;

@Component({
  selector: 'app-fallback-offer',
  templateUrl: './fallback-offer.component.html',
  styleUrls: ['./fallback-offer.component.scss']
})
export class FallbackOfferComponent extends GlobalOffer {
  // constructor(protected router:Router,http: Http,domains: Domains, protected _countrieService: CountriesService, protected addOffer:AddOfferComponent,protected renderOffer:RenderOffer) {
  //   super(router, http, domains, _countrieService, addOffer, renderOffer);
  // }
  // send(){
  //  
  //   super.send();
  // }
}
