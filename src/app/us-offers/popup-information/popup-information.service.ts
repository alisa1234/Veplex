import { Component, ElementRef, HostListener, Input,Output, ViewChild, Inject, SimpleChange, EventEmitter, Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

@Injectable()

export class PopupInformationService {
    
    id:number;
    name:string;
    information:string;
    hidden:boolean=true;
    
    showInformation(id,name,information){
        this.id=id;
        this.name=name;
        this.information=information;
        this.hidden=false;
        
    }
}