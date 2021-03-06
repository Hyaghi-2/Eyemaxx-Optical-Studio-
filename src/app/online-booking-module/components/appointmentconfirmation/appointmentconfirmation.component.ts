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
  //New Implementation
  UserTypeSelectionPaneEnabled: boolean = true;
  //New User Form
  NewUserFormEnabled: boolean = false;

  //Login Form
  UserLoginForm!: FormGroup;
  UserLoginFormEnabled: boolean = false;
  UserLoginFormSubmitted: boolean = false;

  emailForm: FormGroup;
  emailFormSubmitted: boolean = false;
  //Email from the previous step
  //Users List by previos step email
  UsersList: PatientListResponse = new PatientListResponse();
  //the returned patients array has patients or not 
  UserNotFound!: boolean;
  //patient form 
  newPatientForm: FormGroup;
  //show or hide the form 
  newPatientFormEnabled: boolean = false;
  //form submittion status 
  newPatientFormSubmitted: boolean = false;
  //if the user select a petient 
  SelectUserValidated: boolean = false;
  //the selected user info
  SelectedUser: Patient = new Patient();
  //the user add or edit and existing user status form 
  newPatientFormStatus: string = '';
  //loading spinner for email submittion
  isLoadingSpinnerEnabled!: boolean;
  //user selection spinner 
  isUserSelectSpinnerEnabled: boolean = false;
  //enable add new user button 
  addNewUserEnabled: boolean = false;
  // the entered email from the user 
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
        unit: ['',],
        streetName: ['', Validators.required],
        city: ['', Validators.required],
        province: ['', Validators.required],
        postalCode: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        cell: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')])],
        email: [this.SelectedUser.email,],
        medicalCard: ['',],
        medicalCardExp: ['',]
      });
      this.SelectUserValidated = true;
      this.addNewUserEnabled = true;
    }
  }

  GeneralClickEvent(_type: string) {
    switch (_type) {
      case 'NewUserClick':
        this.UserTypeSelectionPaneEnabled = false;
        this.NewUserFormEnabled = true;
        break;
      case 'ExistingUserClick':
        this.UserTypeSelectionPaneEnabled = false;
        this.UserLoginFormEnabled = true;
        break;
      default:
        break;
    }
  }

  onEmailFormSubmit(event: any) {
    this.emailFormSubmitted = true;

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

  get lfc() {
    return this.UserLoginForm.controls;
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.UserLoginForm = this.fb.group({
      cell: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')])],
      password: ['', Validators.compose([Validators.required])]
    });
    
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
    body = Object.assign(this.newPatientForm.value);
    body.email = this.typedEmail;

    body.id = +this.SelectedUser.id.split('-')[1];
    this.serv.updatePatientProfile(body).subscribe(x => {

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
    body.isDefaultSms = true;
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
