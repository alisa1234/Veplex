import { Component, ElementRef, HostListener, Input,Output, ViewChild, Inject, SimpleChange, EventEmitter, Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

export class Types{
  key:number;
  value:string;
}

const Status:Types[]=[
  {key:1,value:'Active'},
  {key:0,value:'Disabled'},
  {key:2,value:'Pending'}
];

@Injectable()
export class CheckboxTableService{

  private checkbox:any = {};
  private selected:number=0;
  id:number;
  public eventEmitter$: EventEmitter<any>;
  public eventEmitterResult$: EventEmitter<any>;
  
  user_id_arr=[];

  constructor(public _http: Http) {
   
    this.eventEmitter$ = new EventEmitter();
    this.eventEmitterResult$ = new EventEmitter();
  }

  Create(item) {
    this.checkbox = {};

    if (Object.keys(this.checkbox).length != item.rows.length) {
      this.checkbox = {};
      for (let i = 0; i < item.rows.length; i++) {
       
        if (item.rows[i].id != null) {

          this.checkbox[item.rows[i].id] = 0;
          // debugger;

        }
      }
    }
  }

  Clear(item){
      this.selected = 0;
      this.eventEmitter$.emit(this.selected);
      this.checkbox = {};
      for(let i=0;i<item.rows.length;i++) {
        if (item.rows[i].id != null) {

          this.checkbox[item.rows[i].id] = 0;

        }
      }
  }

  TempCheckboxInsert():void{
    let selected_count:number = 0;


    for(let i=0;i<Object.keys(this.checkbox).length;i++){
      if(this.checkbox[Object.keys(this.checkbox)[i]] === 1){
      
        selected_count++;
      }
    }

    this.selected = selected_count;
    this.eventEmitter$.emit(this.selected);
  }

  ClickCheckboxAll():void{
    let all:number = 0;

    this.selected = 0;
  
    for(let i=0;i<Object.keys(this.checkbox).length;i++){
      if(this.checkbox[Object.keys(this.checkbox)[i]] === 0){
        all = 1;
        this.selected = Object.keys(this.checkbox).length;
        this.eventEmitter$.emit(this.selected);
       
        break;
      }
    }

    for(let i=0;i<Object.keys(this.checkbox).length;i++){
      this.checkbox[Object.keys(this.checkbox)[i]] = all;
    }

    this.eventEmitter$.emit(this.selected);
  }

  ClickCheckbox(id:number):void{
    this.id=id;
    console.log('ClickCheckbox id: '+ id);
    if(this.checkbox[id] == 1){
      this.checkbox[id] = 0;
    }else{
      this.checkbox[id] = 1;
    }
    this.TempCheckboxInsert();
    console.log('ClickCheckbox count id: '+ Object.keys(this.checkbox).length);
   
  }

  ValueCheckbox(id:number):number{
    this.id=id;
    return this.checkbox[id];
  }

  ValueCheckboxAll():number{

    if(Object.keys(this.checkbox).length == 0){
      return 0;
    }

    for(let i=0;i<Object.keys(this.checkbox).length;i++){
      if(this.checkbox[Object.keys(this.checkbox)[i]] === 0){
        return 0;
      }
    }

    return 1;
  }

  SendMulti(value, csrf, domain, urlGetList, offer_list, attr, publisher_id){
    debugger;
    let selected_elements:any = {};
    let query_selected_elements:string = "";

    if(value == "choose_action"){
      return false;
    }

    console.log("JqueryStatusSubscribe selected: "+value);

    for(let i=0;i<Object.keys(this.checkbox).length;i++){
      if(this.checkbox[Object.keys(this.checkbox)[i]] === 1){
        selected_elements[i] = Object.keys(this.checkbox)[i];
        query_selected_elements +="&list_id[]="+selected_elements[i];
        this.user_id_arr.push(selected_elements[i])
      }
    }

    if(Object.keys(selected_elements).length > 0) {
      console.log("JqueryStatusSubscribe selected elements: "+value);
      let headers = new Headers();
      let result:any;
      let changed = 'attr='+attr+'&value=' + value + query_selected_elements + '&_csrf=' + csrf+'&user_id='+publisher_id+'&offer_id='+publisher_id;
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this._http.post(domain + urlGetList + 'multiField', changed, {headers: headers}).map((res:Response)=> {
        let body = res.json();
        console.log(body);
        console.log(offer_list.rows);
      
        if(body.saved == 'ok'){
          
          console.log('saved ok',selected_elements);
          for (let id of Object.keys(selected_elements)){
           
            let offer_id = selected_elements[id];
            let map;
          if(attr=='payment_status'){
            debugger;
            map = offer_list.rows.map(function(offer) {return offer.id} ).indexOf(offer_id);
          }
            else{
            debugger;
            map = offer_list.rows.map(function(offer) {return offer.id} ).indexOf(Number(offer_id));
          }
            debugger;
            offer_list.rows[map][attr] = value;
            
           
          }
          this.eventEmitterResult$.emit("choose_action");
          this.Clear(offer_list);
        }

      }).subscribe(data=>result=data);
    }
  }
}
