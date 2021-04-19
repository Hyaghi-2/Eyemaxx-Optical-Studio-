import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { LoginBody } from '../models/login/login-body';
import { LoginResponse } from '../models/login/login-response';
@Injectable({
  providedIn: 'root'
})
export class BookingModuleService {
  private Url: string = environment.ApiUrl;
  constructor(private http: HttpClient) { }

  generateAPIKey(data: LoginBody): Observable<LoginResponse> {
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Basic ' + btoa('carlo:1234')
      })
    }
    return this.http.post<LoginResponse>(this.Url + '/login/doctors', data, options);
  }

  getAvailableAppointmentSluts(){
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'token':'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDQwfHUzMzR8MXxmYWxzZSIsImV4cCI6MTYxODkyNTY2Mn0.hFMlPpU8a2YWHJZWjRveHcSe4--aHdNbDr9pEVF0LRLF2N5n3HWkVWI9mPGPDtA3DBB8ACcGH4lASVmm_1qrBA'
      })
    };
    return this.http.get('https://testing.orderoptical.com/Web/Appointment/list?accountsId=2040&companyName=Test EyeMaxx&storeId=1&appointmentTypeId=13&doctorId=332&storeTimeZone=Canada/Eastern&locale=en',options);
  }

}
