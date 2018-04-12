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
  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   if(this.eRef.nativeElement.contains(event.target) || event.target == this.clicker) {
  //     // console.log("chosen clicked inside");
  //   } else {
  //     // console.log("chosen clicked outside");
  //     if(!this.hidden){
  //       this.Search(this.clicker.value);
  //     }
  //     if(this.selectElements == null || this.selectElements.length == 0) {
  //
  //       this.isActive = false;
  //     }
  //     console.log(this.clicker.value, this.selectElements);
  //
  //     this.hidden = true;
  //   }
  // }
  //
  // Toggle(){
  //   if(this.hidden){
  //
  //     this.Get(this.clicker.value);
  //     this.isActive = true;
  //   }else{
  //     if(this.selectElements.length == 0) {
  //       this.isActive = false;
  //     }
  //   }
  //   this.hidden = !this.hidden;
  // }
  //
  // Get(value){
  //
  //   this._parent.statusService.Get(this._parent.filter_model, value, this);
  // }
  //
  // СallbackRes(res, value){
  //
  //   console.log('ch inp',res)
  //   this.elements=res[value];
  //
  //   let self = this;
  //   setTimeout(()=>{jQuery("#"+self.clicker.value + "_search").val(self.selectElements);jQuery('.chosen-class').trigger("chosen:updated");jQuery('.chosen-container input').focus();},0);
  // }

  // Search(value){
  //   this._parent.filters.searches_status(value,this._parent.urlGetList,this.selectElements).subscribe(
  //       res=> {
  //         console.log('Search', res);
  //         let self = this;
  //         setTimeout(()=>{jQuery("#"+self.clicker.value + "_search").val(self.selectElements);jQuery('.chosen-class').trigger("chosen:updated");},0);
  //         this._parent.list = res;
  //         this.checkboxTableService.Create(res);
  //       } );
  // }

  CallbackOnChange(value){
    this.selectElements = [];
    this.selectElements = value;
    this._parent.countr=this.selectElements;
    let select = jQuery('#chosen_countries_search').children(":selected");
    // let select2 = jQuery('#chosen_countries_search')[0];
    // for(let i=0;i<select2.length;i++){
    //   let select3 = select2[i].value['All'];
    
    // }
    //
    // // select[y].selected=true;
    // this.selectElements = value;
    // this._parent.countr=this.selectElements;
    // debugger;
    // for(let y=0;y<value.length;y++) {
    //   // select[y].selected=false;
    //   debugger;
    //   if (value[y]=='All') {
    //     this.selectElements = [];
    //     // for(let i=0;i<select.length;i++){
    //     //   select[i].selected=false;
    //     //   select[y].selected=true;
    //       this.selectElements.push(value[y]);
    //       this._parent.countr=this.selectElements;
    //     debugger;
    //     // }
    //   
    //    
    //     // 
    //     debugger;
        jQuery('#chosen_countries_search').trigger("chosen:updated");
    //   }
    //   else{
    //     // select[y].selected=true;
    //     // // this.selectElements = value;
    //     // // this._parent.countr=this.selectElements;
    //     debugger;
    //   }
      
    }
    // let select=jQuery('#chosen_countries_search').children(":selected");
    // let countr=[];
    // for(let i=0;i<select.length;i++){
    //   if (value[i] == 'All') {
    //     select[i].selected=false;
    //     jQuery('#chosen_countries_search').trigger("chosen:updated");
    //   }
    //   // countr.push(select[i].value);
    // }
 
  // }

  constructor(public eRef: ElementRef, public checkboxTableService:CheckboxTableService, public countriesService:CountriesService) {

if(typeof this.countriesService.countries!='undefined'){

  this.countr =this.countriesService.countries;
  this.countr3 = Object.keys(this.countr);

  for (let key in this.countr) {
    this.countr2.push(this.countr[key])
  }

  // this.elements.push({'value': 'choose_country', 'name': 'Choose country'});
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
          // valArr=[];
          // valArr.push(params);
       
        }
      }
      console.log('dasdas', self._parent.countr);


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

      // this.elements.push({'value': 'choose_country', 'name': 'Choose country'});
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
        console.log(params);
       
        
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
            // valArr=[];
            // valArr.push(params);
         
          }
        }
        console.log('dasdas', self._parent.countr);
      
        self.CallbackOnChange(jQuery(this).val());
        jQuery('.chosen-container input').click();
      });
    },0);
  }
  }

  ngAfterViewChecked(){

  }
  ngOnInit(){
    // debugger;
    // this._parent.eventEmitter$.subscribe(item =>{ debugger;});
  }

  // private onEvent(item: any): void {
  //   if(typeof item[this.clicker.value] != 'undefined'){
  //     if(Array.isArray(item[this.clicker.value])){
  //       for(let selected of item[this.clicker.value]['params']){
  //         this.selectElements.push(selected.id);
  //       }
  //     }else{
  //       for(let selected_key in Object.keys(item[this.clicker.value]['params'])){
  //         this.selectElements.push(item[this.clicker.value]['params'][selected_key].id);
  //       }
  //     }
  //   }
  //   this.isActive = this.selectElements.length > 0;
  //   console.log('emit selected',this.selectElements);
  //   console.log('emit selected length',this.selectElements.length);
  // }


}
