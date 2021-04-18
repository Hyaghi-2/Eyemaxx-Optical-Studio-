import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineBookingModuleRoutingModule } from './online-booking-module-routing.module';
import { BaseContentComponent } from './components/base-content/base-content.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [BaseContentComponent],
  imports: [
    CommonModule,
    OnlineBookingModuleRoutingModule,
    HttpClientModule

  ]
})
export class OnlineBookingModuleModule { }
