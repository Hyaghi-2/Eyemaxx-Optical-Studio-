import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentstypesComponent } from './appointmentstypes.component';

describe('AppointmentstypesComponent', () => {
  let component: AppointmentstypesComponent;
  let fixture: ComponentFixture<AppointmentstypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentstypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentstypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
