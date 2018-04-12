import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../domains';
import {CountriesService} from '../../countries.service';
import {UsersService} from '../users.service';
import {GlobalUsers} from '../global-users';
import {Stats} from '../global-users';
import {FormstylerPipe} from '../../formstyler.pipe';
import {Location} from '@angular/common';

declare var jQuery:any;



export class Days{
  key: string;
  value: string;
}

const STATS: Stats[] = [
  {key: 1, value: 'on 1st day'},
  {key: 2, value: 'on 2nd day'},
  {key: 3, value: 'on 3rd day'},
  {key: 4, value: 'on 4th day'},
  {key: 5, value: 'on 5th day'},
  {key: 6, value: 'on 6th day'},
  {key: 7, value: 'on 7th day'},
  {key: 8, value: 'on 8th day'},
  {key: 9, value: 'on 9th day'},
  {key: 10,value: 'on 10th day'},
  {key: 11,value: 'on 11th day'},
  {key: 12,value: 'on 12th day'},
  {key: 13,value: 'on 13th day'},
  {key: 14,value: 'on 14th day'},
  {key: 15,value: 'on 15th day'}
];
const DAYS:Days[]=[
  {key:'d',value:'Daily'},
  {key:'w',value:'Weekly'},
  {key:'sm',value:'Semi-monthly'},
  {key:'m',value:'Monthly'},
];

@Component({
  selector: 'app-advertiser',
  templateUrl: './advertiser.component.html',
  styleUrls: ['./advertiser.component.scss'],
  providers:[FormstylerPipe]
})
export class AdvertiserComponent extends GlobalUsers implements OnInit,AfterViewInit{

  stats =[{'value': 'null', 'name': 'Send over invoice'},{'value': 1, 'name': 'on 1st day'},
    {'value': '2', 'name': 'on 2nd day'},
    {'value': '3', 'name': 'on 3rd day'},
    {'value': '4', 'name': 'on 4th day'},
    {'value': '5', 'name': 'on 5th day'},
    {'value': '6', 'name': 'on 6th day'},
    {'value': '7', 'name': 'on 7th day'},
    {'value': '8', 'name': 'on 8th day'},
    {'value': '9', 'name': 'on 9th day'},
    {'value': '10','name': 'on 10th day'},
    {'value': '11','name': 'on 11th day'},
    {'value': '12','name': 'on 12th day'},
    {'value': '13','name': 'on 13th day'},
    {'value': '14','name': 'on 14th day'},
    {'value': '15','name': 'on 15th day'}];
  days=[ {'value':'null','name':'Invoicing cycle'},{'value':'d','name':'Daily'},
    {'value':'w','name':'Weekly'},
    {'value':'sm','name':'Semi-monthly'},
    {'value':'m','name':'Monthly'}];
  
  company_name:string=null;
  representative_name:string=null;
  payment_cycley:string='null';
  send_over_stats:string='null';
  module_name:string;
  _this:any;

  offer_ch:boolean;
  offer_ok:boolean;
  item_flag:boolean=false;

  constructor(protected router:Router,http: Http,public route: ActivatedRoute,domains: Domains, public _countrieService: CountriesService, public usersService:UsersService,public formstyler:FormstylerPipe,public location: Location) {
    super(router,http,route,domains,_countrieService,usersService,location);
    this._this=this;
    this.payment_cycley=null;
    this.send_over_stats=null;
this.item_name='advertiser';
    localStorage.setItem("users_value", 'Add account');
    if(this.route.snapshot.data['name']=='Update '+this.item_name){
  
      this.route.snapshot.data['breadcrumb']='Update '+this.item_name;
    }
    this.usersService.eventEmitters.subscribe(item=>{
      this.company_name=item.company_name;
      this.representative_name=item.representative_name;
      this.send_over_stats=item.send_over_stats;
      this.payment_cycley=item.payment_cycley;
      this.item_name=item.item_name;
      this.module_name=this.usersService.module_name;
      this.item_name=this.usersService.item_name;
      localStorage.setItem("users_value", 'Update advertiser');
    });
    
      this.item_name='advertiser';
      this.module_name='usersa';
  }
  
  ngOnInit(){
    super.ngOnInit();
    let comp=this;
    let someVar={payment_cycley:this.payment_cycley,send_over_stats:this.send_over_stats}
    jQuery('.form_users_select').change(function () {

      let select2=jQuery(this);
      for(let key in someVar){
        if(jQuery(this)[0].id==key){
          someVar[key]=select2[0].value;

        }
      }
      comp.payment_cycley=someVar.payment_cycley;
      comp.send_over_stats=someVar.send_over_stats;
    });
  }
  ngAfterViewInit(){
    super.ngAfterViewInit();
    setTimeout(function () {
      jQuery('.form_users_select').trigger('refresh');
    },0)
    
  }
  keypress(){
    super.keypress();
  }
  send(item_name:string,module_name:string,formData:FormData=new FormData()){
    let payment_cycley=this.payment_cycley;
    let send_over_stats=this.send_over_stats;
    let company_name=this.company_name;
    let representative_name=this.representative_name;
    
    this.FormDataCreate(formData,{
      payment_cycley:payment_cycley,
      send_over_stats:send_over_stats,
      company_name:company_name,
      representative_name:representative_name
    });
    super.send(this.item_name,this.module_name,formData);
  }
  

}