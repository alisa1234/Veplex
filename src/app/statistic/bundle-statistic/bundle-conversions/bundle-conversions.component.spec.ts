import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleConversionsComponent } from './bundle-conversions.component';

describe('BundleConversionsComponent', () => {
  let component: BundleConversionsComponent;
  let fixture: ComponentFixture<BundleConversionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundleConversionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundleConversionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
