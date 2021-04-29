import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Step } from '../../models/Step/step';
import { StepsManagementService } from '../../services/steps-management.service';

@Component({
  selector: 'app-optimitrist-optician-selection',
  templateUrl: './optimitrist-optician-selection.component.html',
  styleUrls: ['./optimitrist-optician-selection.component.css']
})
export class OptimitristOpticianSelectionComponent implements OnInit {
  currentStepInfo: Step = new Step(2, 'ServiceType', false, true, false, 'service-type');

  constructor(private steps: StepsManagementService) {

  }

  ngOnInit(): void {
    this.currentStepInfo.enabled = true;
    this.steps.currentStep = this.currentStepInfo;
  }
  onOpticianOptimitristFormSubmit(job: string) {
    console.log(job);
  }

}
