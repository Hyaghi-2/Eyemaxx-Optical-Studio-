import { Component, OnInit } from '@angular/core';
import { StepsManagementService } from '../../services/steps-management.service';

@Component({
  selector: 'app-optimitrist-optician-selection',
  templateUrl: './optimitrist-optician-selection.component.html',
  styleUrls: ['./optimitrist-optician-selection.component.css']
})
export class OptimitristOpticianSelectionComponent implements OnInit {

  constructor(private steps: StepsManagementService) { }

  ngOnInit(): void {
  }
  deacrease() {
    this.steps.s -= 1;

  }

}
