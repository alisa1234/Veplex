import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleStatisticComponent } from './bundle-statistic.component';

describe('BundleStatisticComponent', () => {
  let component: BundleStatisticComponent;
  let fixture: ComponentFixture<BundleStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundleStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundleStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
