import { Component, OnInit } from '@angular/core';
import { LoginBody } from '../../models/login/login-body';
import { LoginResponse } from '../../models/login/login-response';
import { Step } from '../../models/Step/step';
import { BookingModuleService } from '../../services/booking-module-service.service';
import { StepsManagementService } from '../../services/steps-management.service';

@Component({
  selector: 'app-base-content',
  templateUrl: './base-content.component.html',
  styleUrls: ['./base-content.component.css']
})
export class BaseContentComponent implements OnInit {
  loginResponse: LoginResponse = new LoginResponse();
  loginBody: LoginBody = new LoginBody();
  constructor(private serv: BookingModuleService, private steps: StepsManagementService) { }

  ngOnInit(): void {
    this.steps.Steps.push(new Step(1, 'COVID19preScr', false, true, false));
    this.steps.Steps.push(new Step(2, 'ServiceType', false, true, false));
    this.steps.Steps.push(new Step(3, 'ExamType', false, false, false));
    this.steps.Steps.push(new Step(4, 'AppointmentsSlots', false, false, false));
    this.steps.Steps.push(new Step(5, 'OpticianAppointment', false, false, false));
    this.steps.Steps.push(new Step(6, 'AppointmentConfirmation', false, false, false));
    this.steps.Steps.push(new Step(7, 'Summary', false, false, false));
    this.steps.currentStep = this.steps.Steps.filter(x => x.order = 1)[0];
  }

  stepsEnabled(_order: number): boolean {
    return this.steps.Steps.filter(x => x.order = _order)[0].enabled;
  }

}
