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
  // @Input() checked:number=0;
  // public hidden: boolean = true;


  @Output() inner_hiddenChange: any = new EventEmitter();
  @Output() valueChange:any = new EventEmitter();
  @Output() ch: any = new EventEmitter();
  
  @ViewChildren('checkbox') checkbox;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target) || event.target.closest('.page_info_check_filters')) {
      // console.log("chosen clicked inside");
    } else {
      // console.log("chosen clicked outside");
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
    console.log('value',id,this.checkbox._results);
    this.popupFilterDialogService.ValueCheckbox(id,this.checkbox._results)
  }

  // ngOnChanges(changes: {[propName: string]: SimpleChange}) {
  //   console.log('ngOnChanges - value = ', changes);
  // }
  //
  // ngOnInit(){
  //   debugger;
  //   if (typeof this.popupFilterDialogService.list.filterParams != 'undefined') {
  //     for (let i = 0; i < this.popupFilterDialogService.list.filterParams.country_name.params.length; i++) {
  //       debugger;
  //       console.log('blaaa', this.popupFilterDialogService.list.filterParams.country_name.params[i].id,jQuery('#' + this.popupFilterDialogService.list.filterParams.country_name.params[i].id))
  //     }
  //   }
  // }
  constructor(public eRef: ElementRef, public popupFilterDialogService:PopupFilterDialogService) {
    console.log('popup',this.values)
    // this.popupFilterDialogService.getCheckedFilter(this.checkbox);
  }
  Checked(id){
    
    if(this.popupFilterDialogService.checked_arr[ this.popupFilterDialogService.field]['1']==true){
      // for(let i=0;i<this.popupFilterDialogService.checked_arr[ this.popupFilterDialogService.field].length;i++){
        this.popupFilterDialogService.checked_arr[ this.popupFilterDialogService.field][id]=true;
      // } 
    }
    return this.popupFilterDialogService.checked_arr[ this.popupFilterDialogService.field][id];
  }

  // onEvent(items) {
  //   debugger;
  //   if (typeof items.filterParams != 'undefined') {
  //     for (let i = 0; i < items.filterParams.country_name.params.length; i++) {
  //       debugger;
  //       console.log('blaaa', jQuery('#' + items.filterParams.country_name.params[i].id))
  //     }
  //   }
  // }
  //
  // clear(){
  //   this.value = "";
  //   this.valueChange.emit("");
  // }
  //
  // close(){
  //   this.inner_hidden = true;
  //   this.inner_hiddenChange.emit(this.inner_hidden);
  // }
  //
  // changeField(){
  //   this.ch.emit(this.value);
  //   this.valueChange.emit(this.value);
  //   this.inner_hidden = true;
  //   this.inner_hiddenChange.emit(this.inner_hidden);
  // }
  

}
