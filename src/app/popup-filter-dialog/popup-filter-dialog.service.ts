/**
 * Created by Алиска on 26.05.2017.
 */
import { Component, ElementRef, HostListener, Input,Output, ViewChild, Inject, SimpleChange, EventEmitter, Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

declare var jQuery:any;

@Injectable()
export class PopupFilterDialogService {
    hidden:boolean = true;
    top:any = 0;
    left:any = 0;
    values:any = [];
    checkbox_arr = [];
    field:any;
    checked:any;
    list:any;
    eventEmitter$:EventEmitter<any>;
    checked_arr= [];

    constructor() {
        this.eventEmitter$ = new EventEmitter();
    }

    choosenField(event, field, list_filter, list) {
        this.field = field;
        this.list = list;
        this.checked_arr[this.field] = [];
        console.log('service list', list_filter, field)
        switch (field) {
            
            case 'browser_name':
            {
                this.checked_arr[this.field] = [];
               

                this.values = list_filter.browser;
                for (let i = 0; i < this.values.length; i++) {
                 
                    this.checked_arr[this.field][this.values[i].id] = false;
                    
                }
                console.log('service list', this.values)

                break;
            }
            case 'os_name':
            {
                this.checked_arr[this.field] = [];
               
                this.values = list_filter.os;
                for (let i = 0; i < this.values.length; i++) {
                    this.checked_arr[this.field][this.values[i].id] = false;
                   

                }
                console.log('service list', this.values)
                break;
            }
            case 'country_name':
            {
                this.checked_arr[this.field] = [];
                this.values = list_filter.countries;
                for (let i = 0; i < this.values.length; i++) {
                    this.checked_arr[this.field][this.values[i].id] = false;

                }
                console.log('service list', this.values)
                break;
            }
        }
        if (typeof this.list.filterParams != 'undefined') {

            if (typeof this.list.filterParams.country_name != 'undefined') {
                if (this.field == 'country_name') {
                    for (let i = 0; i < this.list.filterParams.country_name.params.length; i++) {

                        this.checked_arr[this.field][this.list.filterParams.country_name.params[i].id] = true;
                     
                     if(this.list.filterParams.country_name.params[i].id=='258'){
                        
                         for(let y = 0; y < this.checked_arr[this.field].length; y++){
                             this.checked_arr[this.field][this.list.filterParams.country_name.params[i]] = true;
                          
                         }
                     }  
                    }
                }
            }


            if (typeof this.list.filterParams.browser_name != 'undefined') {
               
                if (this.field == 'browser_name') {
                    for (let i = 0; i < this.list.filterParams.browser_name.params.length; i++) {

                        this.checked_arr[this.field][this.list.filterParams.browser_name.params[i].id] = true;
                        
                    }
                }
            }
            
            if (typeof this.list.filterParams.os_name != 'undefined') {
             
                if (this.field == 'os_name') {
                    for (let i = 0; i < this.list.filterParams.os_name.params.length; i++) {

                        this.checked_arr[this.field][this.list.filterParams.os_name.params[i].id] = true;
                       
                    }
                }
            }
        }

        this.hidden = false;
        this.top =jQuery(event.target).offset().top - window.scrollY-60;
        this.left = jQuery(event.target).offset().left - window.scrollX + (jQuery(event.target).width()-140);
     
        
        
    }
   
    ValueCheckbox(id,checkboxNativeElement){
        this.checkbox_arr[this.field]=[];
        console.log('arr',checkboxNativeElement)
     
            for (let i = 0; i < checkboxNativeElement.length; i++) {
                if(id=='1' && checkboxNativeElement[i].nativeElement.id==id && checkboxNativeElement[i].nativeElement.checked==false){

                    for(let y=0;y<checkboxNativeElement.length;y++){
                                   
                                    checkboxNativeElement[y].nativeElement.checked = false;
                                    this.checkbox_arr[this.field]=[];
                                  
                                }
                }else{
                    if(id=='1' && checkboxNativeElement[i].nativeElement.id==id && checkboxNativeElement[i].nativeElement.checked==true){
                        for(let y=0;y<checkboxNativeElement.length;y++){
                            if(checkboxNativeElement[y].nativeElement.checked==true && checkboxNativeElement[y].nativeElement.id!=id){
                                checkboxNativeElement[y].nativeElement.checked = false;
                               
                            }
                            
                        }
                        this.checkbox_arr[this.field].push(checkboxNativeElement[i].nativeElement.id);
               
                    }
                }
                if (checkboxNativeElement[i].nativeElement.checked == true) {
                    if(checkboxNativeElement[i].nativeElement.id!=id&&checkboxNativeElement[i].nativeElement.id=='1' && checkboxNativeElement[i].nativeElement.checked==true){
                        checkboxNativeElement[i].nativeElement.checked=false;
                    }
                    this.checkbox_arr[this.field].push(checkboxNativeElement[i].nativeElement.id);
          
                  
                }
                // else{
                //  
                // //     
                //         debugger;
                //         for(let y=0;y<checkboxNativeElement.length;y++){
                //             if(checkboxNativeElement[y].nativeElement.id == '1'){
                //             checkboxNativeElement[y].nativeElement.checked = false;
                // //             this.checkbox_arr[this.field].push(checkboxNativeElement[y].nativeElement.id);
                // //             debugger;
                //         }
                // //       
                //     } 
                // }

                // if(checkboxNativeElement[i].nativeElement.checked == true && checkboxNativeElement[i].nativeElement.id == '258'){
                //     for (let y = 0; y < checkboxNativeElement.length; y++) {
                //         checkboxNativeElement[y].nativeElement.checked = true;
                //         this.checkbox_arr[this.field].push(checkboxNativeElement[y].nativeElement.id);
                //          
                //     }
                // }
            }
        console.log('ValueCheckbox1',this.checkbox_arr[this.field])

       }
            
      getAllBundleFilters(list_filter){

          this.list=list_filter;
      }
    
    getCheckedFilter(eRef){
        console.log('eRef',eRef)
        
    }


}