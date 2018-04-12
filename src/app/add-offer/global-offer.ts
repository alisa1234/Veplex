/**
 * Created by Алиска on 17.02.2017.
 */
import { Component,  AfterViewInit,ViewChild,OnInit, ElementRef,Pipe,PipeTransform,DoCheck,EventEmitter} from '@angular/core';
import { Router} from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import {Domains} from '../domains';
import {CountriesService} from '../countries.service';
import {OfferListComponent} from './offer-list/offer-list.component';
import {AddOfferComponent} from './add-offer.component';
import {RenderOffer} from './render-offer';
import {CheckboxTableService} from "../checkbox-table/checkbox-table.service";
import {InitChosen} from '../initChosen';
import {GlobalLogin} from '../global-login';
declare var jQuery:any;


@Component({
    template:''
})
export class GlobalOffer implements OnInit{
    @ViewChild ('banner_upload')  upload_banner_file;
    @ViewChild ('screenshot_upload') upload_screenshot_file;
    @ViewChild ('countrie_chosen') countrie_chosen;
    @ViewChild ('geo_div') geo_div;
    @ViewChild ('status_value') status_value;
    @ViewChild ('domain_value') domain_value;
    @ViewChild ('offer_access') offer_access;
    result: any;
    _http: Http;
    urlCountries: string;
    urlSaveSystem:string;
    urlAddOffer:string;
    urlGetOfferType:string;
    urlGetUpdate:string;
    urlGetsAdvertisersList:string;
    domain: string;
    url: string;
    csrf: string;
    body: any;
    categories:string;
    deleteCategories:string;
    addCategories:string;
    category_list={rows: [], status: ""};
    category_list_search={rows: [], status: ""};
    saveSystem={data:(<any>Object)};
    saving_system:boolean=false;

    offer_value:string;
    name:string;
    category_id:string;
    category_id_send:string;
    enabled_value:any='null';
    access_value:any='null';
    cpa:number;
    rpa:number;
    pics:File[]=[];
    pic:File;
    pics_name:string []=[];
    banners:File[]=[];
    banner:File;
    banner_name:string []=[];

    ip_whitelist:string;
    ips:string[]=[];
    transaction_life:number;
    profferLinks:any[];
    profferLink:any[]=[];
    url1:string;
    url2:string;
    url3:string;
    share1:string;
    share2:string;
    share3:string;
    auto_optimization:number=0;
    countr=[];
    countries:Array<Dictionary>=[];
    user_id:string;
    countrie_value:string;
    domains:string='tracking_domain';
    country_value:string;
    file_screenshot:string;
    file_banner:string;
    offer_id:number;

    chosenReady:boolean=false;
    offer_ch:boolean;
    offer_ok:boolean;
    tittle:string;


    urls={url:[],share:[]};
    valid: any;
    key: any;
    flags:any[]=['form_offer_browse-screenshot','form_offer_browse-banner'];
    types=['1','2','3','4'];

    loading = false;
    flag:boolean = false;
    countriesLoaded:boolean = false;

    flag_banners:boolean=false;
    flag_pics:boolean=false;
    flag_func_banner:boolean=false;
    flag_func_pics:boolean=false;
    category_flag:boolean=false;

    some:string[];
    private value:any = '';
    private values=[];
    private access_values=[{'value':'null','name':'Offer access*'},{'value':'1','name':'Public'},{'value':'0','name':'Private'}];
    private enabledes_values=[{'value':'null','name':'Offer status*'},{'value':'1','name':'Active'},{'value':'0','name':'Disabled'}];
    
    disabled:boolean=false;
    
    domains_arr=[];
    id_select:string;

    name_for_listening:string;
    choose_domain:boolean=false;
    flag_for_listener_banner:boolean=false;
    domains_loaded:boolean=false;

