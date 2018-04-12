/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddOfferStep2Component } from './add-offer-step-2.component';

describe('AddOfferStep2Component', () => {
  let component: AddOfferStep2Component;
  let fixture: ComponentFixture<AddOfferStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOfferStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOfferStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
