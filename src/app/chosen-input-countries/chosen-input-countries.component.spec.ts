import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenInputCountriesComponent } from './chosen-input-countries.component';

describe('ChosenInputCountriesComponent', () => {
  let component: ChosenInputCountriesComponent;
  let fixture: ComponentFixture<ChosenInputCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChosenInputCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenInputCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
