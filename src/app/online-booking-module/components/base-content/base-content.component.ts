import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAppointmentBody } from '../../models/book-appointment/book-appointment-body';
import { FailedAppointmentResponse } from '../../models/book-appointment/failed-appointment-response';
import { Step } from '../../models/Step/step';
import { AppointmentConfirmationData } from '../../models/Steps-Data/appointment-confirmation-data';
import { AppointmentSlotData } from '../../models/Steps-Data/appointment-slot-data';
import { AppointmentSummaryData } from '../../models/Steps-Data/appointment-summary-data';
import { AppointmentTypeData } from '../../models/Steps-Data/appointment-type-data';
import { BookingModuleService } from '../../services/booking-module-service.service';
import { StepsManagementService } from '../../services/steps-management.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';



@Component({
  selector: 'app-base-content',
  templateUrl: './base-content.component.html',
  styleUrls: ['./base-content.component.css'],
  providers: [MessageService]
})
export class BaseContentComponent implements OnInit {
  showBookAppointmentPopUp: boolean = false;
  accountsId: number = 2040;
  companyName: string = 'Test Eyemaxx';
  popUpMessage: string = '';
  popUpToastMessage: string = '';
  popIconType: string = '';
  bookingSuccess: boolean = false;
  constructor(private steps: StepsManagementService,
    private router: Router, private route: ActivatedRoute,
    private serv: BookingModuleService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }


  ngOnInit(): void {

    this.primengConfig.ripple = true;
    this.serv.getStoresTypesDoctors(this.accountsId, this.companyName).subscribe(t => {
      this.steps.ExamTypesPreFetch.Initialize(t);
    });
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
      body.storeId = 1;
      body.slotId = appointmentSlotData.SelectedTimeSlot.id;
      body.patientId = +appointmentConfirmationData.SelectedUser.id.split('-')[1]
      if (appointmentTypeData.isOptomitrist) {
        body.doctorId = appointmentTypeData.Staff.id.toString();
      }
      console.log(body);

      if (appointmentSummaryData.OpticianAppointment) {
        //call email api
      }
      this.serv.bookNewAppointment(body).subscribe(x => {
        console.log(x);
        console.log(x instanceof FailedAppointmentResponse);

        if (!x.hasOwnProperty('smsversion')) {
          this.popUpMessage = 'You have already booked an appointment';
          this.popUpToastMessage = 'You have already booked an appointment';
          this.popIconType = 'pi pi-info-circle';
          this.showBookAppointmentPopUp = true;
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: this.popUpToastMessage });
        }
        else {
          this.bookingSuccess = true;
          this.popUpMessage = 'Your appoitment successfully booked !';
          this.popUpToastMessage = 'Your appoitment successfully booked !';
          this.popIconType = 'pi pi-check-circle';
          this.showBookAppointmentPopUp = true;
          this.messageService.add({ severity: 'success', summary: 'Succeed', detail: this.popUpToastMessage });
        }
      });
    }
  }


  popUpNavigation(route: string) {
    if (route == 'home') {
      window.location.href = "https://www.eyemaxx.ca";
    }
    else {
      this.steps.clearSteps(0);
      this.router.navigate(['appointment/covid19']);
    }
    this.showBookAppointmentPopUp = false;
  }

}
/*select*from!groupby@*/
