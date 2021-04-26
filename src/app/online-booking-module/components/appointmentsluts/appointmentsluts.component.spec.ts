import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentslutsComponent } from './appointmentsluts.component';

describe('AppointmentslutsComponent', () => {
  let component: AppointmentslutsComponent;
  let fixture: ComponentFixture<AppointmentslutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentslutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentslutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
