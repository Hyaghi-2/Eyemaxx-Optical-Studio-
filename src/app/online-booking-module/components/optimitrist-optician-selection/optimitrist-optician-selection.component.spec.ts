import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimitristOpticianSelectionComponent } from './optimitrist-optician-selection.component';

describe('OptimitristOpticianSelectionComponent', () => {
  let component: OptimitristOpticianSelectionComponent;
  let fixture: ComponentFixture<OptimitristOpticianSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptimitristOpticianSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimitristOpticianSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
