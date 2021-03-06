/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BundleListComponent } from './bundle-list.component';

describe('BundleListComponent', () => {
  let component: BundleListComponent;
  let fixture: ComponentFixture<BundleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
