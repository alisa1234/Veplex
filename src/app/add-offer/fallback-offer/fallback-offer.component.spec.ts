/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FallbackOfferComponent } from './fallback-offer.component';

describe('FallbackOfferComponent', () => {
  let component: FallbackOfferComponent;
  let fixture: ComponentFixture<FallbackOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FallbackOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FallbackOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
