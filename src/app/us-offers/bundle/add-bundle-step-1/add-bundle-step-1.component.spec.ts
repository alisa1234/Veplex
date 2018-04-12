/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddBundleStep1Component } from './add-bundle-step-1.component';

describe('AddBundleStep1Component', () => {
  let component: AddBundleStep1Component;
  let fixture: ComponentFixture<AddBundleStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBundleStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBundleStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
