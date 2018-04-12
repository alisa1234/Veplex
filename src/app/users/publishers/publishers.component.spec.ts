/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublishersComponent } from './publishers.component';

describe('PublishersComponent', () => {
  let component: PublishersComponent;
  let fixture: ComponentFixture<PublishersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