    item_list:any;
    public myModel = '';
    public maskIp = [ /^([1-2])/,/([0-5])/,/([0-9]){1,3}/,'.',/^([1-2])/,/([0-5])/,/([0-9])/,'.',/^([1-2])/,/([0-5])/,/([0-9])$/];
    eventEmitter$:EventEmitter<any>;
    constructor(public router:Router,http: Http,domains: Domains, public _countrieService: CountriesService, public addOffer:AddOfferComponent,public renderOffer:RenderOffer,public initChosen:InitChosen, public checkboxTableService:CheckboxTableService, public globalLogin:GlobalLogin) {

        this._http = http;
        this.domain = domains.domain;
        this.urlCountries = domains.countries;
        this.urlSaveSystem=domains.urlSaveSystem;
        this.urlAddOffer=domains.urlAddOffer;
        this.urlGetOfferType=domains.urlGetOfferType;
        this.urlGetUpdate=domains.urlGetUpdate;
        this.urlGetsAdvertisersList=domains.urlGetsAdvertisersList;
        this.csrf = domains.csrf;
        this.categories=domains.categories;
        this.addCategories=domains.addCategories;
        this.deleteCategories=domains.deleteCategories;
        this._countrieService = _countrieService;
        this.countriesLoaded=_countrieService.countriesLoaded;
        this.addOffer=addOffer;
        this.renderOffer=renderOffer;
        this.offer_ch=addOffer.offer_ch;
        this.offer_ok=addOffer.offer_ok;
        this.eventEmitter$=new EventEmitter();
        let result: any;
        this.access_value=null;
        this.enabled_value=null;
    this.values=[];

        this._http.get(this.domain + this.csrf)
            .map((res: Response) => {
                this.body = res.json();
            })
            .subscribe(
                res =>this.result = res
            );

        this._http.get(this.domain + this.categories)
            .map((res: Response) => {
                return res.json();
            }).subscribe(data=>{
            this.category_list = data;
            this.category_list_search.rows = data.rows;

            if(typeof this.addOffer.render_offer_results != 'undefined') {
                
                for(let i=0;i<this.category_list_search.rows.length;i++) {
                    if (this.category_list_search.rows[i].id == this.addOffer.render_offer_results.category_id) {
                        this.category_id = this.category_list_search.rows[i].title;
                        this.category_id_send=this.category_list_search.rows[i].id;
                        this.domains=this.category_list_search.rows[i].domain;
                    }
                }
            }
        });

        this._http.get(this.domain + this.urlSaveSystem)
            .map((res: Response) => {
                return res.json();
            }).subscribe(data=>{
            this.saveSystem.data=data.data;
            this.domains_arr.unshift({'domain':'tracking_domain','title':'Tracking domain'});
            for(let i=0;i<this.saveSystem.data.tracking_domain.length;i++){
                this.domains_arr.push({'domain':this.saveSystem.data.tracking_domain[i],'title':this.saveSystem.data.tracking_domain[i]})
                this.domains_loaded=true;
         
            }
           
        });

        this._http.get(this.domain + this.urlGetsAdvertisersList)
            .map((res: Response) => {
                return res.json();
            }).subscribe(data=>{
            this.values=data.rows;
            this.value='32';
           
           
        });
 
        if(typeof this.addOffer.render_offer_results != 'undefined'){
            
            this.item_list=this.addOffer.render_offer_results;
            this.name=this.addOffer.render_offer_results.name;
            this.cpa=this.addOffer.render_offer_results.cpa;
            this.rpa=this.addOffer.render_offer_results.rpa;
            this.urlAddOffer=this.urlGetUpdate;
            this.offer_id=this.addOffer.render_offer_results.id;
            this.access_value=this.addOffer.render_offer_results.access;
            this.addOffer.tittle='Update Offer';
            this.addOffer.tittle_id='ID'+this.addOffer.render_offer_results.id;
            this.addOffer.tittle_name=this.addOffer.render_offer_results.name;
            this.disabled=true;
            this.value=this.addOffer.render_offer_results.user_id;
            if(this.addOffer.render_offer_results.pics !=null){
                for(let i=0;i<this.addOffer.render_offer_results.pics.length;i++){
                    this.pics_name.push(this.addOffer.render_offer_results.pics[i])
                  
                }
            }
            if(this.addOffer.render_offer_results.banners !=null){
                for(let i=0;i<this.addOffer.render_offer_results.banners.length;i++){
                    this.banner_name.push(this.addOffer.render_offer_results.banners[i])
                   
                }
            }
            for(let i=0;i<this.addOffer.render_offer_results.countries.length;i++){
                this.countr.push(this.addOffer.render_offer_results.countries[i]);
            }

        }
    }
   
