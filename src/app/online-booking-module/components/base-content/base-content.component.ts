import { Component, OnInit } from '@angular/core';
import { LoginBody } from '../../models/login/login-body';
import { LoginResponse } from '../../models/login/login-response';
import { BookingModuleService } from '../../services/booking-module-service.service';

@Component({
  selector: 'app-base-content',
  templateUrl: './base-content.component.html',
  styleUrls: ['./base-content.component.css']
})
export class BaseContentComponent implements OnInit {
  loginResponse: LoginResponse = new LoginResponse();
  loginBody: LoginBody = new LoginBody();
  constructor(private serv: BookingModuleService) { }

  ngOnInit(): void {

    console.log(btoa('carlo:1234'));
    this.serv.generateAPIKey(this.loginBody).subscribe(response => {
      this.loginResponse.Initialize(response);
      console.log(this.loginResponse);

    });
    this.serv.getAvailableAppointmentSluts().subscribe((s:any)=>{
      console.log(s);
      
      console.log(JSON.parse(JSON.stringify(s["mobileDateTimeSlots"])));
    });
  }

}
