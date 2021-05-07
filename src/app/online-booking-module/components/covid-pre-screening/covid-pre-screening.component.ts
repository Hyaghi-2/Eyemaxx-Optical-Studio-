import { AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, startWith } from 'rxjs/operators';
import { Step } from '../../models/Step/step';
import { Covid19Data } from '../../models/Steps-Data/covid19-data';
import { DataParent } from '../../models/Steps-Data/data-parent';
import { StepsManagementService } from '../../services/steps-management.service';

@Component({
  selector: 'app-covid-pre-screening',
  templateUrl: './covid-pre-screening.component.html',
  styleUrls: ['./covid-pre-screening.component.css']
})
export class CovidPreScreeningComponent implements OnInit, AfterViewChecked {
  @Input('COVID19Enabled') StepEnabled!: boolean;
  CovidPreScrForm!: FormGroup;
  submitted: boolean = false;
  constructor(public steps: StepsManagementService,
    private fb: FormBuilder) {
    let s: Covid19Data = <Covid19Data>this.steps.stepsData.filter(x => x.order == 1)[0];
    if (!s) {
      this.CovidPreScrForm = this.fb.group({
        firstOption: [false, Validators.requiredTrue],
        secondOption: [false, Validators.requiredTrue],
        thirdOption: [false, Validators.requiredTrue],
        fourthOption: [false, Validators.requiredTrue]
      });
      this.steps.currentStep = new Step(1, 'COVID19preScr', false, true, false, 'covid19');

    } else {
      this.CovidPreScrForm = this.fb.group({
        firstOption: [s.firstOption, Validators.requiredTrue],
        secondOption: [s.secondOption, Validators.requiredTrue],
        thirdOption: [s.thirdOption, Validators.requiredTrue],
        fourthOption: [s.fourthOption, Validators.requiredTrue]

      });
      this.steps.currentStep = new Step(1, 'COVID19preScr', false, true, true, 'covid19');

    }
  }
  ngAfterViewChecked(): void {
    this.onCovidPreScrFormChanges();
  }


  get f() {
    return this.CovidPreScrForm.controls;
  }

  onCovidPreScrFormChanges() {
    this.CovidPreScrForm.valueChanges.subscribe(x => {
      this.steps.clearSteps(1);
      if (this.CovidPreScrForm.valid) {
        this.steps.currentStep.validated = true;
        let p: Covid19Data = new Covid19Data(1, true, true, true, true);
        this.steps.stepsData.push(p);
        this.steps.Steps.filter(x => x.order == this.steps.currentStep.order + 1)[0].enabled = this.steps.currentStep.validated;
      }
    });

  }


  ngOnInit(): void {

  }




}
