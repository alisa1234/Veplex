import { Component,  AfterViewInit,ViewChild,OnInit, ElementRef,Pipe,PipeTransform,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {GlobalOffer} from '../global-offer';

declare var jQuery:any;

@Component({
  selector: 'app-fallback-offer',
  templateUrl: './fallback-offer.component.html',
  styleUrls: ['./fallback-offer.component.scss']
})
export class FallbackOfferComponent extends GlobalOffer {

}