    ngOnInit(){
        this.id_select='domains';
        jQuery( "#domains option[value!='tracking_domain']" ).attr('disabled', 'disabled');
        
       
        let self=this;
        this._countrieService.eventEmitter$.subscribe((data) => {
            this.countries = data.countries;
            let dataAr=[];
            for(let key in this.countries){
                dataAr.push({key: key, value: this.countries[key]});
            }
            this.countries=dataAr;

        });

        if(typeof this.addOffer.render_offer_results != 'undefined') {

            if(this.addOffer.render_offer_results.ip_whitelist != null) {
                for (let i = 0; i < this.addOffer.render_offer_results.ip_whitelist.length; i++) {
                    this.ips.push(this.addOffer.render_offer_results.ip_whitelist[i])
                    jQuery('#form_offer_access-whitelist').parent('li').append("<div class='form_offer_access' id='" + this.addOffer.render_offer_results.ip_whitelist[i] + "'><span class='wr_inpt'><input type='hidden' value='x'><span class='fon_inpt1'>" + this.addOffer.render_offer_results.ip_whitelist[i] + "<a class='form_offer_browse_file_close' id='" + this.addOffer.render_offer_results.ip_whitelist[i] + "'></a></span></span> </div>");
                    this.addHtml(this.addOffer.render_offer_results.ip_whitelist[i],this.addOffer.render_offer_results.ip_whitelist[i]);
                }
            }else{this.ip_whitelist="fddd"}

            for (let i = 0; i < this.addOffer.render_offer_results.offerLinks.length; i++) {
                this.urls.url.push(this.addOffer.render_offer_results.offerLinks[i].url);
                this.urls.share.push(this.addOffer.render_offer_results.offerLinks[i].share);
            }
            for (let i = 0; i < this.urls.url.length; i++) {
                for (let y = 0; y < this.urls.share.length; y++) {
                    this.url1 = this.urls.url[0];
                    this.url2 = this.urls.url[1];
                    this.url3 = this.urls.url[2];

                    this.share1 = this.urls.share[0];
                    this.share2 = this.urls.share[1];
                    this.share3 = this.urls.share[2];
                }

            }
            if (this.addOffer.render_offer_results.access == 1) {
                this.access_value = 1;
            }
            if (this.addOffer.render_offer_results.access == 2) {
                this.access_value = 2;
            }
            if(this.addOffer.render_offer_results.status==true){
                this.enabled_value=1;
            }
            if(this.addOffer.render_offer_results.status==false){
                this.enabled_value=0;
            }

            if (this.addOffer.render_offer_results.auto_optimization == 1) {

                this.auto_optimization=1;

                let input = jQuery('.cr1').children('input');

                for (let i = 0; i < input.length; i++) {

                    input[i].value = '33%';
                    this.share1 = input[0].value;
                    this.share2 = input[1].value;
                    this.share3 = input[2].value;
                    jQuery(input[i]).attr('disabled', 'disabled');
                }
            } else {
                let chbox = <HTMLInputElement>document.getElementById('auto_optimization');

                let input = jQuery('.cr1').children('input');
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                    this.share1 = input[0].value;
                    this.share2 = input[1].value;
                    this.share3 = input[2].value;
                    jQuery(input[i]).removeAttr('disabled', 'disabled');
                }
            }
            if(this.addOffer.render_offer_results.banners && this.addOffer.render_offer_results.pics != null){
                for(let i=0;i<this.addOffer.render_offer_results.banners.length;i++){
                    jQuery("#form_offer_banner_upload").before("<div id='a"+this.addOffer.render_offer_results.banners[i]+"' class='form_offer_browse_file'><span class='form_offer_browse_file_na me'>"+this.addOffer.render_offer_results.banners[i]+"</span><a id='a"+this.addOffer.render_offer_results.banners[i]+"' class='form_offer_browse_file_close' ></a></div>");
           

                        this.addHtml('a'+this.addOffer.render_offer_results.banners[i],this.addOffer.render_offer_results.banners[i]);
                   
                    
                }
                for(let i=0;i<this.addOffer.render_offer_results.pics.length;i++){
                    jQuery("#form_offer_screenshot_upload").before("<div id='b"+this.addOffer.render_offer_results.pics[i]+"' class='form_offer_browse_file'><span class='form_offer_browse_file_na me'>"+this.addOffer.render_offer_results.pics[i]+"</span><a id='b"+this.addOffer.render_offer_results.pics[i]+"' class='form_offer_browse_file_close' ></a></div>");
                  

                        this.addHtml('b'+this.addOffer.render_offer_results.pics[i],this.addOffer.render_offer_results.pics[i]);
                  
                    
                }
            }else{this.file_banner="";this.file_screenshot=""}

        }
        jQuery('.form_offer_access_select').change(function () {
            if(self.offer_ch==true)
            {
                self.offer_ch=false;
                self.offer_ok=true;
            }
        })

    }

    getDomain(domain){
        this.domains=domain;
       
        if(this.offer_ch==true)
        {
            this.offer_ch=false;
            this.offer_ok=true;
        }
    }

    selectChange() {
        jQuery("#countries").chosen().change( function () {
            let select=jQuery(this).children(":selected");
            let countr=[];
            for(let i=0;i<select.length;i++){
                countr.push(select[i].id);
            }
            this.countr=countr;
        });
    }
    categoryflag(){
        this.category_flag=true;
    }
    searchCategory(e){
        
        let search_value=e.target.value;

        let regV= new RegExp(search_value,"i");
        if(search_value==''){
            this.choose_domain=false;
            this.category_list_search.rows=this.category_list.rows;
            this.domains='tracking_domain';
            return this.category_list_search.rows;
        }

        let res = false;
        this.category_list_search = {rows: [], status: "ok"};
        for(let i=0;i<this.category_list.rows.length;i++){

            res = regV.test(this.category_list.rows[i].title);
            if(res){
                this.category_list_search.rows.push({title: this.category_list.rows[i].title, domain: this.category_list.rows[i].domain, id: this.category_list.rows[i].id});

                this.choose_domain=false;
                for(let y=0;y<this.category_list_search.rows.length;y++){
                    if(this.category_id==this.category_list_search.rows[y].title)
                      this.category_id_send=this.category_list_search.rows[y].id;
                       this.domains=this.category_list_search.rows[y].domain;
                    
                }
                
            }
        }

        if (this.category_list_search.rows.length == 0){
            this.domains = 'tracking_domain';
            this.choose_domain=true;
        }
    }
    addCategory(){
        let category="Category[title]="+this.category_id+"&Category[domain]="+this.domains+ "&_csrf=" + this.body.csrf;
       
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this._http.post(this.domain + this.addCategories, category,{headers: headers})
            .map((res: Response) => {
                return res.json();
            }).subscribe(
            res => {this.result = res;

        if(typeof this.result.validation.length==='undefined'){
            
            let flag:boolean=false;
            for(let key in this.result.validation){
                flag=true;
                
                jQuery("#domains").parent().append("<span class='error' id='error"+key+"'></span>");
                jQuery("#domains").parent().append("<span  class='Error' id='Error"+key+"'>"+this.result.validation[key]+"</span>");
              
                jQuery("#error"+key).css('right','-61px');
                jQuery("#Error"+key).css('left','346px');
                jQuery("#error"+key).mouseenter( function () {
                    jQuery("#Error"+key).show();
                }).mouseleave(function () {
                    jQuery("#Error"+key).hide();
                })
            }

        }
                if(this.result.save=='ok'){
                    this._http.get(this.domain + this.categories)
                        .map((res: Response) => {
                            return res.json();
                        }).subscribe(data=>{this.category_list = data;
                        this.category_list_search = data;
                        for(let i=0;i<this.category_list_search.rows.length;i++){
                            if(this.category_id==this.category_list_search.rows[i].title){
                                this.category_id_send=this.category_list_search.rows[i].id;
                            }
                        }

                    });
                    this.choose_domain=false;
                }
        if(this.result.saved=="ok") {
            this.offer_ok = false;
            this.offer_ch = true;
        }
    
    },
            (err) => {
                let error=err.json();
                if(error.logged==false){
                    this.router.navigate(['/']);
                    localStorage.setItem('current_url',this.router.url);
                  
                    let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb',current_breadcrumb);
                    this.globalLogin.serverTime=false;
                    this.globalLogin.role=null;
                }


            });
        jQuery(".Error").remove();
        jQuery(".error").remove();
     
    }
    deleteCategory(e){
        let parentId=e.target.parentNode.parentNode.id;
     
        for(let i=0;i<this.category_list_search.rows.length;i++)
        {
            if(parentId == this.category_list_search.rows[i].id){
                this.category_list_search.rows.splice(i,1);
                this._http.get(this.domain + this.deleteCategories+parentId)
                    .map((res: Response) => {
                        return res.json();
                    }).subscribe(data=>{let res = data},
                    (err) => {
                        let error=err.json();
                        if(error.logged==false){
                            this.router.navigate(['/']);
                            localStorage.setItem('current_url',this.router.url);
                           
                            let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                            localStorage.setItem('current_breadcrumb',current_breadcrumb);
                            this.globalLogin.serverTime=false;
                            this.globalLogin.role=null;
                        }


                    });
                break;
            }
        }
    }
    selectTable(id){
        this.choose_domain=false;
   
        let parentId=id;
        for(let i=0;i<this.category_list_search.rows.length;i++){
            if(parentId==this.category_list_search.rows[i].id){
                this.category_id_send=this.category_list_search.rows[i].id;
                this.category_id=this.category_list_search.rows[i].title;
              
                jQuery("#category_id")[0].value=this.category_list_search.rows[i].title;
               
                this.domains=this.category_list_search.rows[i].domain;
              
                
                
            }
        }
    }
    ngAfterViewInit() {
        jQuery( "#domains option[value!='tracking_domain']" ).attr('disabled', 'disabled');
        jQuery('.js-form_offer_category .form_offer_category_data').click(function(){
            if(!jQuery(this).parents('.form_offer_category').hasClass('add')){
                jQuery(this).parents('.form_offer_category').addClass('add');
                jQuery('.js-form_offer_category .form_offer_category_drop_head>table').width(jQuery('.js-form_offer_category .form_offer_category_drop_body>table').outerWidth(true));//при изменении таблицы надо мерезапускать
            }
            else{
                jQuery(this).parents('.form_offer_category').removeClass('add');
            }
        });
        jQuery('.form_offer_category_drop_head .col1').click(function () {
            if(!jQuery('.col1').hasClass('add')){
                jQuery('.col1').addClass('add');

                jQuery('.form_offer_category_drop_body').css('display','block');

            }else {
                jQuery('.col1').removeClass('add');


                jQuery('.form_offer_category_drop_body').css('display','none');
            }});
        jQuery('.form_offer_category_drop_head .col2').click(function () {
            if(!jQuery('.col2').hasClass('add')){
                jQuery('.col2').addClass('add');
                jQuery('.col2 .jq-selectbox__dropdown').css('display','block');
            }else {
                jQuery('.col2').removeClass('add');
                jQuery('.col2 .jq-selectbox__dropdown').css('display','none');
            }

        });
        jQuery('input').focus(function(){jQuery(this).parent().parent().find('.form_note').slideDown(200);});
        jQuery('input').blur(function(){jQuery(this).parent().parent().find('.form_note').slideUp(200);});
    }
    keypress(event:any) {
        if (this.offer_ch == true) {
            this.offer_ch = false;
            this.offer_ok = true;
        }
        if (jQuery("#ip_whitelist").val() != '') {
            jQuery(".ips").css('display', 'block');
               
        }
        else{jQuery(".ips").css('display','none')}
        
       
    }
    uploading_banner(){
        this.flag_func_banner=true;
        this.flag_banners=true;
        this.flags['form_offer_browse-banner']=true;
        let banner=this.upload_banner_file.nativeElement.files[0];
        this.banner_name.push(this.upload_banner_file.nativeElement.files[0].name);
        jQuery("#form_offer_banner_upload").before("<div id='a"+this.upload_banner_file.nativeElement.files[0].name+"' class='form_offer_browse_file'><span class='form_offer_browse_file_name'>"+this.upload_banner_file.nativeElement.files[0].name+"</span><a id='a"+this.upload_banner_file.nativeElement.files[0].name+"' class='form_offer_browse_file_close' ></a></div>");
        
        for(let i=0;i<this.banner_name.length;i++){
         
            this.addHtml('a'+this.banner_name[i],this.banner_name[i]);
        }
        this.banners.push(banner);
    
    }
    uploading_screenshot(event){
      
        this.flag_func_pics=true;
        this.flags['form_offer_browse-screenshot']=true;
        let pics=this.upload_screenshot_file.nativeElement.files[0];
        this.pics_name.push(this.upload_screenshot_file.nativeElement.files[0].name);
       
           
                jQuery("#form_offer_screenshot_upload").before("<div id='b"+this.upload_screenshot_file.nativeElement.files[0].name+"' class='form_offer_browse_file'><span class='form_offer_browse_file_name'>"+this.upload_screenshot_file.nativeElement.files[0].name+"</span><a id='b"+this.upload_screenshot_file.nativeElement.files[0].name+"' class='form_offer_browse_file_close' ></a></div>");


        for(let i=0;i<this.pics_name.length;i++){
            this.addHtml('b'+this.pics_name[i],this.pics_name[i]);
        }
       
        this.pics.push(pics);
     
       
    }
    check(){
        let chbox = <HTMLInputElement>document.getElementById('auto_optimization');
        let input=jQuery('.cr1').children('input');
        if(chbox.checked == true){
            this.auto_optimization = 1;
            for(let i=0;i<input.length;i++){
                input[i].value='33%';
                this.share1=input[0].value;
                this.share2=input[1].value;
                this.share3=input[1].value;
                jQuery(input[i]).attr('disabled','disabled');
            }
        }else{
            this.auto_optimization = 0;
            for(let i=0;i<input.length;i++){
                input[i].value='';
                this.share1=input[0].value;
                this.share2=input[1].value;
                this.share3=input[1].value;
                jQuery(input[i]).removeAttr('disabled','disabled');
            }
        }
    }
    addHtml(id,name) {
        this.name_for_listening=name;
        let some=document.getElementById(id);
       
        some.addEventListener('click',this.clearing.bind(this));
    }
    clearing(event){
        let id = event.target.getAttribute('id');
           
        let id2 = event.target.parentNode.parentNode.id;
        let id3 = event.target.parentNode.parentNode.parentNode.id;
       
        if(id3==event.target.id){
          
            for(let i=0; i<this.ips.length;i++){
              
                if(id===this.ips[i]){
                    this.ips.splice(i,1);
                }
            }
            document.getElementById(id).remove();
        }
        else{
            jQuery("#"+id2).find('.input_offer_upload')[0].value="";
            document.getElementById(id).remove();
           
            if(id.charAt(0)==='a'){
               id=id.slice(1);
                
                for(let i=0;i<this.banner_name.length;i++) {
                    if (this.banner_name[i] == id){
                        this.banner_name.splice(i,1);
                        this.banners.splice(i,1);
                        
                    }
                }
            }else{
                id=id.slice(1);
               
                for(let i=0;i<this.pics_name.length;i++) {
                    if (this.pics_name[i] == id){
                        this.pics_name.splice(i,1);
                        this.pics.splice(i,1);
                        
                    }
                }
            }

            if(jQuery("#"+id2).children('.form_offer_browse_file').length==0){
                this.flags[id2]=false;


            }
        }
        if(this.offer_ch==true)
        {
            this.offer_ch=false;
            this.offer_ok=true;
        }
    }
    addIP(){
        jQuery('#form_offer_access-whitelist').parent('li').append("<div class='form_offer_access' id='"+this.ip_whitelist+"'><span class='wr_inpt'><input type='hidden' value='x'><span class='fon_inpt1'>"+this.ip_whitelist+"<a class='form_offer_browse_file_close' id='"+this.ip_whitelist+"'></a></span></span> </div>")
        this.ips.push(this.ip_whitelist);
        this.addHtml(this.ip_whitelist,this.ip_whitelist);
        this.ip_whitelist='';
        jQuery(".form_offer_act_add").css('display','none');
    }
    addPass(e){
        let input=jQuery('.form_offer_it').children('input');

        if(jQuery('#'+e.target.id).hasClass('form_offer_act_del')){
            if(e.target.id=='tid'){
                for(let i=0;i<input.length;i++){
                    let str=input[i].value;
                    input[i].value=str.replace('{TID}','');
                }
            }
            if(e.target.id=='pid'){
                for(let i=0;i<input.length;i++){
                    let str=input[i].value;
                    input[i].value=str.replace('{PID}','');
                }
            }
            if(e.target.id=='from'){
                for(let i=0;i<input.length;i++){
                    let str=input[i].value;
                    input[i].value=str.replace('{FROM}','');
                }
            }
            jQuery('#'+e.target.id).removeClass('form_offer_act_del');
        }else{
            if(e.target.id=='tid'){
                for(let i=0;i<input.length;i++){
                    input[i].value+='{TID}';
                }
            }
            if(e.target.id=='pid'){
                for(let i=0;i<input.length;i++){
                    input[i].value+='{PID}';
                }
            }
            if(e.target.id=='from'){
                for(let i=0;i<input.length;i++){
                    input[i].value+='{FROM}';
                }
            }
            jQuery('#'+e.target.id).addClass('form_offer_act_del');
        }
    }
    send(formData:FormData=new FormData()){
        this.urls.url=[];
        this.urls.share=[];
       
        this.urls.url.push(jQuery("#url1").val());
        this.urls.url.push(jQuery("#url2").val());
        this.urls.url.push(jQuery("#url3").val());

        this.urls.share.push(jQuery("#share1").val());
        this.urls.share.push(jQuery("#share2").val());
        this.urls.share.push(jQuery("#share3").val());

        if(this.auto_optimization == 1){
            this.auto_optimization = 1;
        }else{this.auto_optimization = 0;}
        for(let i=0;i<this.values.length;i++){
            if(this.value==this.values[i].name){
                this.value=this.values[i].id;
            }
        }

        let xhr: XMLHttpRequest = new XMLHttpRequest();

        let file_pics_name:string []=this.pics_name;
        let file_banners_name:string []=this.banner_name;
        let auto_optimization=this.auto_optimization;
        let category_id_send=this.category_id_send;
       
        let category_domain=this.domains;
        
        let countrie_chosen:string []=this.countr;
     
        let transaction_life=this.transaction_life;
        let ips:string []=this.ips;
        let rpa=this.rpa;
        let cpa=this.cpa;
        let access_value=this.access_value;
        let enabled_value=this.enabled_value;
        let name=this.name;
        let user_id=this.value;
        let csrf=this.body.csrf;
        let allow_files = {banners:{},pics:{}};
        for(let i=0;i<file_banners_name.length;i++){
            allow_files.banners[i]=file_banners_name[i];
        
        }
        for(let i=0;i<file_pics_name.length;i++){
            allow_files.pics[i]=file_pics_name[i];
        }
        for(let i=0;i<this.pics.length;i++){
            formData.append("Offer[files_pics][]",this.pics[i]);
        }
        for(let i=0;i<this.banners.length;i++){
            formData.append("Offer[files_banners][]",this.banners[i]);
        }
        if(countrie_chosen.length==0){
            formData.append('Offer[countries][]', '');
        }else{
            for(let i=0;i<countrie_chosen.length;i++){
                formData.append('Offer[countries][]', countrie_chosen[i]);
            }
        }
        
        for(let i=0;i<ips.length;i++){
            formData.append('Offer[ip_whitelist][]',ips[i])
        }
        for (let i=0;i<this.urls.url.length;i++){
            formData.append("Offer[offerLinks]["+i+"][url]",this.urls.url[i]);
            formData.append("Offer[offerLinks]["+i+"][share]",this.urls.share[i].slice(0,-1));
        }
        formData.append("_csrf",csrf);

        this.FormDataCreate(
            formData,
            {
                allowed_files:JSON.stringify(allow_files),
                name:name,
                status:enabled_value,
                access:access_value,
                cpa:cpa,
                rpa:rpa,
                category_id:category_id_send,
                category_domain:category_domain,
                auto_optimization:auto_optimization,
                transaction_life:transaction_life,
                user_id:user_id
            }
        );

        let headers = new Headers();
        headers.append('Content-type', 'multipart/form-data');

        xhr.open('POST',this.domain+this.urlAddOffer+(this.offer_id?this.offer_id:this.addOffer.offer_value),true);
        xhr.send(formData);
        let self=this;
        xhr.onreadystatechange=function () {

            if(xhr.readyState==XMLHttpRequest.DONE){
                let res=xhr.response;
                let body=JSON.parse(res);
                if(typeof body.logged!='undefined'&& body.logged==false){
                    self.router.navigate(['/']);
                    let current_breadcrumb=localStorage.getItem('breadcramb_arr');
                    localStorage.setItem('current_breadcrumb',current_breadcrumb);
                    localStorage.setItem('current_url',self.router.url);
                    self.globalLogin.serverTime=false;
                    self.globalLogin.role=null;
                }
                if(typeof body.validation.length==='undefined'){
                    let flag:boolean=false;
                    for(let key in body.validation){
                        flag=true;
                        jQuery("#"+key).parent().append("<span class='error' id='error"+key+"'></span>");
                        jQuery("#"+key).parent().append("<span  class='Error' id='Error"+key+"'>"+body.validation[key]+"</span>");
                        jQuery("#error"+key).mouseenter( function () {
                            jQuery("#Error"+key).show();
                        }).mouseleave(function () {
                            jQuery("#Error"+key).hide();
                        })
                        if(key=='category_id'){
                            jQuery("#error"+key).css('right','-61px');
                            jQuery("#Error"+key).css('left','346px');
                        }
                    }
                }
                if(body.saved=="ok") {
                    for(let key in self.item_list){
                        jQuery("#"+key).parent().append("<span class='ok' id='ok"+key+"'></span>");
                    }
                    self.offer_ok = false;
                    self.offer_ch = true;
                }

                if(body.validation.length === 0){jQuery('.form_offer_btn_ch').addClass('inactive');}
            }
        };
        this.addOffer.render_offer_results=null;
        
        jQuery(".Error").remove();
        jQuery(".error").remove();

    }

    FormDataCreate(formData:FormData,values:any){
        
        for(let key in values){
            let value = values[key];
            if(typeof values[key] === 'object'){
                formData.append('Offer['+key+']', '');
            }else{formData.append('Offer['+key+']', value);}
            
        }

    }

    sendOk(){
     
        this.renderOffer.offerResult=undefined;
        this.router.navigate(['/offer/offer-list']);

    }
    clear(){
        this.sendOk();
    }
}
export interface Dictionary {
    [ index: string ]: string
}

