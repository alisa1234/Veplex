import { Component, OnInit,Input,HostListener, ElementRef,Output,EventEmitter,ViewChild } from '@angular/core';
import {PopupReportsService} from './popup-reports.service';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../domains';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-reports',
  templateUrl: './popup-reports.component.html',
  styleUrls: ['./popup-reports.component.scss']
})
export class PopupReportsComponent implements OnInit {
  @Input() downloadCSV:string;
  @Input() resendCSV:string;
  @Input() name:string;
  @Input() id:number;
  @Input() information:string;
  @Input() hidden:boolean;
  @Input() list={rows:[],pagination:(<any>Object),sort:(<any>Object),filterParams:(<any>Object), total_count:(<any>Object)};
  @Output() hiddenChange:any=new EventEmitter();
  @ViewChild('popup_reports') elRef:ElementRef;
  _http: Http;
  domain: string;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.elRef.nativeElement.contains(event.target) || event.target.closest('.proffers-correction')) {
    } else {
      this.hidden = true;
      this.hiddenChange.emit(this.hidden);
    }
  }
  constructor(public router:Router,public eRef: ElementRef, public popupReportsService:PopupReportsService,http: Http,domains: Domains) {
    this._http = http;
    this.domain = domains.domain;
  }

  ngOnInit() {
  }
  downloadCsv(uuid){
    window.location.href=this.domain + this.downloadCSV+uuid;
  }
  resend(uuid){
    this._http.get(this.domain + this.resendCSV+uuid)
        .map((res: Response) => {
          return res.json();

        })
        .subscribe(data=>{
        });
  }
  close(){
    this.hidden = true;
    this.hiddenChange.emit(this.hidden);
  }

}
