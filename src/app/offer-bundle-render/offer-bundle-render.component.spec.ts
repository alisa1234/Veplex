/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OfferBundleRenderComponent } from './offer-bundle-render.component';

describe('OfferBundleRenderComponent', () => {
  let component: OfferBundleRenderComponent;
  let fixture: ComponentFixture<OfferBundleRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferBundleRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferBundleRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
