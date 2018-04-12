import { Component, ElementRef, HostListener, Input,Output, ViewChild, Inject, SimpleChange, EventEmitter } from '@angular/core';
import { OfferListComponent } from '../add-offer/offer-list/offer-list.component';
import { InitChosen } from '../initChosen';
import {OnChanges} from "@angular/core/src/metadata/lifecycle_hooks";

declare var jQuery:any;

@Component({
  selector: 'app-popup-table',
  templateUrl: './popup-table.component.html',
  styleUrls: ['./popup-table.component.scss']
})
export class PopupTable implements OnChanges{
    @Input() inner_hidden: boolean = true;
    @Input() top:any = 0;
    @Input() left:any = 0;
    @Input() value:any;
    @Input() values:any = [];
    @Input() type:boolean = true;
    @Input() title:string = "";

    @Output() inner_hiddenChange: any = new EventEmitter();
    @Output() valueChange:any = new EventEmitter();
    @Output() ch: any = new EventEmitter();

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target) || event.target.closest('.page-table_prc')) {
    } else {
        this.inner_hidden = true;
        this.inner_hiddenChange.emit(this.inner_hidden);
    }
  }

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    }

  constructor(public eRef: ElementRef) {

  }

    clear(){
        this.value = "";
        this.valueChange.emit("");
    }

    close(){
        this.inner_hidden = true;
        this.inner_hiddenChange.emit(this.inner_hidden);
    }

    changeField(){
        this.ch.emit(this.value);
        this.valueChange.emit(this.value);
        this.inner_hidden = true;
        this.inner_hiddenChange.emit(this.inner_hidden);
    }
}
