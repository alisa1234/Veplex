import { Component, ElementRef, HostListener, Input,Output, ViewChild, Inject, SimpleChange, EventEmitter } from '@angular/core';
import { CheckboxTableService } from "./checkbox-table.service";

declare var jQuery:any;

@Component({
  selector: 'app-checkbox-table-one',
  templateUrl: './checkbox-table-one.component.html',
  styleUrls: ['./checkbox-table-one.component.scss']
})
export class CheckboxTableOne{

  @Input() id:number;

  constructor(public checkboxTableService:CheckboxTableService) {}

    ClickCheckbox(id:number):void{
        this.checkboxTableService.ClickCheckbox(id);
    }

    ValueCheckbox(id:number):number{
        return this.checkboxTableService.ValueCheckbox(id);
    }
}
