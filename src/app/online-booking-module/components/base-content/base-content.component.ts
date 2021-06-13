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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from '../../models/create-patient/patient';
import { Emaildata } from '../../models/email-api-data/emaildata';
import { DatePipe } from '@angular/common';
import { AppointmentType } from '../../models/get-stores-types-doctors/appointment-type';



@Component({
  selector: 'app-base-content',
  templateUrl: './base-content.component.html',
  styleUrls: ['./base-content.component.css'],
  providers: [MessageService, DatePipe]
})
export class BaseContentComponent implements OnInit {
  showBookAppointmentPopUp: boolean = false;
  popUpMessage: string = '';
  popUpToastMessage: string = '';
  popIconType: string = '';
  bookingSuccess: boolean = false;
  bookAppointmentSpinnerEnabled: boolean = false;
  windowWidth: number = 0;
  CovidPopUpEnabled: boolean = false;

  constructor(private steps: StepsManagementService,
    private router: Router, private route: ActivatedRoute,
    private serv: BookingModuleService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private http: HttpClient,
    private dp: DatePipe) { }


  ngOnInit(): void {
    if (!localStorage.getItem('reload')) {
      localStorage.setItem('reload', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('reload')
    }
    this.primengConfig.ripple = true;
    this.serv.getStoresTypesDoctors(this.serv.accountsId, this.serv.companyName).subscribe(t => {
      this.steps.ExamTypesPreFetch.Initialize(t);
      this.steps.InitiailzeExamTypes(this.steps.preDefinedExamTypes, this.steps.ExamTypesPreFetch.AppointmentTypes);

    });
    this.CovidPopUpEnabled = true;

  }

  sendEmail(data: Emaildata) {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
        'Access-Control-Allow-Credentials': 'true',
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post('https://appointment-eyemaxx.ca/api/contact1.php', JSON.stringify(data), options);
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
    this.bookAppointmentSpinnerEnabled = true;
    if (this.currentStepStatus().order == 5) {
      let appointmentTypeData: AppointmentTypeData = <AppointmentTypeData>this.steps.stepsData.filter(x => x.order == 2)[0];
      let appointmentSlotData: AppointmentSlotData = <AppointmentSlotData>this.steps.stepsData.filter(x => x.order == 3)[0];
      let appointmentConfirmationData: AppointmentConfirmationData = <AppointmentConfirmationData>this.steps.stepsData.filter(x => x.order == 4)[0];
      let appointmentSummaryData: AppointmentSummaryData = <AppointmentSummaryData>this.steps.stepsData.filter(x => x.order == 5)[0];
      let body: BookAppointmentBody = new BookAppointmentBody();

      body.appointmentTypeId = appointmentTypeData.ExamType.id;
      body.storeId = 1;
      body.slotId = appointmentSlotData.SelectedTimeSlot.id;
      body.patientId = +appointmentConfirmationData.SelectedUser.id.split('-')[1];
      if (appointmentTypeData.isOptomitrist) {
        body.doctorId = appointmentTypeData.Staff.id.toString();
      }
      // console.log(body);


      this.serv.bookNewAppointment(body).subscribe(x => {
        // console.log(x);
        // console.log(x instanceof FailedAppointmentResponse);

        if (!x.hasOwnProperty('smsversion')) {
          this.bookingSuccess = false;
          this.popUpMessage = ' Sorry, this user already has an appointment booked. To book a second appointment, please contact us to book (and then a button that leads them to our contact page ';
          this.popUpToastMessage = ' Sorry you already booked an appointment';
          this.popIconType = 'pi pi-info-circle';
          this.showBookAppointmentPopUp = true;
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: this.popUpToastMessage });
        }
        else {
          if (appointmentSummaryData.OpticianAppointment) {
            //filling email data 
            //filling patient data 
            let data: Emaildata = new Emaildata();
            data.firstName = appointmentConfirmationData.SelectedUser.firstName;
            data.lastName = appointmentConfirmationData.SelectedUser.lastName;
            data.streetName = appointmentConfirmationData.SelectedUser.streetNumber;
            data.streetNumber = appointmentConfirmationData.SelectedUser.streetNumber;
            data.city = appointmentConfirmationData.SelectedUser.city;
            data.province = appointmentConfirmationData.SelectedUser.province;
            data.postalCode = appointmentConfirmationData.SelectedUser.postalCode;
            data.dateOfBirth = appointmentConfirmationData.SelectedUser.dateOfBirth;
            data.cell = appointmentConfirmationData.SelectedUser.cell;
            data.email = appointmentConfirmationData.SelectedUser.email;
            data.medicalCardExp = appointmentConfirmationData.SelectedUser.medicalCardExp;
            data.medicalCard = appointmentConfirmationData.SelectedUser.medicalCard;
            //filling appointment data
            let appointmentDate: any = this.dp.transform(appointmentSlotData.SelectedDate, 'yyyy-MM-dd');
            appointmentDate += ' ' + appointmentSlotData.SelectedTimeSlot.start + '-' + appointmentSlotData.SelectedTimeSlot.end;
            data.appointmentDate = appointmentDate;
            if (appointmentTypeData.isOptomitrist) {

              data.appointmentType = appointmentTypeData.ExamType.name;
              if (appointmentTypeData.Staff.id > -1) {
                data.optimtrist = appointmentTypeData.Staff.firstName + ' ' + appointmentTypeData.Staff.lastName;
              } else {
                data.optimtrist = 'Any Optometrist';
              }
            } else {
              data.optimtrist = appointmentTypeData.ExamType.name;
              data.appointmentType = appointmentTypeData.ExamType.name;
            }
            console.log(data);

            // call email api
            // this.sendEmail(data).subscribe(x => {
            //   console.log(x);
            // });
          }
          this.bookingSuccess = true;
          if (appointmentSummaryData.OpticianAppointment == true) {
            this.popUpMessage = ' Thank you! Your eye exam has been booked and you will receive a SMS confirmation shortly. We have received your request to shop for glasses, you will hear from us soon to confirm this appointment.';
          } else {
            this.popUpMessage = ' Thank you for booking with Eyemaxx, you will receive a SMS confirmation shortly.';
          }
          this.popUpToastMessage = ' Your appoitment successfully booked !';
          this.popIconType = 'pi pi-check-circle';
          this.showBookAppointmentPopUp = true;
          this.messageService.add({ severity: 'success', summary: 'Succeed', detail: this.popUpToastMessage });
        }
        this.bookAppointmentSpinnerEnabled = false;

      });
    }
  }


  popUpNavigation(route: string) {
    if (route == 'home') {
      window.location.href = "https://www.eyemaxx.ca";
    }
    else {
      this.steps.clearSteps(1);
      window.location.reload();
    }
    this.showBookAppointmentPopUp = false;
  }

  onActivate(event: any) {
    window.scrollTo({
      top: 200,
      behavior: 'smooth'
    });
    // let scrollToTop = window.setInterval(() => {
    //   let pos = window.pageYOffset;
    //   if (pos > 0) {
    //     window.scrollTo(0, pos-2); // how far to scroll on each step
    //   } else {
    //     window.clearInterval(scrollToTop);
    //   }
    // }, 20);
  }

}

