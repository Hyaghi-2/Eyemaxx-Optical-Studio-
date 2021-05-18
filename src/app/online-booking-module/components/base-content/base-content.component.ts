import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAppointmentBody } from '../../models/book-appointment/book-appointment-body';
import { Step } from '../../models/Step/step';
import { AppointmentConfirmationData } from '../../models/Steps-Data/appointment-confirmation-data';
import { AppointmentSlotData } from '../../models/Steps-Data/appointment-slot-data';
import { AppointmentSummaryData } from '../../models/Steps-Data/appointment-summary-data';
import { AppointmentTypeData } from '../../models/Steps-Data/appointment-type-data';
import { BookingModuleService } from '../../services/booking-module-service.service';
import { StepsManagementService } from '../../services/steps-management.service';

@Component({
  selector: 'app-base-content',
  templateUrl: './base-content.component.html',
  styleUrls: ['./base-content.component.css']
})
export class BaseContentComponent implements OnInit {
  showBookAppointmentPopUp: boolean = false;
  constructor(private steps: StepsManagementService,
    private router: Router, private route: ActivatedRoute,
    private serv: BookingModuleService) { }


  ngOnInit(): void {

  }

  stepsEnabled(_order: number) {
    let enabled: boolean = this.steps.Steps.filter(x => x.order == _order)[0].enabled;
    return enabled;
  }

  currentStepStatus(): Step {
    return this.steps.currentStep;
  }

  navigate(id: number) {
    let s: string = this.steps.Steps.filter(x => x.order == id)[0].route;
    this.router.navigate([s], { relativeTo: this.route });
  }

  BookAppointment() {
    if (this.currentStepStatus().order == 5) {
      let appointmentTypeData: AppointmentTypeData = <AppointmentTypeData>this.steps.stepsData.filter(x => x.order == 2)[0];
      let appointmentSlotData: AppointmentSlotData = <AppointmentSlotData>this.steps.stepsData.filter(x => x.order == 3)[0];
      let appointmentConfirmationData: AppointmentConfirmationData = <AppointmentConfirmationData>this.steps.stepsData.filter(x => x.order == 4)[0];
      let appointmentSummaryData: AppointmentSummaryData = <AppointmentSummaryData>this.steps.stepsData.filter(x => x.order == 5)[0];
      let body: BookAppointmentBody = new BookAppointmentBody();
      body.appointmentTypeId = appointmentTypeData.ExamType.id;
      if (appointmentTypeData.isOptomitrist) {
        body.doctorId = appointmentTypeData.Staff.id;
      }
      body.storeId = appointmentSlotData.SelectedTimeSlot.id;
      body.patientId = +appointmentConfirmationData.SelectedUser.id;
      if (appointmentSummaryData.OpticianAppointment) {
        //call email api
      }
      this.serv.bookNewAppointment(body).subscribe(x => {
        this.showBookAppointmentPopUp = true;
      });
    }
  }


  popUpNavigation(route: string) {
    if (route == 'home') {
      //navigate to home
    }
    else {
     //navigate to new appointment
    }
  }

}
/*select*from!groupby@*/
