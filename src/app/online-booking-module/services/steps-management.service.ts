import { Injectable } from '@angular/core';
import { AppointmentType } from '../models/get-stores-types-doctors/appointment-type';
import { DoctorStoreTypeResponse } from '../models/get-stores-types-doctors/doctor-store-type-response';
import { Step } from '../models/Step/step';
import { DataParent } from '../models/Steps-Data/data-parent';

@Injectable({
  providedIn: 'root'
})
export class StepsManagementService {
  public s: number = 0;
  public Steps: Step[] = [];
  public currentStep!: Step;
  public stepsData: DataParent[] = [];
  public ExamTypesPreFetch: DoctorStoreTypeResponse = new DoctorStoreTypeResponse();
  //pre-defined exam types 
  preDefinedExamTypes: AppointmentType[] = [];
  ActualExamTypes: AppointmentType[] = [];

  constructor() {
    this.Steps.push(new Step(1, 'COVID19preScr', false, true, false, 'covid19'));
    this.Steps.push(new Step(2, 'ExamType', false, false, false, 'appointment-type'));
    this.Steps.push(new Step(3, 'AppointmentsSlots', false, false, false, 'date-time'));
    this.Steps.push(new Step(4, 'AppointmentConfirmation', false, false, false, 'confirmation'));
    this.Steps.push(new Step(5, 'Summary', false, false, false, 'summary'));
    this.currentStep = this.Steps.filter(x => x.order == 1)[0];

    this.preDefinedExamTypes.push(new AppointmentType(1278, 'Full Exam: Non-Contact Lens Wearer - $120', true, 1));
    this.preDefinedExamTypes.push(new AppointmentType(1280, 'Full Exam: Contact Lens Wearer (Previous Patient) - $140', true, 2));
    this.preDefinedExamTypes.push(new AppointmentType(1279, 'Full Exam: Contact Lens Wear (New Patient)  - $160', true, 3));
    // this.preDefinedExamTypes.push(new AppointmentType(1264, 'OHIP Child: 0-19', true, 4));
    // this.preDefinedExamTypes.push(new AppointmentType(1265, 'OHIP Senior: 65+', true, 5));
    this.preDefinedExamTypes.push(new AppointmentType(1291, 'Non-Ohip Child: 0-19', true, 4));
    this.preDefinedExamTypes.push(new AppointmentType(1290, 'Non-Ohip Senior: 65+', true, 5));
    this.preDefinedExamTypes.push(new AppointmentType(54460, 'Glasses Shopping', false, 6));
    this.preDefinedExamTypes.push(new AppointmentType(55173, 'Pick Up Order', false, 7));
    this.preDefinedExamTypes.push(new AppointmentType(55172, 'Repair/Adjustment', false, 8));
    this.preDefinedExamTypes.push(new AppointmentType(55170, 'Lenses Edgedown', false, 9));
  }

  clearSteps(id: number) {
    this.Steps.forEach(x => {
      if (x.order >= id) {
        x.needRefresh = false;
        x.validated = false;
        if (x.order != id) {
          x.enabled = false;
        }
      }
    });
    while (this.stepsData.length >= id) {
      this.stepsData.pop();
    }
    this.currentStep.validated = false;
  }

  InitiailzeExamTypes(preDef: AppointmentType[], apiExams: AppointmentType[]) {

    apiExams.forEach((x: AppointmentType) => {
      let tempExam: AppointmentType = new AppointmentType(-1, '', false, 0);
      tempExam = preDef.filter(t => t.id == x.id)[0] ? Object.assign(preDef.filter(t => t.id == x.id)[0], {}) : Object.assign(x, {});
      if (tempExam.id != -1)
        if (tempExam.id != 55186) {
          this.ActualExamTypes.push(tempExam);
        }
    });
    let tempActual: AppointmentType[] = this.ActualExamTypes;
    this.ActualExamTypes = [];
    for (let i = 0; i < tempActual.length; i++) {
      let tempExam: AppointmentType = new AppointmentType(-1, '', false, 0);
      tempExam = tempActual.filter(x => x.order == i + 1)[0];
      if (tempExam.id != -1)
        this.ActualExamTypes.push(tempExam);
    }
  }


}
