/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsOffersComponent } from './us-offers.component';

describe('UsOffersComponent', () => {
  let component: UsOffersComponent;
  let fixture: ComponentFixture<UsOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
