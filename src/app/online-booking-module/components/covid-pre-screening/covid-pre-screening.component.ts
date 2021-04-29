import { AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, startWith } from 'rxjs/operators';
import { Step } from '../../models/Step/step';
import { StepsManagementService } from '../../services/steps-management.service';

@Component({
  selector: 'app-covid-pre-screening',
  templateUrl: './covid-pre-screening.component.html',
  styleUrls: ['./covid-pre-screening.component.css']
})
export class CovidPreScreeningComponent implements OnInit, AfterViewChecked {
  @Input('COVID19Enabled') StepEnabled!: boolean;
  CovidPreScrForm: FormGroup;
  currentStepInfo: Step = new Step(1, 'COVID19preScr', false, true, false, 'covid19');
  submitted: boolean = false;
  constructor(public steps: StepsManagementService,
    private fb: FormBuilder) {
    this.CovidPreScrForm = this.fb.group({
      firstOption: [false, Validators.requiredTrue],
      secondOption: [false, Validators.requiredTrue],
      thirdOption: [false, Validators.requiredTrue]
    });
  }
  ngAfterViewChecked(): void {
    this.onCovidPreScrFormChanges();
  }


  get f() {
    return this.CovidPreScrForm.controls;
  }

  onCovidPreScrFormChanges() {

    this.CovidPreScrForm.valueChanges.subscribe(x => {
      this.currentStepInfo.validated = this.CovidPreScrForm.valid;
      this.steps.currentStep = this.currentStepInfo;
      this.steps.Steps.filter(x => x.order == this.currentStepInfo.order + 1)[0].enabled = this.steps.currentStep.validated;
    });
  }


  ngOnInit(): void {
    this.steps.currentStep = this.currentStepInfo;
  }




}
