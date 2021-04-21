import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineBookingModuleRoutingModule } from './online-booking-module-routing.module';
import { BaseContentComponent } from './components/base-content/base-content.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BookingModuleService } from './services/booking-module-service.service';

@NgModule({
  declarations: [BaseContentComponent],
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
