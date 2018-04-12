/**
 * Created by Алиска on 24.07.2017.
 */
import { Component, ElementRef, HostListener, Input,Output, ViewChild, Inject, SimpleChange, EventEmitter, Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

@Injectable()

export class PopupScreensService {

    id:number;
    name:string;
    pics=[];
    hidden:boolean=true;

    showScreens(id,name,pics_url){
       
        this.id=id;
        this.name=name;
        this.pics=pics_url;
        this.hidden=false;
      
    }
}