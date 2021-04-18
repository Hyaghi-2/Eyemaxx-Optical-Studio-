import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnlineBookingModuleModule } from './online-booking-module/online-booking-module.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OnlineBookingModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
