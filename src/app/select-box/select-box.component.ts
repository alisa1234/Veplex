import { Component, ElementRef, HostListener, Input, Output, ViewChild, Inject, SimpleChange, EventEmitter } from '@angular/core';
import { OfferListComponent } from '../add-offer/offer-list/offer-list.component';
import { CalendarComponent } from '../calendar/calendar.component';
import {OnChanges , AfterViewChecked} from "@angular/core/src/metadata/lifecycle_hooks";

declare var jQuery:any;

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBox implements OnChanges, AfterViewChecked{
    @Input() model:any;
    @Input() values:any = [];
    @Input() option_value_var:string;
    @Input() option_text_var:string;
    @Input() disabled:boolean=false;
    private values_change:boolean = false;
    @Input() custom:boolean=true;
    @Input() id:string;
    @Input() _parent;
    @Input() click_event:boolean=false;
    @ViewChild('select') el:ElementRef;
    
    private click:boolean=false;
    @Output() modelChange: any = new EventEmitter();
    @Output() pushOnSelected:any = new EventEmitter();
    
    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        console.log('ngOnChanges - value = ', changes,this.model);
      
        if(typeof changes.model!='undefined'){

            
            // if(typeof changes.model != 'undefined'){
                let a = this.eRef.nativeElement.querySelector('select').querySelector('option[value="'+changes.model.currentValue+'"]');
           
                console.log('a',a);
            if(this.click_event==true){
           
                if(typeof changes.model.previousValue!='object' && changes.model.previousValue!=null && changes.model.previousValue!='null' && changes.model.previousValue!='All' && changes.model.currentValue!=changes.model.previousValue){
                    this.click=true;
                 
                }    
            }
            
                if(a != null){
                 
                    this.eRef.nativeElement.querySelector('.jq-selectbox__select-text').innerHTML = a.text;
                   
                    
                    setTimeout(()=>{
                     
                        jQuery(this.el.nativeElement).trigger('refresh');
                       
                    },0);
                }
            // }
           
        }
        
      
        // if(changes.model.currentValue =='custom'){
        //     console.log('ngOnChanges2 - value = ',this.calendar.custom);
        //     debugger;
        //     this.custom=true;
        //     console.log('ngOnChanges2 - value = ',this.calendar.custom);
        // }

        if(typeof changes.values != 'undefined'){
            this.values_change = true;
            // debugger;
        }
    }

    ngOnInit(){
        
        jQuery(this.el.nativeElement).styler();
        // debugger;
        // jQuery( "#domains option[value!='tracking_domain']" ).prop('disabled', 'disabled');
        // jQuery(jQuery(this.el.nativeElement)).css('overflow','scroll');
        let self = this;
        jQuery(this.el.nativeElement).change((e) => {
            self.model = e.currentTarget.value;
            self.modelChange.emit(self.model);
            self.pushOnSelected.emit(self.model);
        
            
           
        });
    }

    ngAfterViewChecked(){
       
        if(this.values_change){
            // debugger;
            jQuery(this.el.nativeElement).styler();
            // debugger;
            // jQuery( "#domains option[value!='tracking_domain']" ).prop('disabled', 'disabled');
            let a = this.eRef.nativeElement.querySelector('select').querySelector('option[value="'+this.model+'"]');
            console.log(a)
            // debugger;
          
            if(a != null){

                this.eRef.nativeElement.querySelector('.jq-selectbox__select-text').innerHTML = a.text;
            }
            this.values_change = false;
            setTimeout(()=>{
                // debugger;
                jQuery(this.el.nativeElement).trigger('refresh');
                jQuery('.jq-selectbox__dropdown').css('width','100%');
           
            },0);

        }
    }
    keypress(){
        if(this.click==true){ this._parent.keypress();}
        
    }

    constructor(public eRef: ElementRef,public calendar:CalendarComponent) {}
}
