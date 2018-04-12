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
            // let key:any;
            let flag:boolean=false;
            // this.valid=body.validation;
            for(let key in body.validation){

                console.log('key'+key);
                // let key=this.key;
                flag=true;
                jQuery("#"+key).parent().append("<span class='error' id='error"+key+"'></span>");
                // jQuery("#"+this.key).parent().addClass('error');
                jQuery("#"+key).parent().append("<span  class='Error' id='Error"+key+"'>"+body.validation[key]+"</span>");
                // console.log(jQuery("#"+this.key).attr("name"));
                // if(this.key==jQuery("#"+this.key).attr("name")){console.log('match');this.flag=true;}
                // console.log(this.key,this.valid[this.key])
                jQuery("#error"+key).mouseenter( function () {

                    console.log(key);
                    // if(jQuery("#error"+key).is(e.target)&& jQuery("#error"+key).has(e.target).length === 0){console.log('strat');}
                    jQuery("#Error"+key).show();
                }).mouseleave(function () {
                    jQuery("#Error"+key).hide();
                })
            }
        }
    }
}