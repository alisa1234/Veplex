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

  // item_name:string='adveriser';
  item_flag:boolean=false;

  constructor(protected router:Router,http: Http,public route: ActivatedRoute,domains: Domains, public _countrieService: CountriesService, public usersService:UsersService,public formstyler:FormstylerPipe,public location: Location) {
    super(router,http,route,domains,_countrieService,usersService,location);
    this._this=this;
    // this.router.navigate(['/users/add-advertiser']);
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
    })
    
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
          console.log('after',someVar[key]);

        }
      }
      console.log('object',someVar);
      console.log('var',someVar.payment_cycley);
      comp.payment_cycley=someVar.payment_cycley;
      comp.send_over_stats=someVar.send_over_stats;
    });
  }
  ngAfterViewInit(){
    super.ngAfterViewInit();
    // if(typeof this.usersService.usersResult != 'undefined'){
    //   console.log(this.usersService.usersResult)
    //   this.send_over_stats=this.usersService.usersResult.send_over_stats;
    //   this.payment_cycley=this.usersService.usersResult.payment_cycley;
    //   console.log( this.send_over_stats,this.payment_cycley)
    // }
    // 
    setTimeout(function () {
      jQuery('.form_users_select').trigger('refresh');
    },0)
    
  }
  keypress(){
    super.keypress();
  }
  // initStyler(){
  //   super.initStyler();
  // }
  send(item_name:string,module_name:string,formData:FormData=new FormData()){
    console.log('comp',this.item_name)
    let payment_cycley=this.payment_cycley;
    let send_over_stats=this.send_over_stats;
    let company_name=this.company_name;
    let representative_name=this.representative_name;
    
    this.FormDataCreate(formData,{
      payment_cycley:payment_cycley,
      send_over_stats:send_over_stats,
      company_name:company_name,
      representative_name:representative_name
    })
    super.send(this.item_name,this.module_name,formData);
  }
  

}

