import { Component, OnInit } from '@angular/core';
import { Step } from '../../models/Step/step';
import { AppointmentConfirmationData } from '../../models/Steps-Data/appointment-confirmation-data';
import { AppointmentSlotData } from '../../models/Steps-Data/appointment-slot-data';
import { AppointmentSummaryData } from '../../models/Steps-Data/appointment-summary-data';
import { AppointmentTypeData } from '../../models/Steps-Data/appointment-type-data';
import { BookingModuleService } from '../../services/booking-module-service.service';
import { StepsManagementService } from '../../services/steps-management.service';

@Component({
  selector: 'app-appointmentsummary',
  templateUrl: './appointmentsummary.component.html',
  styleUrls: ['./appointmentsummary.component.css']
})
export class AppointmentsummaryComponent implements OnInit {
  appointmentTypeData!: AppointmentTypeData;
  appointmentSlotData!: AppointmentSlotData;
  appointmentConfirmationData!: AppointmentConfirmationData;
  OpticianAppointment: boolean = false;
  constructor(private serv: BookingModuleService, private steps: StepsManagementService) {
    //initialize the current step
    this.steps.currentStep = new Step(5, 'Summary', false, true, false, 'summary');
    //getting the previous steps data
    this.appointmentTypeData = <AppointmentTypeData>this.steps.stepsData.filter(x => x.order == 2)[0];
    this.appointmentSlotData = <AppointmentSlotData>this.steps.stepsData.filter(x => x.order == 3)[0];
    this.appointmentConfirmationData = <AppointmentConfirmationData>this.steps.stepsData.filter(x => x.order == 4)[0];
    let s: AppointmentSummaryData = <AppointmentSummaryData>this.steps.stepsData.filter(x => x.order == 5)[0];
    this.OpticianAppointment = s ? s.OpticianAppointment : false;
    let p: AppointmentSummaryData = new AppointmentSummaryData(5, 'Summary', this.OpticianAppointment);
    this.steps.stepsData.push(p);
    this.steps.currentStep.validated = true;
    let index = this.steps.Steps.findIndex(x => x.order == 5);
    this.steps.Steps[index].validated = true;
  }

  ngOnInit(): void {

  }
  //optician checkbox change:
  onOpticianAppointmentChange() {
    this.steps.clearSteps(5);
    let p: AppointmentSummaryData = new AppointmentSummaryData(5, 'Summary', this.OpticianAppointment);
    this.steps.stepsData.push(p);
    this.steps.currentStep.validated = true;
    let index = this.steps.Steps.findIndex(x => x.order == 5);
    this.steps.Steps[index].validated = true;
  }

}
