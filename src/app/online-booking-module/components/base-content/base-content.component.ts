import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Step } from '../../models/Step/step';
import { BookingModuleService } from '../../services/booking-module-service.service';
import { StepsManagementService } from '../../services/steps-management.service';

@Component({
  selector: 'app-base-content',
  templateUrl: './base-content.component.html',
  styleUrls: ['./base-content.component.css']
})
export class BaseContentComponent implements OnInit {

  constructor(private steps: StepsManagementService,
    private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {

  }

  stepsEnabled(_order: number) {
    let enabled: boolean = this.steps.Steps.filter(x => x.order == _order)[0].enabled;
    return enabled;
  }

  currentStepStatus(): Step {
    return this.steps.currentStep;
  }

  navigate(id: number) {
    let s: string = this.steps.Steps.filter(x => x.order == id)[0].route;
    this.router.navigate([s], { relativeTo: this.route });
  }

}
/*select*from!groupby@*/