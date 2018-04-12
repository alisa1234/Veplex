/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PopupScreensComponent } from './popup-screens.component';

describe('PopupScreensComponent', () => {
  let component: PopupScreensComponent;
  let fixture: ComponentFixture<PopupScreensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupScreensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupScreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
