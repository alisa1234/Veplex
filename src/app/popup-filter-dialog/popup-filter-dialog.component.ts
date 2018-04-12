import { Component, ElementRef,Injectable, HostListener, Input,Output,ViewChildren, ViewChild, Inject, SimpleChange, EventEmitter,OnInit } from '@angular/core';

import {PopupFilterDialogService} from "./popup-filter-dialog.service";

declare var jQuery:any;

@Component({
  selector: 'app-popup-filter-dialog',
  templateUrl: './popup-filter-dialog.component.html',
  styleUrls: ['./popup-filter-dialog.component.scss']
})
@Injectable()
export class PopupFilterDialogComponent{

  @Input() inner_hidden:boolean=true;
  @Input() top:any = 0;
  @Input() left:any = 0;
  @Input() value:any;
  @Input() values:any = [];
  @Input() type:boolean = true;
  @Input() title:string = "";
  @Input() _parent;
  @Input() id:any;
  isChecked:{[index:string]:boolean}={};


  @Output() inner_hiddenChange: any = new EventEmitter();
  @Output() valueChange:any = new EventEmitter();
  @Output() ch: any = new EventEmitter();
  
  @ViewChildren('checkbox') checkbox;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target) || event.target.closest('.page_info_check_filters')) {
    } else {
      this.inner_hidden = true;
      this.inner_hiddenChange.emit(this.inner_hidden);
    }
  }
  send(){
    this._parent.send();
    this.inner_hidden=true;
    this.inner_hiddenChange.emit(this.inner_hidden);
  }
  close(){
    this.inner_hidden=true;
    this.inner_hiddenChange.emit(this.inner_hidden);
  }
  ValueCheckbox(id){
    this.popupFilterDialogService.ValueCheckbox(id,this.checkbox._results)
  }
  constructor(public eRef: ElementRef, public popupFilterDialogService:PopupFilterDialogService) {
  }
  Checked(id){
    
    if(this.popupFilterDialogService.checked_arr[ this.popupFilterDialogService.field]['1']==true){
        this.popupFilterDialogService.checked_arr[ this.popupFilterDialogService.field][id]=true;
    }
    return this.popupFilterDialogService.checked_arr[ this.popupFilterDialogService.field][id];
  }

}
