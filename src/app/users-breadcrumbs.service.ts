/**
 * Created by Алиска on 13.07.2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Domains} from './domains';
import {InitChosen} from './initChosen';
import { Router, ActivatedRoute } from '@angular/router';

declare var jQuery:any;

@Injectable()
export class UsersBreadcrumbsService{
    constructor(public route: ActivatedRoute){}
    setBreadcrumbs(item_name){
        if(this.route.snapshot.data['name']=='Update '+item_name){
           
            this.route.snapshot.data['breadcrumb']='Update '+item_name;
        }
    }
}
