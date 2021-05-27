import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineBookingModuleRoutingModule } from './online-booking-module-routing.module';
import { BaseContentComponent } from './components/base-content/base-content.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BookingModuleService } from './services/booking-module-service.service';
import { ErrormessageComponent } from './components/errormessage/errormessage.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { CovidPreScreeningComponent } from './components/covid-pre-screening/covid-pre-screening.component';
import { OptimitristOpticianSelectionComponent } from './components/optimitrist-optician-selection/optimitrist-optician-selection.component';
import { AppointmentstypesComponent } from './components/appointmentstypes/appointmentstypes.component';
import { AppointmentslutsComponent } from './components/appointmentsluts/appointmentsluts.component';
import { AppointmentsummaryComponent } from './components/appointmentsummary/appointmentsummary.component';
import { OpticianappointmentComponent } from './components/opticianappointment/opticianappointment.component';
import { AppointmentconfirmationComponent } from './components/appointmentconfirmation/appointmentconfirmation.component';
import { CalendarModule } from 'primeng/calendar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [BaseContentComponent, ErrormessageComponent, PagenotfoundComponent, CovidPreScreeningComponent, OptimitristOpticianSelectionComponent, AppointmentstypesComponent, AppointmentslutsComponent, AppointmentsummaryComponent, OpticianappointmentComponent, AppointmentconfirmationComponent],
  imports: [
    CommonModule,
    OnlineBookingModuleRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    FormsModule, CalendarModule,
    MatFormFieldModule,
    ToastModule, DialogModule, MatCheckboxModule


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BookingModuleService,
    multi: true
  }]
})
export class OnlineBookingModuleModule { }
