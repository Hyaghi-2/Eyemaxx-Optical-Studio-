import { Component, DoCheck, OnInit } from '@angular/core';
import { AppointmentSlotsResponse } from '../../models/get-appointments-slots/appointment-slots-response';
import { AppointmentType } from '../../models/get-stores-types-doctors/appointment-type';
import { Doctor } from '../../models/get-stores-types-doctors/doctor';
import { DoctorStoreTypeResponse } from '../../models/get-stores-types-doctors/doctor-store-type-response';
import { Step } from '../../models/Step/step';
import { AppointmentTypeData } from '../../models/Steps-Data/appointment-type-data';
import { ServiceTypeData } from '../../models/Steps-Data/service-type-data';
import { BookingModuleService } from '../../services/booking-module-service.service';
import { StepsManagementService } from '../../services/steps-management.service';

@Component({
  selector: 'app-appointmentstypes',
  templateUrl: './appointmentstypes.component.html',
  styleUrls: ['./appointmentstypes.component.css']
})
export class AppointmentstypesComponent implements OnInit {
  //the viewed staffs to the user 
  Staffs: Doctor[] = [];
  // the selected exam by user 
  SelectedExam: AppointmentType = new AppointmentType();
  // the selected staff if the exam type not optician
  SelectedStaff: Doctor = new Doctor();
  //the selected exam type for the exam material list 
  SelectedExamId: number = 0;
  // exams, doctors response from the api
  DoctorStoreTypeData: DoctorStoreTypeResponse = new DoctorStoreTypeResponse();
  //testing api credentials 
  //validation if the user select an exam
  ExamSelectionValidated!: boolean;
  // validation if the user select a staff based on if he select and exam type not optician 
  StaffSelectionValidated!: boolean;
  //to know if the selected exam type related to optomitrist 
  isOptomitrist: boolean = false;
  //to know if the appointment type related to edge down
  isEdgeDown: boolean = false;
  //error message if the staff doesnt have any appointments
  StaffErrorMessage: boolean = false;
  //error message if the exam type cant be booked online 
  ExamErrorMessage: boolean = false;
  //staff selection sppinner
  isOptomitristSpinnerEnabled: boolean = false;
  constructor(private serv: BookingModuleService, private steps: StepsManagementService) {
    //checking if the user visit this step before
    let s: AppointmentTypeData = <AppointmentTypeData>this.steps.stepsData.filter(x => x.order == 2)[0];
    //check if the first time
    if (!s) {
      //if the first time initialize the step info and the current step status 
      this.steps.currentStep = new Step(2, 'ExamType', false, true, false, 'appointment-type');
      this.ExamSelectionValidated = false;
      this.StaffSelectionValidated = false;
      this.SelectedExam = new AppointmentType();
      this.SelectedStaff = new Doctor();
      this.SelectedStaff.id = -1;
      //if the doctors and exam type response to initialized in the first step call the api
      if (this.steps.ExamTypesPreFetch.AppointmentTypes.length > 0) {
        this.DoctorStoreTypeData = this.steps.ExamTypesPreFetch;
      }
      else {
        this.serv.getStoresTypesDoctors(this.serv.accountsId, this.serv.companyName).subscribe(t => {
          this.DoctorStoreTypeData.Initialize(t);
        });
      }

    }
    else {
      //if the user entered this step before 
      this.DoctorStoreTypeData = s.DoctorStoreTypeData;
      this.steps.currentStep = new Step(2, 'ExamType', false, true, true, 'appointment-type');
      this.ExamSelectionValidated = true;
      this.StaffSelectionValidated = true;
      this.SelectedExamId = s.ExamType.id;
      this.SelectedExam = s.ExamType;
      this.SelectedStaff = s.Staff;
      this.isOptomitrist = s.isOptomitrist;
      if (!this.isOptomitrist) {
        this.Staffs = [];
        this.StaffSelectionValidated = true;
      }
      else {
        this.Staffs = this.DoctorStoreTypeData.Doctors.filter(x => x.designation == 'OD');
      }

    }
  }


