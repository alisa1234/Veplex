/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DcpaOfferComponent } from './dcpa-offer.component';

describe('DcpaOfferComponent', () => {
  let component: DcpaOfferComponent;
  let fixture: ComponentFixture<DcpaOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpaOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpaOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
