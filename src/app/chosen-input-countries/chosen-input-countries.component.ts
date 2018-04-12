import { Component, ElementRef, HostListener, Input, ViewChild, Inject, AfterViewChecked,OnInit } from '@angular/core';
import {CountriesService} from '../countries.service';
import { InitChosen } from '../initChosen';
import {CheckboxTableService} from "../checkbox-table/checkbox-table.service";

declare var jQuery:any;

@Component({
  selector: 'app-chosen-input-countries',
  templateUrl: './chosen-input-countries.component.html',
  styleUrls: ['./chosen-input-countries.component.scss']
})
export class ChosenInputCountriesComponent implements OnInit {

  public hidden: boolean = true;
  public isActive: boolean = false;
  public elements = [];
  public selectElements: string[] = [];

  @Input() clicker;
  @Input() _parent;

  countr: any=[];
  countr2: any=[];
  countr3: any=[];

  CallbackOnChange(value) {
    this.selectElements = [];
    this.selectElements = value;
    this._parent.countr = this.selectElements;
    let select = jQuery('#chosen_countries_search').children(":selected");
    jQuery('#chosen_countries_search').trigger("chosen:updated");
  }

  constructor(public eRef: ElementRef, public checkboxTableService:CheckboxTableService, public countriesService:CountriesService) {

if(typeof this.countriesService.countries!='undefined'){

  this.countr =this.countriesService.countries;
  this.countr3 = Object.keys(this.countr);

  for (let key in this.countr) {
    this.countr2.push(this.countr[key])
  }
  for (let i = 0; i < this.countr2.length; i++) {
    this.elements.push({'name': this.countr2[i], 'value': this.countr3[i]});

  }
  
  setTimeout(()=>{
    let self = this;
    jQuery('.chosen-class').chosen();
    if(this._parent.countr.length!='0'){
    
      let options=jQuery('#chosen_countries_search')[0];
   
      for(let i=0;i<options.length;i++){
        for(let y=0;y<self._parent.countr.length;y++){
       
        if(options[i].value==self._parent.countr[y]){
          options[i].selected=true;
       
          self.CallbackOnChange(self._parent.countr);
        }
      }

      }
    }
    jQuery("#chosen_countries_search").chosen().change(function (e, params) {
      if(params.selected=='All'){
        jQuery(this).val([]);
        jQuery(this).val(['All']);
      }else {
        let valArr = jQuery(this).val();
     
        if (valArr != null) {
          for (let i = 0; i < valArr.length; i++) {
            if (valArr[i] == 'All') {
              valArr.splice(i, 1)
            }
          }
          jQuery(this).val(valArr);
       
        }
      }

      self.CallbackOnChange(jQuery(this).val());
      jQuery('.chosen-container input').click();
     
    });
  },0);
}else{
    this.countriesService.eventEmitter$.subscribe(items=>{
      
      this.countr = items;
      this.countr3 = Object.keys(this.countr);

      for (let key in this.countr) {
        this.countr2.push(this.countr[key])
      }
      for (let i = 0; i < this.countr2.length; i++) {
        this.elements.push({'name': this.countr2[i], 'value': this.countr3[i]});

      }
      
    })
    setTimeout(()=>{
      let self = this;
      jQuery('.chosen-class').chosen();
      if(this._parent.countr.length!='0'){
        let options=jQuery('#chosen_countries_search')[0];
  
        for(let i=0;i<options.length;i++) {
       
          for (let y = 0; y < self._parent.countr.length; y++) {
            if (options[i].value == self._parent.countr[y]) {
              options[i].selected = true;
         
              self.CallbackOnChange(self._parent.countr);
            }
          }
        }
   
      }
      jQuery("#chosen_countries_search").chosen().change(function (e, params) {
        
        if(params.selected=='All'){
          jQuery(this).val([]);
          jQuery(this).val(['All']);
        }else {
          let valArr = jQuery(this).val();
       
          if (valArr != null) {
            for (let i = 0; i < valArr.length; i++) {
              if (valArr[i] == 'All') {
                valArr.splice(i, 1)
              }
            }
            jQuery(this).val(valArr);
         
          }
        }
      
        self.CallbackOnChange(jQuery(this).val());
        jQuery('.chosen-container input').click();
      });
    },0);
  }
  }

  ngAfterViewChecked(){

  }
  ngOnInit(){
  }
}
