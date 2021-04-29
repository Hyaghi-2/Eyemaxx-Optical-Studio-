import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentconfirmationComponent } from './components/appointmentconfirmation/appointmentconfirmation.component';
import { AppointmentslutsComponent } from './components/appointmentsluts/appointmentsluts.component';
import { AppointmentstypesComponent } from './components/appointmentstypes/appointmentstypes.component';
import { AppointmentsummaryComponent } from './components/appointmentsummary/appointmentsummary.component';
import { BaseContentComponent } from './components/base-content/base-content.component';
import { CovidPreScreeningComponent } from './components/covid-pre-screening/covid-pre-screening.component';
import { ErrormessageComponent } from './components/errormessage/errormessage.component';
import { OpticianappointmentComponent } from './components/opticianappointment/opticianappointment.component';
import { OptimitristOpticianSelectionComponent } from './components/optimitrist-optician-selection/optimitrist-optician-selection.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'appointment', component: BaseContentComponent,
    children: [
      { path: 'covid19', component: CovidPreScreeningComponent },
      { path: 'service-type', component: OptimitristOpticianSelectionComponent, canActivate: [AuthGuard] },
      { path: 'appointment-type', component: AppointmentstypesComponent },
      { path: 'date-time', component: AppointmentslutsComponent },
      { path: 'optician-appointment', component: OpticianappointmentComponent },
      { path: 'confirmation', component: AppointmentconfirmationComponent },
      { path: 'summary', component: AppointmentsummaryComponent }
    ]
  },
  { path: 'error', component: ErrormessageComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineBookingModuleRoutingModule { }
