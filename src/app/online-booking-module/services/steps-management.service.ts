import { Injectable } from '@angular/core';
import { Step } from '../models/Step/step';

@Injectable({
  providedIn: 'root'
})
export class StepsManagementService {
  public s: number = 0;
  public Steps: Step[] = [];
  public currentStep!: Step;

  constructor() {
    this.Steps.push(new Step(1, 'COVID19preScr', false, true, false, 'covid19'));
    this.Steps.push(new Step(2, 'ServiceType', false, false, false, 'service-type'));
    this.Steps.push(new Step(3, 'ExamType', false, false, false, 'appointment-type'));
    this.Steps.push(new Step(4, 'AppointmentsSlots', false, false, false, 'date-time'));
    this.Steps.push(new Step(5, 'OpticianAppointment', false, false, false, 'optician-appointment'));
    this.Steps.push(new Step(6, 'AppointmentConfirmation', false, false, false, 'confirmation'));
    this.Steps.push(new Step(7, 'Summary', false, false, false, 'summary'));
    this.currentStep = this.Steps.filter(x => x.order == 1)[0];
  }


}
