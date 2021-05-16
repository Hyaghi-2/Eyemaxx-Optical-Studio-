import { Component, OnInit } from '@angular/core';
import { AppointmentSlotsResponse } from '../../models/get-appointments-slots/appointment-slots-response';
import { Step } from '../../models/Step/step';
import { AppointmentSlotData } from '../../models/Steps-Data/appointment-slot-data';
import { AppointmentTypeData } from '../../models/Steps-Data/appointment-type-data';
import { AppointmentViewModel } from '../../models/Steps-Data/appointment-view-model';
import { SlotViewModel } from '../../models/Steps-Data/slot-view-model';
import { BookingModuleService } from '../../services/booking-module-service.service';
import { StepsManagementService } from '../../services/steps-management.service';

@Component({
  selector: 'app-appointmentsluts',
  templateUrl: './appointmentsluts.component.html',
  styleUrls: ['./appointmentsluts.component.css']
})
export class AppointmentslutsComponent implements OnInit {
  accountsId: string = '1922';
  companyName: string = 'Eyemaxx Optical Studio';
  AllAppointments: AppointmentSlotsResponse = new AppointmentSlotsResponse();
  MinDate!: Date;
  MaxDate!: Date;
  SelectedDate!: Date;
  SelectedSlot!: SlotViewModel;
  ActiveDistinctAppointments: AppointmentViewModel[] = [];
  InvalidDates: Date[] = [];
  ActiveSlots: SlotViewModel[] = [];
  DateSelectedValidated!: boolean;
  SlutSelectedValidated!: boolean;
  CallendarDisabled!: boolean;
  constructor(private serv: BookingModuleService, private steps: StepsManagementService) {
    this.CallendarDisabled = true;
    let s: AppointmentSlotData = <AppointmentSlotData>this.steps.stepsData.filter(x => x.order == 3)[0];
    let p: AppointmentTypeData = <AppointmentTypeData>this.steps.stepsData.filter(x => x.order == 2)[0];

    if (!s) {
      this.steps.currentStep = new Step(3, 'AppointmentsSlots', false, false, false, 'date-time');
      if ((p.isOptomitrist && p.Staff.id == -1) || !p.isOptomitrist) {
        this.serv.getAvailableAppointmentSluts(this.accountsId, this.companyName, p.ExamType.id.toString()).subscribe(x => {
          this.AllAppointments.Initialize(x);
          this.MinDate = new Date();
          this.MinDate.setDate(this.AllAppointments.AppointmentSlotsList[0].start.getDate() + 2);
          this.MaxDate = new Date();
          this.MaxDate = this.AllAppointments.AppointmentSlotsList[this.AllAppointments.AppointmentSlotsList.length - 1].start;
          this.InitializeAppointmentsSlots();
          this.InitializeInvalidDates();
          this.CallendarDisabled = false;
        });
      } else {
        this.serv.getAvailableAppointmentSluts(this.accountsId, this.companyName, p.ExamType.id.toString(), p.Staff.id.toString()).subscribe(x => {
          this.AllAppointments.Initialize(x);
          this.MinDate = new Date();
          this.MinDate.setDate(this.AllAppointments.AppointmentSlotsList[0].start.getDate() + 2);
          this.MaxDate = new Date();
          this.MaxDate = this.AllAppointments.AppointmentSlotsList[this.AllAppointments.AppointmentSlotsList.length - 1].start;
          this.InitializeAppointmentsSlots();
          this.InitializeInvalidDates();
          this.CallendarDisabled = false;
        });
      }
    }
    else {
      this.MinDate = s.MinDate;
      this.MaxDate = s.MaxDate;
      this.SelectedDate = s.SelectedDate;
      this.ActiveDistinctAppointments = s.ActiveDistinctAppointments;
      this.InvalidDates = s.InvalidAppointments;
      this.CallendarDisabled = s.CallendarDisabled;
    }
  }

  ngOnInit(): void {


  }



  InitializeAppointmentsSlots() {
    this.AllAppointments.AppointmentSlotsList.forEach(s => {
      let t: AppointmentViewModel = this.ActiveDistinctAppointments.filter(x => x.AppointmentDate.toDateString() == s.start.toDateString())[0];
      if (!t) {
        let slot: SlotViewModel = new SlotViewModel(s.id, s.start.toTimeString(), s.end.toTimeString());
        let a: AppointmentViewModel = new AppointmentViewModel();
        a.AppointmentDate = s.start;
        a.Slots.push(slot);
        this.ActiveDistinctAppointments.push(a);
      } else {
        let index: number = this.ActiveDistinctAppointments.findIndex(x => x.AppointmentDate == t.AppointmentDate);
        let slot: SlotViewModel = new SlotViewModel(s.id, s.start.toTimeString(), s.end.toTimeString());
        this.ActiveDistinctAppointments[index].Slots.push(slot);
      }
    });
  }

  InitializeInvalidDates() {
    let counter: Date = new Date();
    let max: Date = this.MaxDate;
    max.setHours(0, 0, 0, 0);
    counter.setHours(0, 0, 0, 0);
    let tempDisctinctaApp: AppointmentViewModel[] = [];
    this.ActiveDistinctAppointments.forEach(x => {
      let tempAppointment: AppointmentViewModel = new AppointmentViewModel();
      tempAppointment = x;
      tempAppointment.AppointmentDate.setHours(0, 0, 0, 0);
      tempDisctinctaApp.push(x);
    });
    while (counter.toDateString() != max.toDateString()) {
      let s: AppointmentViewModel = tempDisctinctaApp.filter(x => x.AppointmentDate.toDateString() == counter.toDateString())[0];
      if (!s) {
        let tempDate: Date = new Date(counter);
        tempDate.setHours(0, 0, 0, 0);
        this.InvalidDates.push(tempDate);
      }
      counter.setDate(counter.getDate() + 1);
      counter.setHours(0, 0, 0, 0);
    }

  }

  onCallendarSelect() {
    console.log(this.SelectedDate);

    this.DateSelectedValidated = true;
    this.steps.clearSteps(3);
    this.ActiveDistinctAppointments.forEach(x => {
      x.AppointmentDate.setHours(0, 0, 0, 0);
    })
    this.SelectedDate.setHours(0, 0, 0, 0);
    this.ActiveSlots = this.ActiveDistinctAppointments.filter(x => x.AppointmentDate.toDateString() == this.SelectedDate.toDateString())[0].Slots;
  }


  formatSlot(s: string) {
    return s.substring(0, 5);
  }

  onSlotSelect(slot: SlotViewModel) {
    this.SlutSelectedValidated = true;
    this.steps.clearSteps(3);
    this.SelectedSlot = new SlotViewModel(slot.id, slot.start, slot.end);
    if (this.SlutSelectedValidated && this.DateSelectedValidated) {
      this.steps.currentStep.validated = true;
      let s: AppointmentSlotData = new AppointmentSlotData(3, 'AppointmentsSlots', this.CallendarDisabled, this.SelectedDate, this.MinDate, this.MaxDate, this.ActiveDistinctAppointments, this.InvalidDates, this.SelectedSlot);
      this.steps.stepsData.push(s);
      this.steps.Steps.filter(x => x.order == this.steps.currentStep.order + 1)[0].enabled = this.steps.currentStep.validated;
    }
  }
}


