import { Component, OnInit } from '@angular/core';
import { AppointmentSlotsResponse } from '../../models/get-appointments-slots/appointment-slots-response';
import { AppointmentTypeData } from '../../models/Steps-Data/appointment-type-data';
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
  SelectedDate: Date = new Date();
  constructor(private serv: BookingModuleService, private steps: StepsManagementService) { }

  ngOnInit(): void {
    let p: AppointmentTypeData = <AppointmentTypeData>this.steps.stepsData.filter(x => x.order == 3)[0];
    this.SelectedDate.setDate((new Date()).getDate() + 2);
    console.log(this.SelectedDate.toTimeString());
    
    // this.serv.getAvailableAppointmentSluts(this.accountsId, this.companyName, p.ExamTypeId.toString(), p.StaffId.toString()).subscribe(x => {
    //   console.log(x);
    //   this.AllAppointments.Initialize(x);
    //   console.log(this.AllAppointments);
    // });

    this.serv.getAvailableAppointmentSluts(this.accountsId, this.companyName, '1291', '409').subscribe(x => {
      console.log(x);
      this.AllAppointments.Initialize(x);
      this.MinDate = new Date();
      this.MaxDate = new Date();
      console.log(this.AllAppointments.AppointmentSlotsList[0].start);
      console.log(this.AllAppointments.AppointmentSlotsList[0].end);
      console.log(this.AllAppointments.AppointmentSlotsList[this.AllAppointments.AppointmentSlotsList.length - 1].start);

      this.MinDate.setDate(this.AllAppointments.AppointmentSlotsList[0].start.getDate() + 2);
      this.MaxDate.setDate(this.AllAppointments.AppointmentSlotsList[this.AllAppointments.AppointmentSlotsList.length - 1].start.getDate())
      console.log(this.MaxDate.toDateString());
      console.log(this.MinDate.toDateString());

    });
  }

  InitializeDate(d: Date) {

  }

}
