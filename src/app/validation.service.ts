/**
 * Created by Алиска on 11.01.2017.
 */
import { Injectable } from '@angular/core';

declare var jQuery:any;

@Injectable()
export class ValidationService{
    constructor(){
    }
    
    getValidation(){
        let body;
        if(typeof body.validation.length==='undefined'){
            console.log('start');
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
            }
        }
    }
}