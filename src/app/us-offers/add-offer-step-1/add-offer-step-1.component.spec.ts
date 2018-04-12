/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddOfferStep1Component } from './add-offer-step-1.component';

describe('AddOfferStep1Component', () => {
  let component: AddOfferStep1Component;
  let fixture: ComponentFixture<AddOfferStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOfferStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOfferStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
