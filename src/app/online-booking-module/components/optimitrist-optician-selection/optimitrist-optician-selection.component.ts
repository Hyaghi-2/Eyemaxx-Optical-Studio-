import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Step } from '../../models/Step/step';
import { DataParent } from '../../models/Steps-Data/data-parent';
import { ServiceTypeData } from '../../models/Steps-Data/service-type-data';
import { StepsManagementService } from '../../services/steps-management.service';

@Component({
  selector: 'app-optimitrist-optician-selection',
  templateUrl: './optimitrist-optician-selection.component.html',
  styleUrls: ['./optimitrist-optician-selection.component.css']
})
export class OptimitristOpticianSelectionComponent implements OnInit {

  constructor(private steps: StepsManagementService) {
    let s: ServiceTypeData = <ServiceTypeData>this.steps.stepsData.filter(x => x.order == 2)[0];
    if (!s) {
      this.steps.currentStep = new Step(2, 'ServiceType', false, true, false, 'service-type');
      console.log(s);

    }
    else {
      this.steps.currentStep = new Step(2, 'ServiceType', false, true, true, 'service-type');
      console.log(s);

    }

  }

  ngOnInit(): void {
  }
  onOpticianOptimitristFormSubmit(job: string) {
    this.steps.clearSteps(2);
    this.steps.currentStep.validated = true;
    let p: ServiceTypeData = new ServiceTypeData(2, 'ServiceType', job);
    this.steps.stepsData.push(p);
    this.steps.Steps.filter(x => x.order == this.steps.currentStep.order + 1)[0].enabled = this.steps.currentStep.validated;
    console.log(job);
    console.log(this.steps.Steps);
    console.log(this.steps.stepsData);
  }

}
