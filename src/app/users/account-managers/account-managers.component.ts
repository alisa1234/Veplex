import { Component, OnInit,AfterViewInit,ViewChild  } from '@angular/core';
import {GlobalUsers} from '../global-users';
import { Router,ActivatedRoute } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../../domains';
import {CountriesService} from '../../countries.service';
import {UsersService} from '../users.service';
import {Location} from '@angular/common';

declare var jQuery:any;

export class Types{

  key:string;
  value:boolean;
}

@Component({
  selector: 'app-account-managers',
  templateUrl: './account-managers.component.html',
  styleUrls: ['./account-managers.component.scss']
})
export class AccountManagersComponent extends GlobalUsers implements OnInit {
  variables={id:[],value:[]};
  bonus_publishers:string;
  bonus_advertisers:string;
  company_name:string;

  permission_statistics:number=0;
  permission_users:number=0;
  permission_offers:number=0;
  permission_settings:number=0;

  permission_payments_advertisers:number=0;
  permission_payments_publishers:number=0;
  
  permission_settings_customization:number=0;
  permission_settings_companys_profile:number=0;
  permission_settings_billing_info:number=0;
  permission_settings_payments:number=0;
  permission_settings_system:number=0;
  permission_settings_faq:number=0;

  permission_assign_statistics:number=0;
  permission_assign_users:number=0;
  permission_assign_offers:number=0;
  permission_assign_payments_advertisers:number=0;
  permission_assign_payments_publishers:number=0;

  offer_ch:boolean;
  offer_ok:boolean;
  
  premissions=[];
  premissions_value:Types[]=[];
  list:any;
  premissions_arr:{[index:string]:boolean}={};

  constructor(protected router:Router,http: Http,public route: ActivatedRoute,domains: Domains, public _countrieService: CountriesService, public usersService:UsersService,public location: Location) {
    super(router,http,route,domains,_countrieService,usersService,location);
    this._this=this;
    this.item_name='accountmanager';
    
    this.premissions_arr['permission_users']=false;
    this.premissions_arr['permission_offers']=false;
    this.premissions_arr['permission_settings']=false;
    this.premissions_arr['permission_payments_advertisers']=false;
    this.premissions_arr['permission_payments_publishers']=false;
    this.premissions_arr['permission_statistics']=false;
    if(this.route.snapshot.data['name']=='Update '+this.item_name){
   
      this.route.snapshot.data['breadcrumb']='Update account manager';
    }
    localStorage.setItem("users_value",  'Add account');
    this.usersService.eventEmitters.subscribe(item=>{
   this.list=item;
      this.permission_statistics=item.permission_statistics;
      this.permission_users=item.permission_users;
      this.permission_offers=item.permission_offers;
      this.permission_settings=item.permission_settings;
      this.permission_payments_advertisers=item.permission_payments_advertisers;
      this.permission_payments_publishers=item.permission_payments_publishers;
      this.permission_settings_customization=item.permission_settings_customization;
      this.permission_settings_companys_profile=item.permission_settings_companys_profile;
      this.permission_settings_billing_info=item.permission_settings_billing_info;
      this.permission_settings_payments=item.permission_settings_payments;
      this.permission_settings_system=item.permission_settings_system;
      this.permission_settings_faq=item.permission_settings_faq;
      this.permission_assign_statistics=item.permission_assign_statistics;
      this.permission_assign_users=item.permission_assign_users;
      this.permission_assign_offers=item.permission_assign_offers;
      this.permission_assign_payments_advertisers=item.permission_assign_payments_advertisers;
      this.permission_assign_payments_publishers=item.permission_assign_payments_publishers;
      this.company_name=item.company_name;
      this.bonus_publishers=item.bonus_publishers;
      this.bonus_advertisers=item.bonus_advertisers;


      localStorage.setItem("users_value",  'Update account manager');
    
      for(let key in this.premissions_arr){
        if(item[key]==1){
          this.premissions_arr[key]=true;
          jQuery('.'+ key).attr('disabled',false);
        }
 

      }

    
    });
   
      this.item_name='accountmanager';
      this.module_name='accountmanagers';
 

  }

  ngOnInit() {

    super.ngOnInit();
   



  }
  ngAfterViewInit(){

  
    jQuery('.form_users_check_subs input[type=checkbox]').attr('disabled',true);
    super.ngAfterViewInit();
    setTimeout(function () {
      jQuery('.form_users_select').trigger('refresh');
     
    },0);
  }
  checking(id){
 
    for(let key in this.premissions_arr){
     
      if(this.premissions_arr[key]==true){
     
        if(key==id){
        
          this.premissions_arr[key]=false;
          jQuery('.'+ key).attr('disabled',true);
       
        }
        
      }else{
        if(key==id){
        
          this.premissions_arr[key]=true;
          jQuery('.'+ key).attr('disabled',false);
         
        }
      }
     
    }

    let someVar=jQuery('.form_users_check_item input[type=checkbox]');
    for(let i=0;i<someVar.length;i++){
      this.variables.id[i]=someVar[i].id;
      this.variables.value[i]=someVar[i].checked;
    }
    
  }
  send(formData2:FormData=new FormData()){
    for(let i=0;i<this.variables.value.length;i++){

      if(this.variables.value[i]==1){
        this.variables.value[i]='1';
      }else{
        this.variables.value[i]='0'
      }
    }
  
    
    
    let bonus_publishers=this.bonus_publishers;
    let bonus_advertisers=this.bonus_advertisers;
    let email=this.email;
    let company_name=this.company_name;
    let name=this.name;
    let status=this.status;
    let password=this.password;
    let repeatPassword=this.repeatPassword;
    let csrf=this.body.csrf;
    formData2.append("_csrf",csrf);
    this.FormDataCreateManagers(formData2,{
     
      bonus_publishers:bonus_publishers,
      bonus_advertisers:bonus_advertisers,
      email:email,
      company_name:company_name,
      name:name,
      password:password,
      repeatPassword:repeatPassword,
      status:status
    },this.variables.id,this.variables.value);
    super.send(this.item_name,this.module_name,formData2)
  }
}
