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

}
