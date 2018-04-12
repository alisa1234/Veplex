import { Component, ElementRef, HostListener, Input,SimpleChange } from '@angular/core';
import { OfferListComponent } from '../add-offer/offer-list/offer-list.component';
import {CheckboxTableService} from "../checkbox-table/checkbox-table.service";

declare var jQuery:any;

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {
  public hidden: boolean = true;
  public hidden_delete: boolean = true;
  public isActive: boolean = false;
  @Input() search:string;
  // search_field:{[index:string]:boolean}={};

  @Input() clicker;
  @Input() _parent;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target) || event.target == this.clicker) {
    } else {
      if(typeof this.search !='undefined'){
        this.isActive=true;
      }else{
     
        this.isActive=false;
      }
      this.hidden = true;
    }
  }
  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    if(typeof changes.search.currentValue!='undefined'){
        this.isActive=true;
        this.hidden_delete=false;
    }
   
  }

  Toggle(){
    if(typeof this.search !='undefined'){
      this.isActive=true;
    }else{
     
      this.isActive=!this.isActive;
    }
   
    this.hidden = !this.hidden;
  }
  enter(value){
    
    this._parent.enter_search(value,this);
  }
  clearing(value){
    this._parent.clear(value,this);
    this.search=undefined;
  }

  constructor(public eRef: ElementRef, public checkboxTableService:CheckboxTableService) {
  }
}
