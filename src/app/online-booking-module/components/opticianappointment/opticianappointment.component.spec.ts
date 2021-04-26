import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpticianappointmentComponent } from './opticianappointment.component';

describe('OpticianappointmentComponent', () => {
  let component: OpticianappointmentComponent;
  let fixture: ComponentFixture<OpticianappointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpticianappointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpticianappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
