import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import { LoginBody } from '../models/login/login-body';
import { LoginResponse } from '../models/login/login-response';
import { catchError, retry, switchMap } from "rxjs/operators";
import { CreatePatientBody } from '../models/create-patient/create-patient-body';
import { BookAppointmentBody } from '../models/book-appointment/book-appointment-body';
import { FailedAppointmentResponse } from '../models/book-appointment/failed-appointment-response';
import { SuccessfullAppointmentResponse } from '../models/book-appointment/successfull-appointment-response';
import { UpdateBody } from '../models/update-patient-profile/update-body';
import { NavigationExtras, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class BookingModuleService implements HttpInterceptor {
  //intercept the http request to add Authorization headers to the request
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url: string = this.Url + '/login/doctors';
    if (request.url == url) {
      return next.handle(request).pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage: string = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

            switch (error.status) {
              case 400:      //bad request
                errorMessage += '   bad request';
                break;
              case 401:      //login
                errorMessage += '   unauthorized';
                break;
              case 403:     //forbidden
                errorMessage += '   forbidden';
                break;
              case 404:     //not found
                errorMessage += '   not found';
                break;
              case 405:     //method nor allowed
                errorMessage += '   method nor allowed';
                break;
              case 500:     //internal server error
                errorMessage += '   internal server error';
                break;
              case 502:     //bad gateway
                errorMessage += '   bad gateway';
                break;
            }
          }
          let params: NavigationExtras = {
            queryParams: {
              "error": errorMessage,
            }
          };
          this.router.navigate(['/error',], params);
          return throwError(errorMessage);
        })
      );;
    }
    else {
      let loginBody: LoginBody = new LoginBody();
      let loginReponse: LoginResponse = new LoginResponse();
      const options = {
        headers: new HttpHeaders({
          'Accept': 'application/json,*/*',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('carlo:1234')
        }),
      };
      return this.http.post(url, loginBody, options).pipe(switchMap((reponse) => {
        loginReponse.Initialize(reponse);
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            'Accept': 'application/json,*/*',
            'token': loginReponse.getToken
          }
        });
        return next.handle(request).pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            let errorMessage: string = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

              switch (error.status) {
                case 400:      //bad request
                  errorMessage += '   bad request';
                  break;
                case 401:      //login
                  errorMessage += '   unauthorized';
                  break;
                case 403:     //forbidden
                  errorMessage += '   forbidden';
                  break;
                case 404:     //not found
                  errorMessage += '   not found';
                  break;
                case 405:     //method nor allowed
                  errorMessage += '   method nor allowed';
                  break;
                case 500:     //internal server error
                  errorMessage += '   internal server error';
                  break;
                case 502:     //bad gateway
                  errorMessage += '   bad gateway';
                  break;
              }
            }
            let params: NavigationExtras = {
              queryParams: {
                "error": errorMessage,
              }
            };
            this.router.navigate(['/error',], params);
            return throwError(errorMessage);
          })
        );
      }));
    }
  }
  //base api url
  private Url: string = environment.ApiUrl;

  //api credentials
  accountsId: number = 1922;
  companyName: string = 'Eyemaxx Optical Studio';
  //using http client module to make api calls
  constructor(private http: HttpClient, private router: Router) { }
  //login method to generate api key by staff credentials
  generateAPIKey(body: LoginBody): Observable<LoginResponse> {
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Basic ' + btoa('carlo:1234')
      }),

    }
    return this.http.post<LoginResponse>(this.Url + '/login/doctors', body, options);
  }
  //create new patient
  createPatient(body: CreatePatientBody) {
    return this.http.post(this.Url + '/Patient', body);
  }

  //get patient list related to a patient email
  getPatientList(email: string) {
    const params = new HttpParams().set('email', email).set('match', 'all');
    return this.http.get(this.Url + '/Patient/list', { params });
  }


  //get patient info by his ID
  getPatientById(id: string) {
    return this.http.get(this.Url + '/Patient/' + id);
  }

  //get stores doctors and appointments
  getStoresTypesDoctors(accountsId: number, companyName: string) {
    const params = new HttpParams()
      .set('accountsId', accountsId.toString())
      .set('companyName', companyName);
    return this.http.get(this.Url + '/Appointment', { params });
  }


  //get available appointments slots based on query strings parameters
  getAvailableAppointmentSluts(accountsId: string, companyName: string,
    appointmentTypeId: string, doctorId?: string) {
    let params = new HttpParams()
      .set('accountsId', accountsId)
      .set('companyName', companyName)
      .set('storeId', '1')
      .set('appointmentTypeId', appointmentTypeId)
      .set('storeTimeZone', 'Canada/Eastern')
      .set('locale', 'en');


    if (doctorId != undefined) {
      console.log(doctorId);
      params = new HttpParams()
        .set('accountsId', accountsId)
        .set('companyName', companyName)
        .set('storeId', '1')
        .set('appointmentTypeId', appointmentTypeId)
        .set('storeTimeZone', 'Canada/Eastern')
        .set('locale', 'en')
        .set('doctorId', doctorId);
    }
    return this.http.get(this.Url + '/Appointment/list', { params });
  }


  //book new appointment
  bookNewAppointment(body: any): Observable<any> {
    return this.http.post<any>(this.Url + '/Appointment', JSON.stringify(body));
  }

  // bookNewAppointment(body: BookAppointmentBody) {
  //   console.log(JSON.stringify(body));
  //   return this.http.post(this.Url + '/Appointment', JSON.stringify(body));
  // }

  //get specific patient appointments
  getPatientAppointments(id: number) {
    return this.http.get(this.Url + '/Appointment/patient/' + id);
  }

  //get patient profile
  getPatientProfile(id: number) {
    return this.http.get(this.Url + '/Patient/' + id);
  }

  //update patient profile
  updatePatientProfile(body: UpdateBody) {
    return this.http.put(this.Url + '/Patient', body);
  }

  // error handler 
  handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

      switch (error.status) {
        case 400:      //bad request
          errorMessage += '   bad request';
          break;
        case 401:      //login
          errorMessage += '   unauthorized';
          break;
        case 403:     //forbidden
          errorMessage += '   forbidden';
          break;
        case 404:     //not found
          errorMessage += '   not found';
          break;
        case 405:     //method nor allowed
          errorMessage += '   method nor allowed';
          break;
        case 500:     //internal server error
          errorMessage += '   internal server error';
          break;
        case 502:     //bad gateway
          errorMessage += '   bad gateway';
          break;
      }
    }
    return throwError(errorMessage);
  }
}



