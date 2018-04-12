import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPaymentsCorrectionsComponent } from './popup-payments-corrections.component';

describe('PopupPaymentsCorrectionsComponent', () => {
  let component: PopupPaymentsCorrectionsComponent;
  let fixture: ComponentFixture<PopupPaymentsCorrectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupPaymentsCorrectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPaymentsCorrectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