//  
//   _http: Http;
//   domain: string;
//   url: string;
//   csrf: string;
//   body: any;
//   urlUsersAdvertisersAdd:string;
//
//   result: any;
//   name:string;
//   company_name:string;
//   representative_name:string;
//   email:string;
//   notifications:number=0;
//   address:string;
//   city:string;
//   country:string;
//   zip:string;
//   stats = STATS;
//   days=DAYS;
//   status_arr=STATUS;
//   payment_cycley:string;
//   send_over_stats:string;
//   status:string;
//   repeatPassword:string;
//   password:string;
//   countries:Array<Dictionary>=[];
//   id:number;
//   // country:string;
//
//   someVar:Object;
//   saving_system:boolean=false;
//   flag: boolean = false;
//   countriesLoaded:boolean = false;
//
//   key: any;
//   valid: any;
//
//   constructor(public router:Router,http: Http,domains: Domains, public _countrieService: CountriesService, private usersService:UsersService) {
//     this.router.navigate(['/users/add-advertiser']);
//
//
//     this._http = http;
//     this.url = domains.url;
//     this.domain = domains.domain;
//     this.csrf = domains.csrf;
//     this.urlUsersAdvertisersAdd=domains.urlUsersAdvertisersAdd;
//     this._countrieService = _countrieService;
//     this.countriesLoaded=_countrieService.countriesLoaded;
//     this.usersService=usersService;
//
//     this.payment_cycley=null;
//     this.send_over_stats=null;
//     this.status=null;
//
//     this._http.get(this.domain + this.csrf)
//         .map((res: Response) => {
//           this.body = res.json();
//         })
//         .subscribe(
//             res =>this.result = res
//         );
//     console.log('add',this.usersService.usersResult )
//     if(typeof this.usersService.usersResult != 'undefined'){
//       this.name=this.usersService.usersResult.name;
//       this.address=this.usersService.usersResult.address;
//       this.city=this.usersService.usersResult.city;
//       this.company_name=this.usersService.usersResult.company_name;
//       this.email=this.usersService.usersResult.email;
//       this.password=this.usersService.usersResult.password;
//       this.repeatPassword=this.usersService.usersResult.repeatPassword;
//       this.representative_name=this.usersService.usersResult.representative_name;
//       this.send_over_stats=this.usersService.usersResult.send_over_stats;
//       this.zip=this.usersService.usersResult.zip;
//       this.status=this.usersService.usersResult.status;
//       this.payment_cycley=this.usersService.usersResult.payment_cycley;
//       this.notifications=this.usersService.usersResult.notifications;
//       this.id=this.usersService.usersResult.id;
//       // this.country=this.usersService.usersResult.country;
//     }
//
// 
//   }
//
//   ngOnInit() {
//     this._countrieService.getCountriesService().subscribe((data) => {
//       this.countries = data.countries;
//       let dataAr=[];
//       for(let key in this.countries){
//         dataAr.push({key: key, value: this.countries[key]});
//       }
//       this.countries=dataAr;
//       console.log('countries');
//       console.log(this.countries);
//     
//     });
//    
//    
//     let comp=this;
//     let someVar={payment_cycley:this.payment_cycley,send_over_stats:this.send_over_stats,status:this.status}
//     jQuery('.form_users_select').change(function () {
//
//       let select2=jQuery(this);
//       for(let key in someVar){
//         if(jQuery(this)[0].id==key){
//           someVar[key]=select2[0].value;
//           console.log('after',someVar[key]);
//
//         }
//       }
//       console.log('object',someVar);
//       console.log('var',someVar.payment_cycley);
//       comp.payment_cycley=someVar.payment_cycley;
//       comp.send_over_stats=someVar.send_over_stats;
//       comp.status=someVar.status;
//       console.log('var',comp.payment_cycley,comp.send_over_stats,comp.status);
//     });
//     jQuery('#country').change(function () {
//       let select2=jQuery('#country :selected')[0].id;
//       comp.country=select2;
//       console.log(select2)
//     })
//
//    
//   }
//   ngAfterViewInit(){
//     jQuery('.form_users_select').styler();
//     jQuery('#country').styler();
// }
//   initStyler(){
//     if (this.saving_system === false){
//
//       this.saving_system = true;
//     
//       setTimeout(function(){
//         console.log('fvcv');
//         // let params3 = (<HTMLSelectElement>document.getElementsByName('form_users_select_wr'));
//         // let formAccess = (<HTMLSelectElement[]><any>document.getElementsByClassName('form_offer_access_select'));
//         // jQuery(params3).styler();
//         jQuery('.form_users_select').trigger('refresh');
//         jQuery('#country').trigger('refresh');
//
//       },0);
//       if(typeof this.usersService.usersResult != 'undefined') {
//         for(let i=0;i<this.countries.length;i++){
//           if(this.countries[i].key==this.usersService.usersResult.country){
//             // console.log(this.category_list_search.rows[i].domain);
//             // jQuery('#'+this.category_list_search.rows[i].domain).attr('selected', 'true').trigger("refresh");
//             jQuery('#country #'+this.usersService.usersResult.country).attr('selected', 'true').trigger("refresh");
//           }
//         }
//       }
//   }}
//   keypress(event: any){
//     if(jQuery('.form_offer_btn_ch').hasClass('inactive'))
//     {
//       jQuery('.form_offer_btn_ch ').removeClass('inactive');
//     }
//     if(jQuery('#name').val() === '')
//     {
//       jQuery('.form_offer_btn_ch').addClass('inactive');
//     }
//   }
//   check(){
//     let chbox = <HTMLInputElement>document.getElementById('notifications');
//     console.log(chbox)
//     if(chbox.checked == true){
//       console.log('checked')
//       this.notifications = 1;
//     }else{
//       this.notifications = 0;
//     }
//   }
//   send(){
//     console.log(this.country)
//     if(this.notifications == 1){
//       this.notifications = 1;
//     }else{this.notifications = 0;}
//     console.log('this someVar',this.someVar);
//     console.log('var',this.payment_cycley,this.send_over_stats,this.status);
//     // let formElement = document.querySelector("form");
//     // let formData=new FormData(formElement);
//     let advertisers="AddForm[name]="+this.name
//         +"&AddForm[address]="+this.address
//     +"&AddForm[city]="+this.city
//     +"&AddForm[email]="+this.email
//     +"&AddForm[company_name]="+this.company_name
//     +"&AddForm[representative_name]="+this.representative_name
//     +"&AddForm[zip]="+this.zip
//     +"&AddForm[send_over_stats]="+this.send_over_stats
//     +"&AddForm[payment_cycley]="+this.payment_cycley
//     +"&AddForm[status]="+this.status
//     +"&AddForm[notifications]="+this.notifications
//     +"&AddForm[password]="+this.password
//     +"&AddForm[repeatPassword]="+this.repeatPassword
//     +"&AddForm[country]="+this.country
//         + "&_csrf=" + this.body.csrf;
//     console.log(advertisers)
//
//     let headers=new Headers();
//     headers.append('Content-Type', 'application/x-www-form-urlencoded');
//
//     this._http.post(this.domain + this.urlUsersAdvertisersAdd+(this.id?this.id:''), advertisers, {headers: headers})
//         .map((res: Response)  => {
//           let body = res.json();
//           console.log(body)
//           if(typeof body.validation != 'undefined'){
//             this.valid = body.validation;
//             for(this.key in this.valid){
//               let key = this.key;
//               this.flag = true;
//               jQuery("#" + this.key).parent().append("<span class = 'error' id = 'error" + this.key + "'></span>");
//               jQuery("#"+this.key).parent().append("<span  class = 'Error' id = 'Error" + this.key + "'>" + this.valid[this.key] + "</span>");
//               jQuery("#error" + this.key).mouseenter( function () {
//                 jQuery("#Error" + key).show();
//               }).mouseleave(function () {
//                 jQuery("#Error" + key).hide();
//               })
//             }}else{this.router.navigate(['/users/advertisers-list']);}
//           if(body.validation.length === 0){jQuery('.form_offer_btn_ch').addClass('inactive');}
//         })
//         .subscribe(res => this.result = res);
//
//     jQuery(".Error").remove();
//     jQuery(".error").remove();
//   }
// }
// export interface Dictionary {
//   [ index: string ]: string
// }