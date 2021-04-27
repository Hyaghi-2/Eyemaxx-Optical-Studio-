import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//main components
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


//assets modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BaseContentComponent, ErrormessageComponent, PagenotfoundComponent, CovidPreScreeningComponent, OptimitristOpticianSelectionComponent, AppointmentstypesComponent, AppointmentslutsComponent, AppointmentsummaryComponent, OpticianappointmentComponent, AppointmentconfirmationComponent],


@NgModule({
  declarations: [BaseContentComponent, ErrormessageComponent, PagenotfoundComponent],


@NgModule({
  declarations: [BaseContentComponent, ErrormessageComponent, PagenotfoundComponent],

  imports: [
    CommonModule,
    OnlineBookingModuleRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BookingModuleService,
    multi: true
  }]
})
export class OnlineBookingModuleModule { }
