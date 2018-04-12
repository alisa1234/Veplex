/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublishersListComponent } from './publishers-list.component';

describe('PublishersListComponent', () => {
  let component: PublishersListComponent;
  let fixture: ComponentFixture<PublishersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
