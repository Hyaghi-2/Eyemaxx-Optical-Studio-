import { Injectable } from '@angular/core';
import { DoctorStoreTypeResponse } from '../models/get-stores-types-doctors/doctor-store-type-response';
import { Step } from '../models/Step/step';
import { DataParent } from '../models/Steps-Data/data-parent';

@Injectable({
  providedIn: 'root'
})
export class StepsManagementService {
  public s: number = 0;
  public Steps: Step[] = [];
  public currentStep!: Step;
  public stepsData: DataParent[] = [];
  public ExamTypesPreFetch: DoctorStoreTypeResponse = new DoctorStoreTypeResponse();

  constructor() {
    this.Steps.push(new Step(1, 'COVID19preScr', false, true, false, 'covid19'));
    this.Steps.push(new Step(2, 'ExamType', false, false, false, 'appointment-type'));
    this.Steps.push(new Step(3, 'AppointmentsSlots', false, false, false, 'date-time'));
    this.Steps.push(new Step(4, 'AppointmentConfirmation', false, false, false, 'confirmation'));
    this.Steps.push(new Step(5, 'Summary', false, false, false, 'summary'));
    this.currentStep = this.Steps.filter(x => x.order == 1)[0];
  }

  clearSteps(id: number) {
    this.Steps.forEach(x => {
      if (x.order > id) {
        x.needRefresh = false;
        x.enabled = false;
        x.validated = false;
      }
    });
    while (this.stepsData.length >= id) {
      this.stepsData.pop();
    }
  }


}
