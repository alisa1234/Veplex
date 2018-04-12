import { Component, OnInit,AfterViewInit } from '@angular/core';
import {GlobalUsers} from '../global-users';
import { Router, ActivatedRoute } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../domains';
import {CountriesService} from '../../countries.service';
import {UsersService} from '../users.service';
import {FormstylerPipe} from '../../formstyler.pipe';
import {Location} from '@angular/common';
import {UsersBreadcrumbsService} from '../../users-breadcrumbs.service';

declare var jQuery:any;

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss'],
  providers:[FormstylerPipe]
})
export class PublishersComponent extends GlobalUsers implements OnInit,AfterViewInit {
  module_name:string='';
  item_name:string='';
  phone:string='';
  full_name:string='';
  urlGetManagersList:string;
  _this:any;

  offer_ch:boolean;
  offer_ok:boolean;

  managers_list=[];

  publisher_id:number;
  publisher_name:string;
  manager:string='null';
 
  public myModel = '';
  public maskPhone = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  constructor(protected router:Router,http: Http,public route: ActivatedRoute,domains: Domains, public _countrieService: CountriesService, public usersService:UsersService,public location: Location,public usersBreadcrumbsService:UsersBreadcrumbsService) {
    super(router, http,route, domains, _countrieService, usersService,location);
    this.urlGetManagersList = domains.urlGetManagersList;
    this._this = this;
    this.item_name='publisher';
    localStorage.setItem("users_value",  'Add account');
    if(this.route.snapshot.data['name']=='Update '+this.item_name){
  
      this.route.snapshot.data['breadcrumb']='Update '+this.item_name;
    }

    this._http.get(this.domain + this.urlGetManagersList)
        .map((res:Response)=> {
          return res.json();
        })
        .subscribe(data => {
          
          this.managers_list = data.rows;
          this.managers_list.unshift({'id':'null','name':'Manager'});
        });
   
    this.usersService.eventEmitters.subscribe(item=>{
    
      this.full_name = item.full_name;
      this.module_name = this.usersService.module_name;
      this.item_name = this.usersService.item_name;
      this.phone = item.phone;
      this.manager=item.am_id;
      localStorage.setItem("users_value",  'Update publisher');
    
    
    });
      this.item_name='publisher';
      this.module_name='publishers';
  }
  ngOnInit() {
    super.ngOnInit();
  }
  ngAfterViewInit(){
    super.ngAfterViewInit();
  }
  send(formData:FormData=new FormData()){
    let full_name=this.full_name;
    let phone=this.phone;
    let am_id=this.manager;
    

    this.FormDataCreate(formData,{
      full_name:full_name,
      phone:phone,
      am_id:am_id
    })
    super.send(this.item_name,this.module_name,formData)
  }

}
