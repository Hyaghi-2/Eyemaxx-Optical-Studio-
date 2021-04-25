import { Injectable } from '@angular/core';
import { Step } from '../models/Step/step';

@Injectable({
  providedIn: 'root'
})
export class StepsManagementService {
  public s: number = 0;
  public Steps: Step[] = [];
  public currentStep!: Step;

  constructor() {

  }


}
