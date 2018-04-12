import { Component, ElementRef, HostListener, Input,OnInit, ViewChild, Inject, SimpleChange, EventEmitter } from '@angular/core';
import { CheckboxTableService } from "./checkbox-table.service";
import { OfferListComponent } from '../add-offer/offer-list/offer-list.component';

declare var jQuery:any;

@Component({
  selector: 'app-checkbox-table-select',
  templateUrl: './checkbox-table-select.component.html',
  styleUrls: ['./checkbox-table-select.component.scss'],
  host:{'class':'root'}
})
export class CheckboxTableSelect implements OnInit{

  private value:any = "choose_action";
  private values:any = [{'id':'choose_action', 'title':'Choose action'},{'id':'0','title':'Disabled'},{'id':'1','title':'Active'}];
  private selected:number = 0;
  private data:any;
  
  @Input() _parent;
  @Input() attr;

  constructor(public checkboxTableService:CheckboxTableService) {
    this.checkboxTableService.eventEmitter$.subscribe(item => this.onEvent(item));
    this.checkboxTableService.eventEmitterResult$.subscribe(item => this.onEventResult(item));
    this.attr = 'status';
   
  }
  ngOnInit(){
    if(this.attr=='access'){
      this.values = [{'id':'choose_action', 'title':'Choose action'},{'id':'0','title':'Disabled'},{'id':'1','title':'Enabled'},{'id':'2','title':'Pending'}];
    }
    if(this.attr=='payment_status'){
      this.values = [{'id':'choose_action', 'title':'Choose action'},{'id':'2','title':'Paid'},{'id':'1','title':'Pending'}];
    }
    if(this.attr=='payments_status'){
      this.values = [{'id':'choose_action', 'title':'Choose action'},{'id':'1','title':'Re-send Invoice'},{'id':'2','title':'Paid'}];
    }
  }

  onEvent(item){
    this.selected = item;
  }

  onEventResult(item){
    this.value = item;
  }

  pushOnSelected(value){
    if(this.selected==0){
      alert('Please, choose elements in table!')
    }else{
      this.checkboxTableService.SendMulti(value, this._parent.body.csrf,  this._parent.domain, this._parent.urlGetList, this._parent.list, this.attr,this._parent.publisher_id);  
    }
    
  }
}
