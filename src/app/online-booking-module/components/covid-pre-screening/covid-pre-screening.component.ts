import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepsManagementService } from '../../services/steps-management.service';

@Component({
  selector: 'app-covid-pre-screening',
  templateUrl: './covid-pre-screening.component.html',
  styleUrls: ['./covid-pre-screening.component.css']
})
export class CovidPreScreeningComponent implements OnInit {
  @Input('COVID19Enabled') StepEnabled!: boolean;
  CovidPreScrForm: FormGroup;
  submitted: boolean = false;
  constructor(public steps: StepsManagementService,
    private fb: FormBuilder) {
    this.CovidPreScrForm = this.fb.group({
      firstOption: [false, Validators.requiredTrue],
      secondOption: [false, Validators.requiredTrue],
      thirdOption: [false, Validators.requiredTrue]
    });
  }

  get f() {
    return this.CovidPreScrForm.controls;
  }

  onCovidPreScrFormSubmit(e: any) {
    this.submitted = true;
    if (this.CovidPreScrForm.invalid) {
      e.preventDefault();
      return;
    }
  }

  ngOnInit(): void {

  }



}
