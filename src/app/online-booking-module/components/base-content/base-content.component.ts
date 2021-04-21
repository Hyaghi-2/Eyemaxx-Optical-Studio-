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
    this.serv.getPatientList('williamnodfah@gmail.com').subscribe(s => {
      console.log(s);

    });
  }

}
