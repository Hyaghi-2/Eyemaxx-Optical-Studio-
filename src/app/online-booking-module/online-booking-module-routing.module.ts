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
import { TempComponent } from './components/temp/temp.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/appointment/covid19', pathMatch: 'full' },

  {
    path: 'appointment', component: BaseContentComponent,
    children: [
      { path: 'covid19', component: CovidPreScreeningComponent, canActivate: [AuthGuard] },
      { path: 'appointment-type', component: AppointmentstypesComponent, canActivate: [AuthGuard] },
      { path: 'date-time', component: AppointmentslutsComponent, canActivate: [AuthGuard] },
      { path: 'confirmation', component: AppointmentconfirmationComponent, canActivate: [AuthGuard] },
      { path: 'summary', component: AppointmentsummaryComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'error', component: ErrormessageComponent },
  { path: 'temp', component: TempComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineBookingModuleRoutingModule { }
