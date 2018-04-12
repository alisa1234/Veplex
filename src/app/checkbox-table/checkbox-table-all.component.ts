import { Component, ElementRef, HostListener, Input,Output, ViewChild, Inject, SimpleChange, EventEmitter } from '@angular/core';
import { CheckboxTableService } from "./checkbox-table.service";


@Component({
  selector: 'app-checkbox-table-all',
  templateUrl: './checkbox-table-all.component.html',
  styleUrls: ['./checkbox-table-all.component.scss']
})
export class CheckboxTableAll{

  constructor(public checkboxTableService:CheckboxTableService) {}

  ValueCheckboxAll():number{
    return this.checkboxTableService.ValueCheckboxAll();
  }

  ClickCheckboxAll():void{
    this.checkboxTableService.ClickCheckboxAll();
  }
}
