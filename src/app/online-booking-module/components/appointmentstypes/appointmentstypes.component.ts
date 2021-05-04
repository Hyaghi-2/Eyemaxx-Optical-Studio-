import { Component, DoCheck, OnInit } from '@angular/core';
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
  SelectedExamId: number = -1;
  DoctorStoreTypeData: DoctorStoreTypeResponse = new DoctorStoreTypeResponse();
  accountsId: number = 1922;
  companyName: string = 'Eyemaxx Optical Studio';
  ExamSelectionValidated!: boolean;
  StaffSelectionValidated!: boolean;
  isOptomitrist: boolean = false;
  isEdgeDown: boolean = false;
  isAnyOptomitrist: boolean = false;
  constructor(private serv: BookingModuleService, private steps: StepsManagementService) {
    this.serv.getStoresTypesDoctors(this.accountsId, this.companyName).subscribe(t => {
      this.DoctorStoreTypeData.Initialize(t);
      let s: AppointmentTypeData = <AppointmentTypeData>this.steps.stepsData.filter(x => x.order == 2)[0];
      if (!s) {
        this.steps.currentStep = new Step(2, 'ExamType', false, true, false, 'appointment-type');
        this.ExamSelectionValidated = false;
        this.StaffSelectionValidated = false;
        this.SelectedExam = new AppointmentType();
        this.SelectedStaff = new Doctor();
        this.SelectedStaff.id = -1;
      }
      else {
        this.steps.currentStep = new Step(2, 'ExamType', false, true, true, 'appointment-type');
        this.ExamSelectionValidated = true;
        this.StaffSelectionValidated = true;
        this.SelectedExamId = s.ExamType.id;
        this.SelectedExam = s.ExamType;
        this.SelectedStaff = s.Staff;
        this.isOptomitrist = s.isOptomitrist;
        this.isEdgeDown = s.isEdgeDown;
        this.isAnyOptomitrist = s.isAnyOptomitrist;
        if (!this.isOptomitrist) {
          this.Staffs = [];
          this.StaffSelectionValidated = true;
        }
        else {
          this.Staffs = this.DoctorStoreTypeData.Doctors.filter(x => x.designation == 'OD');
        }
      }
    });


  }


  ngOnInit(): void {


  }

  SelectStaff(id: number) {
    this.StaffSelectionValidated = true;
    if (id > 0) {
      this.SelectedStaff = this.Staffs.filter(x => x.id == id)[0];
    }
    else {
      this.SelectedStaff = new Doctor();
      this.isAnyOptomitrist = true;
    }
    this.steps.clearSteps(2);
    if (this.StaffSelectionValidated && this.ExamSelectionValidated) {
      this.steps.currentStep.validated = true;
      let p: AppointmentTypeData = new AppointmentTypeData(2, 'ExamType', this.SelectedExam,
        this.SelectedStaff, this.isOptomitrist, this.isEdgeDown, this.isAnyOptomitrist);
      this.steps.stepsData.push(p);
      this.steps.Steps.filter(x => x.order == this.steps.currentStep.order + 1)[0].enabled = this.steps.currentStep.validated;
    }

  }

  SelectExam() {
    this.ExamSelectionValidated = true;
    this.SelectedExam = this.DoctorStoreTypeData.AppointmentTypes.filter(x => x.id == this.SelectedExamId)[0];
    this.steps.clearSteps(2);
    this.isOptomitrist = this.SelectedExam.name.split(':')[0] != 'Optical' ? true : false;
    if (!this.isOptomitrist) {
      this.isEdgeDown = this.SelectedExam.name == 'Optical: Edgedown' ? true : false;
      this.Staffs = [];
      this.StaffSelectionValidated = true;
    }
    else {
      this.Staffs = this.DoctorStoreTypeData.Doctors.filter(x => x.designation == 'OD');
    }
  }

}
