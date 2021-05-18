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

  Staffs: Doctor[] = [];
  SelectedExam: AppointmentType = new AppointmentType();
  SelectedStaff: Doctor = new Doctor();
  SelectedExamId: number = 0;
  DoctorStoreTypeData: DoctorStoreTypeResponse = new DoctorStoreTypeResponse();
  accountsId: number = 1922;
  companyName: string = 'Eyemaxx Optical Studio';
  ExamSelectionValidated!: boolean;
  StaffSelectionValidated!: boolean;
  isOptomitrist: boolean = false;
  StaffErrorMessage: boolean = false;
  ExamErrorMessage: boolean = false;
  constructor(private serv: BookingModuleService, private steps: StepsManagementService) {
    //checking if the user visit this step before
    let s: AppointmentTypeData = <AppointmentTypeData>this.steps.stepsData.filter(x => x.order == 2)[0];
    //check if the first time
    if (!s) {
      this.steps.currentStep = new Step(2, 'ExamType', false, true, false, 'appointment-type');
      this.ExamSelectionValidated = false;
      this.StaffSelectionValidated = false;
      this.SelectedExam = new AppointmentType();
      this.SelectedStaff = new Doctor();
      this.SelectedStaff.id = -1;
      this.serv.getStoresTypesDoctors(this.accountsId, this.companyName).subscribe(t => {
        this.DoctorStoreTypeData.Initialize(t);
      });
    }
    else {
      this.serv.getStoresTypesDoctors(this.accountsId, this.companyName).subscribe(t => {
        this.DoctorStoreTypeData.Initialize(t);
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
      });
    }
  }


  ngOnInit(): void {

  }

  SelectStaff(id: number) {
    this.steps.clearSteps(2);
    this.StaffSelectionValidated = true;
    if (id > 0) {
      this.SelectedStaff = this.Staffs.filter(x => x.id == id)[0];
    }
    else {
      this.SelectedStaff = new Doctor();
      this.SelectedStaff.id = -1;
    }
    if (this.StaffSelectionValidated && this.ExamSelectionValidated) {
      if (this.SelectedStaff.id != -1) {
        let AllAppointments: AppointmentSlotsResponse = new AppointmentSlotsResponse();
        this.serv.getAvailableAppointmentSluts(this.accountsId.toString(), this.companyName, this.SelectedExam.id.toString(), this.SelectedStaff.id.toString())
          .subscribe(x => {
            AllAppointments.Initialize(x);
            if (AllAppointments.AppointmentSlotsList.length > 0) {
              this.StaffErrorMessage = false;
              this.ExamErrorMessage = false;
              this.steps.currentStep.validated = true;
              let index = this.steps.Steps.findIndex(x => x.order == this.steps.currentStep.order);
              this.steps.Steps[index].validated = true;
              let p: AppointmentTypeData = new AppointmentTypeData(2, 'ExamType', this.SelectedExam, true, this.SelectedStaff);
              this.steps.stepsData.push(p);
              this.steps.Steps.filter(x => x.order == this.steps.currentStep.order + 1)[0].enabled = this.steps.currentStep.validated;
            }
            else {
              this.StaffErrorMessage = true;
            }
          });
      } else {
        this.StaffErrorMessage = false;
        this.ExamErrorMessage = false;
        this.steps.currentStep.validated = true;
        let index = this.steps.Steps.findIndex(x => x.order == this.steps.currentStep.order);
        this.steps.Steps[index].validated = true;
        let p: AppointmentTypeData = new AppointmentTypeData(2, 'ExamType', this.SelectedExam, true, this.SelectedStaff);
        this.steps.stepsData.push(p);
        this.steps.Steps.filter(x => x.order == this.steps.currentStep.order + 1)[0].enabled = this.steps.currentStep.validated;
      }



    }

  }

  SelectExam() {
    this.steps.clearSteps(2);
    if (this.SelectedExamId != -2) {
      this.ExamErrorMessage = false;
      this.StaffErrorMessage = false;
      this.SelectedExam = this.DoctorStoreTypeData.AppointmentTypes.filter(x => x.id == this.SelectedExamId)[0];

      this.isOptomitrist = this.SelectedExam.name.split(':')[0] != 'Optical' ? true : false;
      if (!this.isOptomitrist) {
        this.Staffs = [];
        this.StaffSelectionValidated = true;
        this.ExamSelectionValidated = true;
        this.steps.currentStep.validated = true;
        let index = this.steps.Steps.findIndex(x => x.order == this.steps.currentStep.order);
        this.steps.Steps[index].validated = true;
        let p: AppointmentTypeData = new AppointmentTypeData(2, 'ExamType', this.SelectedExam, false);
        this.steps.stepsData.push(p);
        this.steps.Steps.filter(x => x.order == this.steps.currentStep.order + 1)[0].enabled = this.steps.currentStep.validated;
      }
      else {
        this.ExamSelectionValidated = true;
        this.Staffs = this.DoctorStoreTypeData.Doctors.filter(x => x.designation == 'OD');
      }
    }
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
