import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Step } from '../../models/Step/step';
import { AppointmentTypeData } from '../../models/Steps-Data/appointment-type-data';
import { Covid19Data } from '../../models/Steps-Data/covid19-data';
import { DataParent } from '../../models/Steps-Data/data-parent';
import { OpticianAppointmentData } from '../../models/Steps-Data/opticianappointmentdata';
import { OptitianContactData } from '../../models/Steps-Data/optitian-contact-data';
import { StepsManagementService } from '../../services/steps-management.service';
@Component({
  selector: 'app-opticianappointment',
  templateUrl: './opticianappointment.component.html',
  styleUrls: ['./opticianappointment.component.css']
})
export class OpticianappointmentComponent implements OnInit {
  OpticianForm: FormGroup;
  EmailForm: FormGroup;
  submitted!: boolean;
  isOptitian: boolean;
  isOpticianFormEnabled: boolean = false;
  constructor(private FormBuilder: FormBuilder, public steps: StepsManagementService) {
    let s: AppointmentTypeData = <AppointmentTypeData>this.steps.stepsData.filter(x => x.order == 2)[0];
    this.isOptitian = s.isOptomitrist ? false : true;
    let s2: OpticianAppointmentData = <OpticianAppointmentData>this.steps.stepsData.filter(x => x.order == 4)[0];
    if (!s2) {
      this.EmailForm = this.FormBuilder.group({
        Email: ['', Validators.compose([Validators.required, Validators.email])]
      });
      this.OpticianForm = this.FormBuilder.group({
        firstname: ['', Validators.compose([Validators.required])],
        lastname: ['', Validators.compose([Validators.required])],
        streetnumber: ['', Validators.compose([Validators.required])],
        unitnumber: ['', Validators.compose([Validators.required])],
        streetname: ['', Validators.compose([Validators.required])],
        city: ['', Validators.compose([Validators.required])],
        province: ['', Validators.compose([Validators.required])],
        postalcode: ['', Validators.compose([Validators.required])],
        cellphone: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        insurancecompany: ['', Validators.compose([Validators.required])],
      });
      this.steps.currentStep = new Step(4, 'OpticianAppointment', false, true, false, 'optician-appointment');
      let index: number = this.steps.Steps.findIndex(x => x.order == 4);
      this.steps.Steps[index].enabled = true;
      this.steps.Steps[index].validated = false;
      this.submitted = false;



    } else {

      this.EmailForm = this.FormBuilder.group({
        Email: [s2.Email, Validators.compose([Validators.required, Validators.email])]
      });
      this.OpticianForm = this.FormBuilder.group({
        firstname: ['', Validators.compose([Validators.required])],
        lastname: ['', Validators.compose([Validators.required])],
        streetnumber: ['', Validators.compose([Validators.required])],
        unitnumber: ['', Validators.compose([Validators.required])],
        streetname: ['', Validators.compose([Validators.required])],
        city: ['', Validators.compose([Validators.required])],
        province: ['', Validators.compose([Validators.required])],
        postalcode: ['', Validators.compose([Validators.required])],
        cellphone: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        insurancecompany: ['', Validators.compose([Validators.required])],
      });

      this.steps.currentStep = new Step(4, 'OpticianAppointment', false, true, true, 'optician-appointment');
      let index: number = this.steps.Steps.findIndex(x => x.order == 4);
      this.steps.Steps[index].enabled = true;
      this.steps.Steps[index].validated = true;
    }


  }
  get f() {
    return this.OpticianForm.controls;
  }
  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    this.onEmailFormChanges();
  }

  onOpticianFormSubmit(event: any) {
    this.submitted = true;
    if (this.OpticianForm.invalid) {
      event.preventDefault();
      return;
    }
      //this.hideorshow = true;
      let p: OptitianContactData = new OptitianContactData();
      p = Object.assign(this.OpticianForm.value);
      let p2: OpticianAppointmentData = new OpticianAppointmentData(4, 'OpticianAppointment', this.EmailForm.get('email')?.value);
      this.steps.stepsData.push(p2);
       //pass  p to send  email api
       //inside subscribe body
       let index: number = this.steps.Steps.findIndex(x => x.order == 4);
       this.steps.Steps[index].enabled = true;
       this.steps.Steps[index].validated = true;
       index = this.steps.Steps.findIndex(x => x.order == this.steps.currentStep.order + 1);
       this.steps.Steps[index].enabled = true;


  }
  onEmailFormChanges() {
    this.steps.clearSteps(4);
    this.EmailForm.valueChanges.subscribe(x => {
      if (this.EmailForm.valid) {
        let p: OpticianAppointmentData = new OpticianAppointmentData(4, 'OpticianAppointment', this.EmailForm.get('email')?.value);
        this.steps.stepsData.push(p);
        this.steps.currentStep.validated = this.EmailForm.valid;
        let index: number = this.steps.Steps.findIndex(x => x.order == 4);
        this.steps.Steps[index].enabled = true;
        this.steps.Steps[index].validated = true;
        index = this.steps.Steps.findIndex(x => x.order == this.steps.currentStep.order + 1);
        this.steps.Steps[index].enabled = true;
      }
    });
  }
  onCovidPreScrFormChanges() {

  }
}
