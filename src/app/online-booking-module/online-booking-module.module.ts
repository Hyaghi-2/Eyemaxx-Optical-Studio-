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

@NgModule({
  declarations: [BaseContentComponent, ErrormessageComponent, PagenotfoundComponent, CovidPreScreeningComponent, OptimitristOpticianSelectionComponent],
  imports: [
    CommonModule,
    OnlineBookingModuleRoutingModule,
    HttpClientModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BookingModuleService,
    multi: true
  }]
})
export class OnlineBookingModuleModule { }
