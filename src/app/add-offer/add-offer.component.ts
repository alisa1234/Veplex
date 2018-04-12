import { Component,  OnInit } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../domains';
import {RenderOffer} from './render-offer';
import {GlobalLogin} from '../global-login';
import {Location} from '@angular/common';
import {OfferTypeService} from '../offerType.service';

declare var jQuery:any;

export class Dictionary{
  name: string;
  value: string;
}
export class Types{
    key:number;
    value:string;
}
const TYPES:Types[]=[
    {key:1,value:'CPA'},
    {key:2,value:'CPC'},
    {key:3,value:'DCPA'},
    {key:4,value:'Fallback'}
];

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
  providers:[Domains],

})
export class AddOfferComponent implements OnInit{
    result: any;
    _http: Http;
    urlGetOfferType:string;
    domain: string;
    url: string;
    csrf: string;
    body: any;
    offersType={availableTypes:Dictionary};
    offerKeys=[];
    offerValues=[];
    offer_value:string;
    restore:any;
    offerResult:any;
    item_name:string;
    type=TYPES;
render_offer_results:any;
    saving_system:boolean=false;
    typeOffer:{[index:string]:boolean}={};
    btnFlag:boolean=false;
    offer_ch:boolean;
    offer_ok:boolean;
    id='';
    // offer_id:string='';
    value='';
    tittle:string;
    tittle_id:string;
    tittle_name:string;
offer_id:string;
    offer_name:string='';
    types_values=[];
    last:boolean=false;

    constructor(public router:Router,http: Http,public route: ActivatedRoute,domains: Domains,public renderOffer:RenderOffer,public location: Location, public offerTypeService:OfferTypeService, public globalLogin:GlobalLogin){
      
        this._http = http;
        this.domain = domains.domain;
        this.urlGetOfferType=domains.urlGetOfferType;
        this.csrf = domains.csrf;
       this.item_name='offer';
        
        this.typeOffer['1']=false;
        this.typeOffer['2']=false;
        this.typeOffer['3']=false;
        this.typeOffer['4']=false;

        this.offer_ch=false;
        this.offer_ok=true;
        this.tittle='Add Offer';
        this.tittle_id='';
        this.tittle_name='';
        localStorage.setItem("offer_value",  this.tittle);
        this.offer_id=localStorage.getItem("offer_id");
        this.offer_name=localStorage.getItem("offer_name");
        this.renderOffer=renderOffer;
        this.offer_value='choose_type';
        
        if(this.route.snapshot.data['name']=='Update '+this.item_name){

            this.route.snapshot.data['breadcrumb']='Update '+this.offer_name;
        }
        this._http.get(this.domain + this.csrf)
            .map((res: Response) => {
                this.body = res.json();
            })
            .subscribe(
                res =>this.result = res
             
            );
        this.offerTypeService.getTypeOfferService().subscribe(data=>{
           
           this.offersType.availableTypes=data.availableTypes;

            this.offerKeys = Object.keys(data.availableTypes);
            this.offerKeys=Object.keys(this.offersType.availableTypes);
            for(let key in this.offersType.availableTypes){
                this.offerValues.push(this.offersType.availableTypes[key])
               
            }
            this.types_values.push({'id':'choose_type','title':'Choose type'});
            for (let i=0;i<this.offerValues.length;i++){
                this.types_values.push({'title':this.offerValues[i],'id':this.offerKeys[i]});
                this.offer_value='choose_type';
             this.last=true;
            }
           
        },
            (err) => {
                let error=err.json();
                if(error.logged==false){
                    this.router.navigate(['/']);
                    let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb',current_breadcrumb);
                    localStorage.setItem('current_url',this.router.url);
                    this.globalLogin.serverTime=false;
                    this.globalLogin.role=null;
                }


            });
                this.renderOffer.eventEmitters.subscribe(item=> {
               
                localStorage.setItem("offer_value", 'Update offer');
            
                this.render_offer_results = item.offer;
                    
                this.offersType.availableTypes = item.availableTypes;
                    this.offer_value=item.offer.type;

                for (let key in this.typeOffer) {
                    this.typeOffer[key] = false;
                    this.typeOffer[item.offer.type] = true;
                }
                this.location.replaceState("/offer/offer-list/update/"+this.offer_id);
                this.offer_ch = true;
                this.offer_ok = false;
                })

    }
  ngOnInit(){
      if(this.offer_id != null){
      this.route
          .params
          .subscribe(params => {
              
              this.offer_id = params['id'];
            
              this.renderOffer.renderUpdate(this.offer_id);
             
          });
      }
}
    initStyler(){
        if (this.saving_system === false){

            this.saving_system = true;
        }
    }
    changeSelect(){
       
            for(let key in this.typeOffer){
                this.typeOffer[key]=false;
                this.typeOffer[this.offer_value]=true;
            }
        
        this.btnFlag=true;
    }
}

