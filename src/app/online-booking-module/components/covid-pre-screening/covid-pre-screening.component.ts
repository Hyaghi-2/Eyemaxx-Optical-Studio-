import { Component, OnInit } from '@angular/core';
import { StepsManagementService } from '../../services/steps-management.service';

@Component({
  selector: 'app-covid-pre-screening',
  templateUrl: './covid-pre-screening.component.html',
  styleUrls: ['./covid-pre-screening.component.css']
})
export class CovidPreScreeningComponent implements OnInit {

  constructor(private steps: StepsManagementService) { }

  ngOnInit(): void {
  }

  increase() {
    this.steps.s += 1;
  }

}
