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
      // console.log("clicked inside");
    } else {
      if(typeof this.search !='undefined'){
       
        console.log('text input searc',this.search)
        this.isActive=true;
      }else{
     
        this.isActive=false;
      }
      this.hidden = true;
      // 
      // console.log("clicked outside");
    }
  }
  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    console.log('ngOnChanges - value = ', changes);
    if(typeof changes.search.currentValue!='undefined'){
      // debugger;
      // if(typeof changes.search.cerrentValue!='undefined'){
        this.isActive=true;
        this.hidden_delete=false;
        // debugger;
      // }

    }
   
  }

  Toggle(){
  
    console.log(this.search);
    if(typeof this.search !='undefined'){

      console.log('text input searc',this.search)
      this.isActive=true;
    }else{
     
      this.isActive=!this.isActive;
    }
   
    this.hidden = !this.hidden;
     
    // debugger;
    
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
