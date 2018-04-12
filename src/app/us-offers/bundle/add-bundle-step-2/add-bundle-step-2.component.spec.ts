/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddBundleStep2Component } from './add-bundle-step-2.component';

describe('AddBundleStep2Component', () => {
  let component: AddBundleStep2Component;
  let fixture: ComponentFixture<AddBundleStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBundleStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBundleStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
