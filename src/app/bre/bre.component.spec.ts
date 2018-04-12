/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BreComponent } from './bre.component';

describe('BreComponent', () => {
  let component: BreComponent;
  let fixture: ComponentFixture<BreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
