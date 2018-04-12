/**
 * Created by Алиска on 31.03.2017.
 */
import { Injectable,AfterViewInit,OnInit } from '@angular/core';
import {Filters} from './filters';
import {PopupChange} from './popup-change';

declare var jQuery:any;

@Injectable()
export class InitChosen implements OnInit{
    status_search_send:any;
    list:any;
    constructor(public popupChange:PopupChange){
        this.popupChange=popupChange;
    }
    initChosen(value,list,url,status_serch){
        
        let params = (<HTMLSelectElement>document.getElementById(''+value+'_search'));

        setTimeout(function () {

            for(let i=0;i<status_serch.length;i++){
                if(status_serch[i].select == 'selected'){
                    let some=jQuery("#"+value+"_search");

                    for(let y=0;y<jQuery(some)[0].length;y++){

                        if(status_serch[i].id==jQuery(some)[0][y].value){

                            jQuery(jQuery(some)[0][y]).attr('selected','selected');
                        }
                    }
                }
            }

            jQuery(params).chosen();

            jQuery("#"+value+"_search").trigger("chosen:updated");
        },0);

    }
    

ngOnInit(){}
}