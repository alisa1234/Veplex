import { Component, OnInit,AfterViewInit } from '@angular/core';
import {GlobalUsers} from '../global-users';
import { Router,ActivatedRoute } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../domains';
import {CountriesService} from '../../countries.service';
import {UsersService} from '../users.service';
import {FormstylerPipe} from '../../formstyler.pipe';
import {Location} from '@angular/common';

declare var jQuery:any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers:[FormstylerPipe]
})
export class AdminComponent extends GlobalUsers implements OnInit,AfterViewInit {
  _this:any;
  company_name:string;
  module_name:string;
  item_name:string;
  phone:string;

  offer_ch:boolean;
  offer_ok:boolean;
  
    public myModel = '';
    public maskPhone = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor(protected router:Router,http: Http,public route: ActivatedRoute,domains: Domains, public _countrieService: CountriesService, public usersService:UsersService,public formstyler:FormstylerPipe,public location: Location) {
    super(router,http,route,domains,_countrieService,usersService,location);
    this._this=this;
      this.item_name='admin';
      localStorage.setItem("users_value",  'Add admin');
      if(this.route.snapshot.data['name']=='Update '+this.item_name){
       
        this.route.snapshot.data['breadcrumb']='Update '+this.item_name;
      }
      this.usersService.eventEmitters.subscribe(item=>{
        this.company_name=item.company_name;
        this.module_name=this.usersService.module_name;
        this.item_name=this.usersService.item_name;
        this.phone=item.phone;
        localStorage.setItem("users_value",  'Update admin');
      })
      
      this.item_name='admin';
      this.module_name='users/admins';
    
  }

  ngOnInit() {
   super.ngOnInit();
  }
ngAfterViewInit(){
  super.ngAfterViewInit();
  setTimeout(function () {
    jQuery('.form_users_select').trigger('refresh');
  },0)

}
  send(formData:FormData=new FormData()){
let company_name=this.company_name;
let phone=this.phone;

    this.FormDataCreate(formData,{
      company_name:company_name,
      phone:phone
    })
    super.send(this.item_name,this.module_name,formData)
  }
  sendOk(){
    super.sendOk();
  }
}
