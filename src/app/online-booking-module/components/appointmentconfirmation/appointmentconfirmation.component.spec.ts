import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentconfirmationComponent } from './appointmentconfirmation.component';

describe('AppointmentconfirmationComponent', () => {
  let component: AppointmentconfirmationComponent;
  let fixture: ComponentFixture<AppointmentconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentconfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
