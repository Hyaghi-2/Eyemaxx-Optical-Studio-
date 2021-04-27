import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidPreScreeningComponent } from './covid-pre-screening.component';

describe('CovidPreScreeningComponent', () => {
  let component: CovidPreScreeningComponent;
  let fixture: ComponentFixture<CovidPreScreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidPreScreeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidPreScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
