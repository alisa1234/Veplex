import { Component, ElementRef, HostListener, Input, ViewChild, Inject, AfterViewChecked,OnInit } from '@angular/core';
import { OfferListComponent } from '../add-offer/offer-list/offer-list.component';
import { InitChosen } from '../initChosen';
import {CheckboxTableService} from "../checkbox-table/checkbox-table.service";

declare var jQuery:any;

@Component({
  selector: 'app-chosen-input',
  templateUrl: './chosen-input.component.html',
  styleUrls: ['./chosen-input.component.scss']
})
export class ChosenInputComponent implements AfterViewChecked,OnInit{
  public hidden: boolean = true;
  public isActive: boolean = false;
  public elements = [];
  public selectElements: string[] = [];

  @Input() clicker;
  @Input() _parent;


  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target) || event.target == this.clicker) {
    } else {
      if(!this.hidden){
        this.Search(this.clicker.value);
      }
      if(this.selectElements == null || this.selectElements.length == 0) {
        
          this.isActive = false;
      }
       
      this.hidden = true;
    }
  }

  Toggle(){
    if(this.hidden){
        
      this.Get(this.clicker.value);
      this.isActive = true;
    }else{
        if(this.selectElements.length == 0) {
            this.isActive = false;
        }
    }
    this.hidden = !this.hidden;
  }

  Get(value){
      
      this._parent.statusService.Get(this._parent.filter_model, value, this);
  }

  СallbackRes(res, value){
      this.elements=res[value];

      let self = this;
      setTimeout(()=>{jQuery("#"+self.clicker.value + "_search").val(self.selectElements);jQuery('.chosen-class').trigger("chosen:updated");jQuery('.chosen-container input').focus();},0);
  }

  Search(value){
      this._parent.filters.searches_status(value,this._parent.urlGetList,this.selectElements).subscribe(
          res=> {
              let self = this;
              setTimeout(()=>{jQuery("#"+self.clicker.value + "_search").val(self.selectElements);jQuery('.chosen-class').trigger("chosen:updated");},0);
              this._parent.list = res;
              this._parent.sortGroup(this._parent.list);
              if (this._parent.list.pagination.totalCount > 100) {

                  this._parent.display_from = this._parent.list.pagination.pageSize * (this._parent.list.pagination.page + 1) - (this._parent.list.pagination.pageSize - 1);
                  this._parent.display_to = this._parent.list.pagination.pageSize * (this._parent.list.pagination.page + 1);
                  this._parent.display_of = this._parent.list.pagination.totalCount;
              } else {

                  this._parent.display_from = this._parent.list.pagination.pageSize * (this._parent.list.pagination.page + 1) - (this._parent.list.pagination.pageSize - 1);
                  this._parent.display_to = this._parent.list.pagination.totalCount;
                  this._parent.display_of = this._parent.list.pagination.totalCount;
              }
              this.checkboxTableService.Create(res);
      } );
  }

  CallbackOnChange(value){
      this.selectElements = [];

      this.selectElements = value;
  }

  constructor(public eRef: ElementRef, public checkboxTableService:CheckboxTableService) {
     
    setTimeout(()=>{
        let self = this;
        jQuery('.chosen-class').chosen();
        jQuery("#"+this.clicker.value + "_search").chosen().change(function (e, params) {
            self.CallbackOnChange(jQuery(this).val());
            jQuery('.chosen-container input').click();
        });
    },0);
  }
    ngOnInit(){
        this._parent.eventEmitter$.subscribe(item => this.onEvent(item));
    }

    private onEvent(item: any): void {
        if(typeof item[this.clicker.value] != 'undefined'){
            if(Array.isArray(item[this.clicker.value])){
                for(let selected of item[this.clicker.value]['params']){
                    this.selectElements.push(selected.id);
                }
            }else{
                for(let selected_key in Object.keys(item[this.clicker.value]['params'])){
                    this.selectElements.push(item[this.clicker.value]['params'][selected_key].id);
                }
            }
        }
        this.isActive = this.selectElements.length > 0;
    }

}
