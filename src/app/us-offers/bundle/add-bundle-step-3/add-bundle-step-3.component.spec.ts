/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddBundleStep3Component } from './add-bundle-step-3.component';

describe('AddBundleStep3Component', () => {
  let component: AddBundleStep3Component;
  let fixture: ComponentFixture<AddBundleStep3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBundleStep3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBundleStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
