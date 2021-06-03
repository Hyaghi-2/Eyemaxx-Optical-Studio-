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
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-appointmentconfirmation',
  templateUrl: './appointmentconfirmation.component.html',
  styleUrls: ['./appointmentconfirmation.component.css']
})
export class AppointmentconfirmationComponent implements OnInit {
  emailForm: FormGroup;
  emailFormSubmitted: boolean = false;
  //Email from the previous step
  //Users List by previos step email
  UsersList: PatientListResponse = new PatientListResponse();
  UserNotFound!: boolean;
  newPatientForm: FormGroup;
  newPatientFormEnabled: boolean = false;
  newPatientFormSubmitted: boolean = false;
  SelectUserValidated: boolean = false;
  SelectedUser: Patient = new Patient();
  newPatientFormStatus: string = '';
  isLoadingSpinnerEnabled!: boolean;
  isUserSelectSpinnerEnabled: boolean = false;
  addNewUserEnabled: boolean = false;
  typedEmail: string = '';
  constructor(private serv: BookingModuleService, private steps: StepsManagementService, private fb: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,) {
    let s: AppointmentConfirmationData = <AppointmentConfirmationData>this.steps.stepsData.filter(x => x.order == 4)[0];
    if (!s) {
      this.steps.currentStep = new Step(4, 'AppointmentConfirmation', false, true, false, 'confirmation');
      let index = this.steps.Steps.findIndex(x => x.order == 4);
      this.steps.Steps[index].enabled = true;
      this.steps.Steps[index].validated = false;
      this.emailForm = this.fb.group({
        userEmail: ['', Validators.compose([Validators.required, Validators.email])],
      });
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
        email: ['',],
        medicalCard: ['', Validators.required],
        medicalCardExp: ['', Validators.required]
      });
      this.SelectedUser.id = '-1';
      this.SelectUserValidated = false;
      this.UserNotFound = false;

    } else {
      this.steps.currentStep = new Step(4, 'AppointmentConfirmation', false, true, true, 'confirmation');
      let index = this.steps.Steps.findIndex(x => x.order == 4);
      this.steps.Steps[index].enabled = true;
      this.steps.Steps[index].validated = true;
      this.SelectedUser = s.SelectedUser;
      this.emailForm = this.fb.group({
        userEmail: [s.SelectedUser.email, Validators.compose([Validators.required, Validators.email])],
      });
      this.UsersList = s.UsersList;
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
        email: [this.SelectedUser.email,],
        medicalCard: ['', Validators.required],
        medicalCardExp: ['', Validators.required]
      });
      this.SelectUserValidated = true;
      this.addNewUserEnabled = true;
    }
  }


  onEmailFormSubmit(event: any) {
    this.emailFormSubmitted = true;
    console.log(this.emailFormSubmitted);

    if (this.emailForm.invalid) {
      return;
    }
    this.addNewUserEnabled = true;
    this.isLoadingSpinnerEnabled = true;
    this.typedEmail = this.emailForm.get('userEmail')?.value;
    this.serv.getPatientList(this.emailForm.get('userEmail')?.value).subscribe(x => {
      this.isLoadingSpinnerEnabled = false;
      this.UsersList = new PatientListResponse();
      this.UsersList.Initialize(x);
      this.UserNotFound = this.UsersList.patientList.length <= 0 ? true : false;
    });
  }
  get fe() {
    return this.emailForm.controls;
  }

  get f() {
    return this.newPatientForm.controls;
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

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
    this.isUserSelectSpinnerEnabled = true;
    this.newPatientFormEnabled = false;
    this.newPatientFormSubmitted = false;
    this.steps.clearSteps(4);
    this.serv.getPatientById(p.id).subscribe(x => {
      this.SelectedUser = new Patient();
      this.SelectedUser = this.SelectedUser.Initialize(x);
      this.isUserSelectSpinnerEnabled = false;
      this.SelectUserValidated = true;
      this.steps.currentStep.validated = true;
      let p: AppointmentConfirmationData = new AppointmentConfirmationData(4, 'AppointmentConfirmation', this.SelectedUser, this.UsersList);
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
      unit: ['',],
      streetName: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      postalCode: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      cell: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')])],
      email: ['',],
      medicalCard: ['',],
      medicalCardExp: ['',]
    });
    this.UserNotFound = false;
    this.newPatientFormSubmitted = false;
    this.newPatientFormStatus = 'add';
    this.newPatientFormEnabled = true;
  }


  EditCurrentUser() {
    this.newPatientFormSubmitted = true;
    if (this.newPatientForm.invalid) {
      return;
    }
    this.isLoadingSpinnerEnabled = true;
    let body: UpdateBody = new UpdateBody();
    console.log(this.newPatientForm.value);

    body = Object.assign(this.newPatientForm.value);
    body.email = this.typedEmail;
    console.log(this.SelectedUser);

    body.id = +this.SelectedUser.id.split('-')[1];
    this.serv.updatePatientProfile(body).subscribe(x => {
      console.log(x);

      let p: Patient = new Patient();
      p = p.Initialize(x);
      this.serv.getPatientList(p.email).subscribe(t => {
        this.UsersList.patientList = [];
        this.UsersList.Initialize(t);
        this.isLoadingSpinnerEnabled = false;
        this.newPatientFormEnabled = false;
        this.messageService.add({ severity: 'success', summary: 'Succeed', detail: 'User Successfully Updated !' });
      });
    });

  }

  AddNewUser() {
    this.newPatientFormSubmitted = true;
    if (this.newPatientForm.invalid) {
      return;
    }
    this.isLoadingSpinnerEnabled = true;
    let body: CreatePatientBody = new CreatePatientBody();
    body = Object.assign(this.newPatientForm.value);
    body.email = this.typedEmail;
    this.serv.createPatient(body).subscribe(x => {
      let p: Patient = new Patient();
      p = p.Initialize(x);
      this.serv.getPatientList(p.email).subscribe(t => {
        this.UsersList.patientList = [];
        this.UsersList.Initialize(t);
        this.isLoadingSpinnerEnabled = false;
        this.newPatientFormEnabled = false;
        this.messageService.add({ severity: 'success', summary: 'Succeed', detail: 'A new user has been added !' });
      });
    });
  }

  ShowPatientFormToEdit() {
    this.newPatientFormStatus = 'edit';
    this.isUserSelectSpinnerEnabled = true;
    this.serv.getPatientById(this.SelectedUser.id).subscribe(x => {
      let p: Patient = new Patient();
      p = p.Initialize(x);
      let d: Date = new Date(p.dateOfBirth);
      this.newPatientForm = this.fb.group({
        firstName: [p.firstName, Validators.required],
        lastName: [p.lastName, Validators.required],
        streetNumber: [p.streetNumber, Validators.required],
        unit: [p.unit,],
        streetName: [p.streetName, Validators.required],
        city: [p.city, Validators.required],
        province: [p.province, Validators.required],
        postalCode: [p.postalCode, Validators.required],
        dateOfBirth: [d.toISOString().substring(0, 10), Validators.required],
        cell: [p.cell, Validators.compose([Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')])],
        email: [p.email,],
        medicalCard: [p.medicalCard,],
        medicalCardExp: [p.medicalCardExp,]
      });
      this.newPatientFormSubmitted = false;
      this.newPatientFormEnabled = true;
      this.isUserSelectSpinnerEnabled = false;

    });
  }
}
