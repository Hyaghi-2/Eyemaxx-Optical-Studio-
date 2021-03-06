import { Component, HostListener, OnInit } from '@angular/core';
import { AppointmentSlotsResponse } from '../../models/get-appointments-slots/appointment-slots-response';
import { Doctor } from '../../models/get-stores-types-doctors/doctor';
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
  //any optomitrist data 
  AnyOptomitristApiResponse: AppointmentSlotsResponse[] = [];
  //appointment slots api reponse 
  AllAppointments: AppointmentSlotsResponse = new AppointmentSlotsResponse();
  //Min and Max date for the callendar 
  MinDate!: Date;
  MaxDate!: Date;
  //selected date and time slot
  SelectedDate!: Date;
  SelectedSlot: SlotViewModel = new SlotViewModel(-1, 'x', 'x', -80);
  //distinct appointments
  ActiveDistinctAppointments: AppointmentViewModel[] = [];
  InvalidDates: Date[] = [];
  //active time slots
  ActiveSlots: SlotViewModel[] = [];
  //validate selection event 
  DateSelectedValidated: boolean = false;
  SlutSelectedValidated: boolean = false;
  //callendar disable and spinners status 
  CallendarDisabled!: boolean;
  isLoadingSpinnerEnabled!: boolean;
  ViewedMonths: number = 0;
  constructor(private serv: BookingModuleService, private steps: StepsManagementService) {
    this.CallendarDisabled = true;
    this.isLoadingSpinnerEnabled = true;
    //view 2 or 1 months based on the screen width
    this.ViewedMonths = window.innerWidth > 500 ? 2 : 1;
    //check if the user entered this step before 
    let s: AppointmentSlotData = <AppointmentSlotData>this.steps.stepsData.filter(x => x.order == 3)[0];
    //get the previous step data 
    let p: AppointmentTypeData = <AppointmentTypeData>this.steps.stepsData.filter(x => x.order == 2)[0];

    if (!s) {
      // if the user entered this step for the first time initialize the step 
      this.steps.currentStep = new Step(3, 'AppointmentsSlots', false, true, false, 'date-time');
      //check if the selected exam type related to any optimitrist or an optician (not specific doctor)
      if ((p.isOptomitrist && p.Staff.id == -1) || (p.isOpticain && !p.isEdgeDown)) {
        let tempStaff: Doctor[] = [];
        if (p.isOptomitrist && p.Staff.id == -1) {
          this.serv.getAvailableAppointmentSluts(this.serv.accountsId.toString(), this.serv.companyName, p.ExamType.id.toString(), '6').subscribe(x => {
            let a: AppointmentSlotsResponse = new AppointmentSlotsResponse();
            a.staffId = 6;
            a.Initialize(x);
            this.AnyOptomitristApiResponse.push(a);
            this.serv.getAvailableAppointmentSluts(this.serv.accountsId.toString(), this.serv.companyName, p.ExamType.id.toString(), '7').subscribe(y => {
              let b: AppointmentSlotsResponse = new AppointmentSlotsResponse();
              b.staffId = 7;
              b.Initialize(y);
              this.AnyOptomitristApiResponse.push(b);
              this.serv.getAvailableAppointmentSluts(this.serv.accountsId.toString(), this.serv.companyName, p.ExamType.id.toString(), '8').subscribe(z => {
                let c: AppointmentSlotsResponse = new AppointmentSlotsResponse();
                c.staffId = 8;
                c.Initialize(z);
                this.AnyOptomitristApiResponse.push(c);
                this.serv.getAvailableAppointmentSluts(this.serv.accountsId.toString(), this.serv.companyName, p.ExamType.id.toString(), '9').subscribe(w => {
                  let d: AppointmentSlotsResponse = new AppointmentSlotsResponse();
                  d.staffId = 9;
                  d.Initialize(w);
                  this.AnyOptomitristApiResponse.push(d);
                  this.InitializeAnyOptomitristSlots();
                  //Delete the first 4 appointments from today
                  let today: Date = new Date();
                  today.setHours(0, 0, 0, 0);
                  let lastAppoitment: Date = new Date();
                  lastAppoitment.setDate(lastAppoitment.getDate() + 30);
                  lastAppoitment.setHours(0, 0, 0, 0);
                  let firstAppointment: Date = this.ActiveDistinctAppointments[0].AppointmentDate;
                  firstAppointment.setHours(0, 0, 0, 0);
                  //if the first slot is today delete the first 4 slots 
                  if (today.toDateString() == firstAppointment.toDateString()) {
                    this.ActiveDistinctAppointments[0].Slots.splice(0, 4);
                    if (this.ActiveDistinctAppointments[0].Slots.length <= 0) {
                      this.InvalidDates.push(firstAppointment);
                    }
                  }
                  // initialize the callendar min date with first slot 
                  this.MinDate = this.ActiveDistinctAppointments[0].AppointmentDate;
                  let index: number = this.ActiveDistinctAppointments.findIndex(x => x.AppointmentDate.toDateString() == lastAppoitment.toDateString());
                  //if the last appointment is after 30 days the set it with the founded date 
                  if (index > -1) {
                    this.MaxDate = this.ActiveDistinctAppointments[index].AppointmentDate;
                  }
                  //else set it with the last slot in the arry
                  else {
                    this.MaxDate = this.ActiveDistinctAppointments[this.ActiveDistinctAppointments.length - 1].AppointmentDate;
                  }
                  // initialize the callendar to disable the date that is not exists in the api reponse
                  this.InitializeInvalidDates();
                  //set the selected date with min date 
                  this.SelectedDate = this.MinDate;
                  this.CallendarDisabled = false;
                  this.isLoadingSpinnerEnabled = false;

                });
              });
            });
          });
        }
        else if (p.isOpticain && !p.isEdgeDown) {


          this.serv.getAvailableAppointmentSluts(this.serv.accountsId.toString(), this.serv.companyName, p.ExamType.id.toString(), '10').subscribe(y => {
            let b: AppointmentSlotsResponse = new AppointmentSlotsResponse();
            b.staffId = 10;
            b.Initialize(y);
            this.AnyOptomitristApiResponse.push(b);
            this.serv.getAvailableAppointmentSluts(this.serv.accountsId.toString(), this.serv.companyName, p.ExamType.id.toString(), '24').subscribe(z => {
              let c: AppointmentSlotsResponse = new AppointmentSlotsResponse();
              c.staffId = 24;
              c.Initialize(z);
              this.AnyOptomitristApiResponse.push(c);
              this.serv.getAvailableAppointmentSluts(this.serv.accountsId.toString(), this.serv.companyName, p.ExamType.id.toString(), '409').subscribe(w => {
                let d: AppointmentSlotsResponse = new AppointmentSlotsResponse();
                d.staffId = 409;
                d.Initialize(w);
                this.AnyOptomitristApiResponse.push(d);
                this.InitializeAnyOptomitristSlots();
                //Delete the first 4 appointments from today
                let today: Date = new Date();
                today.setHours(0, 0, 0, 0);
                let lastAppoitment: Date = new Date();
                lastAppoitment.setDate(lastAppoitment.getDate() + 30);
                lastAppoitment.setHours(0, 0, 0, 0);
                let firstAppointment: Date = this.ActiveDistinctAppointments[0].AppointmentDate;
                firstAppointment.setHours(0, 0, 0, 0);
                //if the first slot is today delete the first 4 slots 
                if (today.toDateString() == firstAppointment.toDateString()) {
                  this.ActiveDistinctAppointments[0].Slots.splice(0, 4);
                  if (this.ActiveDistinctAppointments[0].Slots.length <= 0) {
                    this.InvalidDates.push(firstAppointment);
                  }
                }
                // initialize the callendar min date with first slot 
                this.MinDate = this.ActiveDistinctAppointments[0].AppointmentDate;
                let index: number = this.ActiveDistinctAppointments.findIndex(x => x.AppointmentDate.toDateString() == lastAppoitment.toDateString());
                //if the last appointment is after 30 days the set it with the founded date 
                if (index > -1) {
                  this.MaxDate = this.ActiveDistinctAppointments[index].AppointmentDate;
                }
                //else set it with the last slot in the arry
                else {
                  this.MaxDate = this.ActiveDistinctAppointments[this.ActiveDistinctAppointments.length - 1].AppointmentDate;
                }
                // initialize the callendar to disable the date that is not exists in the api reponse
                this.InitializeInvalidDates();
                //set the selected date with min date 
                this.SelectedDate = this.MinDate;
                this.CallendarDisabled = false;
                this.isLoadingSpinnerEnabled = false;

              });
            });
          });
        }



      }
      //if the exam type related to specific doctor pass the doctor id to the query string 
      else {
        if (p.isEdgeDown && p.isOpticain) {
          this.serv.getAvailableAppointmentSluts(this.serv.accountsId.toString(), this.serv.companyName, '55170', '409').subscribe(x => {
            this.AllAppointments.staffId = p.Staff.id;
            this.AllAppointments.Initialize(x);
            this.InitializeAppointmentsSlots();
            let today: Date = new Date();
            today.setHours(0, 0, 0, 0);
            let lastAppoitment: Date = new Date();
            lastAppoitment.setDate(lastAppoitment.getDate() + 30);
            lastAppoitment.setHours(0, 0, 0, 0);
            let firstAppointment: Date = this.ActiveDistinctAppointments[0].AppointmentDate;
            firstAppointment.setHours(0, 0, 0, 0);

            if (today.toDateString() == firstAppointment.toDateString()) {
              this.ActiveDistinctAppointments[0].Slots.splice(0, 4);
              if (this.ActiveDistinctAppointments[0].Slots.length <= 0) {
                this.InvalidDates.push(firstAppointment);
              }


            }
            this.MinDate = this.ActiveDistinctAppointments[0].AppointmentDate;
            let index: number = this.ActiveDistinctAppointments.findIndex(x => x.AppointmentDate.toDateString() == lastAppoitment.toDateString());
            if (index > -1) {
              this.MaxDate = this.ActiveDistinctAppointments[index].AppointmentDate;
            }
            else {
              this.MaxDate = this.ActiveDistinctAppointments[this.ActiveDistinctAppointments.length - 1].AppointmentDate;
            }
            this.SelectedDate = this.MinDate;
            this.InitializeInvalidDates();
            this.CallendarDisabled = false;
            this.isLoadingSpinnerEnabled = false;
          });
        } else {
          this.serv.getAvailableAppointmentSluts(this.serv.accountsId.toString(), this.serv.companyName, p.ExamType.id.toString(), p.Staff.id.toString()).subscribe(x => {
            this.AllAppointments.staffId = p.Staff.id;
            this.AllAppointments.Initialize(x);
            this.InitializeAppointmentsSlots();
            let today: Date = new Date();
            today.setHours(0, 0, 0, 0);
            let lastAppoitment: Date = new Date();
            lastAppoitment.setDate(lastAppoitment.getDate() + 30);
            lastAppoitment.setHours(0, 0, 0, 0);
            let firstAppointment: Date = this.ActiveDistinctAppointments[0].AppointmentDate;
            firstAppointment.setHours(0, 0, 0, 0);

            if (today.toDateString() == firstAppointment.toDateString()) {
              this.ActiveDistinctAppointments[0].Slots.splice(0, 4);
              if (this.ActiveDistinctAppointments[0].Slots.length <= 0) {
                this.InvalidDates.push(firstAppointment);
              }

            }
            this.MinDate = this.ActiveDistinctAppointments[0].AppointmentDate;
            let index: number = this.ActiveDistinctAppointments.findIndex(x => x.AppointmentDate.toDateString() == lastAppoitment.toDateString());
            if (index > -1) {
              this.MaxDate = this.ActiveDistinctAppointments[index].AppointmentDate;
            }
            else {
              this.MaxDate = this.ActiveDistinctAppointments[this.ActiveDistinctAppointments.length - 1].AppointmentDate;
            }
            this.SelectedDate = this.MinDate;
            this.InitializeInvalidDates();
            this.CallendarDisabled = false;
            this.isLoadingSpinnerEnabled = false;
          });
        }

      }
    }
    //if not the first time for the user in this step 
    else {
      setTimeout(() => {
        this.steps.currentStep = new Step(3, 'AppointmentsSlots', false, true, false, 'date-time');
        this.MinDate = s.MinDate;
        this.MaxDate = s.MaxDate;
        this.SelectedDate = s.SelectedDate;
        this.ActiveDistinctAppointments = s.ActiveDistinctAppointments;
        this.InvalidDates = s.InvalidAppointments;
        this.CallendarDisabled = s.CallendarDisabled;
        this.isLoadingSpinnerEnabled = false;
        this.SelectedSlot = s.SelectedTimeSlot;
        this.ActiveSlots = s.ActiveSlots;
      }, 2000);

    }
  }

  ngOnInit(): void {
  }



  //initialze the api reponse method 
  InitializeAppointmentsSlots() {
    this.AllAppointments.AppointmentSlotsList.sort(function (a, b) {
      if (a.start < b.start)
        return -1;
      if (a.start > b.start)
        return 1
      return 0;
    });
    this.AllAppointments.AppointmentSlotsList.forEach(s => {
      let t: AppointmentViewModel = this.ActiveDistinctAppointments.filter(x => x.AppointmentDate.toDateString() == s.start.toDateString())[0];
      if (!t) {
        let slot: SlotViewModel = new SlotViewModel(s.id, this.formatSlot(s.start.toTimeString()), this.formatSlot(s.end.toTimeString()), s.doctorId);
        let a: AppointmentViewModel = new AppointmentViewModel();
        a.AppointmentDate = s.start;
        a.Slots.push(slot);
        this.ActiveDistinctAppointments.push(a);
      } else {
        let index: number = this.ActiveDistinctAppointments.findIndex(x => x.AppointmentDate == t.AppointmentDate);
        let slot: SlotViewModel = new SlotViewModel(s.id, this.formatSlot(s.start.toTimeString()), this.formatSlot(s.end.toTimeString()), s.doctorId);
        let slotIndex: number = this.ActiveDistinctAppointments[index].Slots.findIndex(x => x.start == slot.start && x.end == slot.end);
        if (slotIndex < 0) {
          this.ActiveDistinctAppointments[index].Slots.push(slot);
        }
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
    this.SelectedSlot = new SlotViewModel(slot.id, slot.start, slot.end, slot.doctorId);
    if (this.SlutSelectedValidated && this.DateSelectedValidated) {
      this.steps.currentStep.validated = true;
      let s: AppointmentSlotData = new AppointmentSlotData(3, 'AppointmentsSlots', this.CallendarDisabled, this.SelectedDate, this.MinDate, this.MaxDate, this.ActiveDistinctAppointments, this.InvalidDates, this.SelectedSlot, this.ActiveSlots);
      this.steps.stepsData.push(s);
      this.steps.Steps.filter(x => x.order == this.steps.currentStep.order + 1)[0].enabled = this.steps.currentStep.validated;

    }
  }

  InitializeAnyOptomitristSlots() {
    this.AllAppointments.AppointmentSlotsList = [];
    this.AnyOptomitristApiResponse.forEach(x => {
      x.AppointmentSlotsList.forEach(x => {
        this.AllAppointments.AppointmentSlotsList.push(x);
      });
    });
    this.InitializeAppointmentsSlots();
  }
}


