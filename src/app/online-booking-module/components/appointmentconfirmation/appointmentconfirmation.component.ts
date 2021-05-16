import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreatePatientBody } from '../../models/create-patient/create-patient-body';
import { Patient } from '../../models/create-patient/patient';
import { SinglePatient } from '../../models/get-patients/patient';
import { PatientListResponse } from '../../models/get-patients/patient-list-response';
import { Step } from '../../models/Step/step';
import { AppointmentConfirmationData } from '../../models/Steps-Data/appointment-confirmation-data';
import { UpdateBody } from '../../models/update-patient-profile/update-body';
import { BookingModuleService } from '../../services/booking-module-service.service';
import { StepsManagementService } from '../../services/steps-management.service';

@Component({
  selector: 'app-appointmentconfirmation',
  templateUrl: './appointmentconfirmation.component.html',
  styleUrls: ['./appointmentconfirmation.component.css']
})
export class AppointmentconfirmationComponent implements OnInit {
  //Email from the previous step
  //Users List by previos step email
  UsersList: PatientListResponse = new PatientListResponse();
  UserNotFound!: boolean;
  newPatientForm!: FormGroup;
  newPatientFormEnabled: boolean = false;
  newPatientFormSubmitted: boolean = false;
  SelectUserValidated: boolean = false;
  SelectedUser: Patient = new Patient();
  newPatientFormStatus: string = '';
  constructor(private serv: BookingModuleService, private steps: StepsManagementService, private fb: FormBuilder) {
    let s: AppointmentConfirmationData = <AppointmentConfirmationData>this.steps.stepsData.filter(x => x.order == 5)[0];
    if (!s) {
      this.steps.currentStep = new Step(5, 'AppointmentConfirmation', false, true, false, 'confirmation');
      let index = this.steps.Steps.findIndex(x => x.order == 5);
      this.steps.Steps[index].enabled = true;
      this.steps.Steps[index].validated = false;

      //getting the email from the previos step by steps data
      let Email: string = 'taim@hotmail.com ';
      this.serv.getPatientList(Email).subscribe(x => {
        this.UsersList.Initialize(x);
        this.UserNotFound = this.UsersList.patientList.length <= 0 ? true : false;
        this.SelectedUser.id = '-1';
        this.newPatientForm = this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          streetNumber: ['', Validators.required],
          unit: ['', Validators.required],
          streetName: ['', Validators.required],
          city: ['', Validators.required],
          province: ['', Validators.required],
          postalCode: ['', Validators.required],
          dateOfBirth: ['', Validators.required],
          cell: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')])],
          email: [Email, Validators.compose([Validators.required, Validators.email])],
          medicalCard: ['', Validators.required],
          medicalCardExp: ['', Validators.required]
        });
        this.SelectUserValidated = false;
      });
    } else {
      this.steps.currentStep = new Step(5, 'AppointmentConfirmation', false, true, true, 'confirmation');
      let index = this.steps.Steps.findIndex(x => x.order == 5);
      this.steps.Steps[index].enabled = true;
      this.steps.Steps[index].validated = true;
      this.SelectedUser = s.SelectedUser;
      this.serv.getPatientList(this.SelectedUser.email).subscribe(x => {
        this.UsersList.Initialize(x);
        this.UserNotFound = this.UsersList.patientList.length <= 0 ? true : false;
        this.newPatientForm = this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          streetNumber: ['', Validators.required],
          unit: ['', Validators.required],
          streetName: ['', Validators.required],
          city: ['', Validators.required],
          province: ['', Validators.required],
          postalCode: ['', Validators.required],
          dateOfBirth: ['', Validators.required],
          cell: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')])],
          email: [this.SelectedUser.email, Validators.compose([Validators.required, Validators.email])],
          medicalCard: ['', Validators.required],
          medicalCardExp: ['', Validators.required]
        });
        this.SelectUserValidated = true;
      });

    }





  }

  get f() {
    return this.newPatientForm.controls;
  }

  ngOnInit(): void {

  }

  onNewPatientFormSubmit(event: any) {
    if (this.newPatientFormStatus == 'edit') {
      this.EditCurrentUser();
    }
    else {
      this.AddNewUser();
    }
  }

  resetNewPatientFrom() {
    this.newPatientForm.reset();
  }

  SelectUser(p: SinglePatient) {
    this.newPatientFormEnabled = false;
    this.newPatientFormSubmitted = false;
    this.steps.clearSteps(5);
    this.serv.getPatientById(p.id).subscribe(x => {
      this.SelectedUser = new Patient();
      this.SelectedUser = this.SelectedUser.Initialize(x);
      this.SelectUserValidated = true;
      let p: AppointmentConfirmationData = new AppointmentConfirmationData(5, 'AppointmentConfirmation', this.SelectedUser);
      this.steps.stepsData.push(p);
      let index = this.steps.Steps.findIndex(x => x.order == this.steps.currentStep.order);
      this.steps.Steps[index].validated = true;
      index = this.steps.Steps.findIndex(x => x.order == this.steps.currentStep.order + 1);
      this.steps.Steps[index].enabled = true;
    });

  }

  showPatientFormToAdd() {
    this.newPatientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetNumber: ['', Validators.required],
      unit: ['', Validators.required],
      streetName: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      postalCode: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      cell: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      medicalCard: ['', Validators.required],
      medicalCardExp: ['', Validators.required]
    });
    this.newPatientFormSubmitted = false;
    this.newPatientFormStatus = 'add';
    this.newPatientFormEnabled = true;
  }
  EditCurrentUser() {
    this.newPatientFormSubmitted = true;
    if (this.newPatientForm.invalid) {
      return;
    }
    let body: UpdateBody = new UpdateBody();
    body = Object.assign(this.newPatientForm.value);
    this.serv.updatePatientProfile(body).subscribe(x => {
      let p: Patient = new Patient();
      p = p.Initialize(x);
      this.serv.getPatientList(p.email).subscribe(t => {
        this.UsersList.patientList = [];
        this.UsersList.Initialize(t);
      });
    })

  }

  AddNewUser() {
    this.newPatientFormSubmitted = true;
    if (this.newPatientForm.invalid) {
      return;
    }
    let body: CreatePatientBody = new CreatePatientBody();
    body = Object.assign(this.newPatientForm.value);
    this.serv.createPatient(body).subscribe(x => {
      let p: Patient = new Patient();
      p = p.Initialize(x);
      this.serv.getPatientList(p.email).subscribe(t => {
        this.UsersList.patientList = [];
        this.UsersList.Initialize(t);
      });
    });
  }

  ShowPatientFormToEdit() {
    this.newPatientFormStatus = 'edit';
    this.serv.getPatientById(this.SelectedUser.id).subscribe(x => {
      let p: Patient = new Patient();
      p = p.Initialize(x);
      let d: Date = new Date(p.dateOfBirth);
      this.newPatientForm = this.fb.group({
        firstName: [p.firstName, Validators.required],
        lastName: [p.lastName, Validators.required],
        streetNumber: [p.streetNumber, Validators.required],
        unit: [p.unit, Validators.required],
        streetName: [p.streetName, Validators.required],
        city: [p.city, Validators.required],
        province: [p.province, Validators.required],
        postalCode: [p.postalCode, Validators.required],
        dateOfBirth: [d.toISOString().substring(0, 10), Validators.required],
        cell: [p.cell, Validators.compose([Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')])],
        email: [p.email, Validators.compose([Validators.required, Validators.email])],
        medicalCard: [p.medicalCard, Validators.required],
        medicalCardExp: [p.medicalCardExp, Validators.required]
      });
      this.newPatientFormSubmitted = false;
      this.newPatientFormEnabled = true;
    });
  }
}