  ngOnInit(): void { }
  //doctor selection method the doctor id will be passed
  SelectStaff(id: number) {
    //enable the spinner to check the selected doctor slots in background 
    this.isOptomitristSpinnerEnabled = true;
    //clear any step info stored before
    this.steps.clearSteps(2);
    //validate the selection 
    this.StaffSelectionValidated = true;
    //initialize the error message 
    this.StaffErrorMessage = false;
    //if the selected doctor not any optimitrist
    if (id > 0) {
      //initlize the selected staff with the api reponse
      this.SelectedStaff = this.Staffs.filter(x => x.id == id)[0];
    }
    else {
      //if the user select any optimitrist
      this.SelectedStaff = new Doctor();
      this.SelectedStaff.id = -1;
    }
    //if the user finished the selection we have to check the api
    if (this.StaffSelectionValidated && this.ExamSelectionValidated) {
      if (this.SelectedStaff.id != -1) {
        //if the user select a doctor (not any optimitrist)
        let AllAppointments: AppointmentSlotsResponse = new AppointmentSlotsResponse();
        //check the api if the selected doctor have slots 
        this.serv.getAvailableAppointmentSluts(this.serv.accountsId.toString(), this.serv.companyName, this.SelectedExam.id.toString(), this.SelectedStaff.id.toString())
          .subscribe(x => {
            AllAppointments.Initialize(x);
            //if the selected doctor have slots 
            if (AllAppointments.AppointmentSlotsList.length > 0) {
              //validate the current step and enable the next step
              this.isOptomitristSpinnerEnabled = false;
              this.StaffErrorMessage = false;
              this.ExamErrorMessage = false;
              let p: AppointmentTypeData = new AppointmentTypeData(2, 'ExamType', this.SelectedExam, true, this.DoctorStoreTypeData, false, false, this.SelectedStaff);
              this.steps.stepsData.push(p);
              this.steps.Steps.filter(x => x.order == this.steps.currentStep.order + 1)[0].enabled = true;
              this.steps.currentStep.validated = true;
              let index = this.steps.Steps.findIndex(x => x.order == this.steps.currentStep.order);
              this.steps.Steps[index].validated = true;
              this.isOptomitristSpinnerEnabled = false;
            }
            else {
              //if the selected doctor doesnt have any slots disable the spinner and show error message 
              this.isOptomitristSpinnerEnabled = false;
              this.StaffErrorMessage = true;
            }
          });
      } else {
        //if the user select any optimitrist validate the current step and enable the next step
        this.StaffErrorMessage = false;
        this.ExamErrorMessage = false;
        this.steps.currentStep.validated = true;
        let index = this.steps.Steps.findIndex(x => x.order == this.steps.currentStep.order);
        this.steps.Steps[index].validated = true;
        let p: AppointmentTypeData = new AppointmentTypeData(2, 'ExamType', this.SelectedExam, true, this.DoctorStoreTypeData, false, false, this.SelectedStaff);
        this.steps.stepsData.push(p);
        this.steps.Steps.filter(x => x.order == this.steps.currentStep.order + 1)[0].enabled = this.steps.currentStep.validated;
        this.isOptomitristSpinnerEnabled = false;

      }



    }

  }
  //edge down id 55170
  //exam seletction metod
  SelectExam() {
    //clear steps data if stored before
    this.steps.clearSteps(2);
    this.SelectedExam = new AppointmentType();
    this.SelectedStaff = new Doctor();
    console.log(this.SelectedExamId);

    //if the selected exam can be booked online
    if (this.SelectedExamId != -2) {
      //initialize the error messsages if showed before
      this.ExamErrorMessage = false;
      this.StaffErrorMessage = false;
      //set the selected exam from the api reponse data
      this.SelectedExam = this.DoctorStoreTypeData.AppointmentTypes.filter(x => x.id == this.SelectedExamId)[0];
      //check if the exam related to an optician
      this.isOptomitrist = this.SelectedExam.name.split(':')[0] != 'Optical' ? true : false;
      console.log(this.SelectedExam.name.split(':'));

      //if the exam related to an optician
      if (!this.isOptomitrist) {
        //enable the  spinner 
        this.isOptomitristSpinnerEnabled = true;

        //call the api to check if the selected type has slots 
        let AllAppointments: AppointmentSlotsResponse = new AppointmentSlotsResponse();
        if (this.SelectedExamId == 55170) {
          console.log(1);

          this.serv.getAvailableAppointmentSluts(this.serv.accountsId.toString(), this.serv.companyName,
            this.SelectedExam.id.toString(), '409').subscribe(x => {
              console.log(x);

              AllAppointments.Initialize(x);
              //if the selected exam type has slots 
              if (AllAppointments.AppointmentSlotsList.length > 0) {
                //validate the current step and enable the next step
                this.Staffs = [];
                this.StaffSelectionValidated = true;
                this.ExamSelectionValidated = true;
                let p: AppointmentTypeData = new AppointmentTypeData(2, 'ExamType', this.SelectedExam, false, this.DoctorStoreTypeData, true, true);
                this.steps.stepsData.push(p);
                this.steps.Steps.filter(x => x.order == this.steps.currentStep.order + 1)[0].enabled = true
                this.steps.currentStep.validated = true;
                let index = this.steps.Steps.findIndex(x => x.order == this.steps.currentStep.order);
                this.steps.Steps[index].validated = true;
                this.isOptomitristSpinnerEnabled = false;

              }
              else {
                //if the selected exam doesnt have any slots disable the spinner and show error message
                this.isOptomitristSpinnerEnabled = false;
                this.StaffErrorMessage = true;
              }
            });
        }
        else {
          console.log(2);

          this.serv.getAvailableAppointmentSluts(this.serv.accountsId.toString(), this.serv.companyName,
            this.SelectedExam.id.toString()).subscribe(x => {
              AllAppointments.Initialize(x);
              //if the selected exam type has slots 
              if (AllAppointments.AppointmentSlotsList.length > 0) {
                //validate the current step and enable the next step
                this.Staffs = [];
                this.StaffSelectionValidated = true;
                this.ExamSelectionValidated = true;
                let p: AppointmentTypeData = new AppointmentTypeData(2, 'ExamType', this.SelectedExam, false, this.DoctorStoreTypeData, false, true);
                this.steps.stepsData.push(p);
                this.steps.Steps.filter(x => x.order == this.steps.currentStep.order + 1)[0].enabled = true
                this.steps.currentStep.validated = true;
                let index = this.steps.Steps.findIndex(x => x.order == this.steps.currentStep.order);
                this.steps.Steps[index].validated = true;
                this.isOptomitristSpinnerEnabled = false;

              }
              else {
                //if the selected exam doesnt have any slots disable the spinner and show error message
                this.isOptomitristSpinnerEnabled = false;
                this.StaffErrorMessage = true;
              }
            });
        }

      }
      //if the selected exam related to an optimitrst
      else {
        //validate the exam selection and show the doctors list
        this.ExamSelectionValidated = true;
        this.Staffs = this.DoctorStoreTypeData.Doctors.filter(x => x.designation == 'OD');
      }
    }
    //if the exam type cant be booked online 
    else {
      this.ExamErrorMessage = true;
      this.StaffErrorMessage = false;
      this.Staffs = [];
      this.SelectedExamId = -20;
      this.SelectedStaff = new Doctor();
      this.isOptomitrist = false;
    }
  }



}
