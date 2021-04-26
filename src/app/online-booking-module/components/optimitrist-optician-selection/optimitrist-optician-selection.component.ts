import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepsManagementService } from '../../services/steps-management.service';

@Component({
  selector: 'app-optimitrist-optician-selection',
  templateUrl: './optimitrist-optician-selection.component.html',
  styleUrls: ['./optimitrist-optician-selection.component.css']
})
export class OptimitristOpticianSelectionComponent implements OnInit {
  OpticianOptimitristForm: FormGroup;
  submitted: boolean = false;
  constructor(private steps: StepsManagementService,
    private fb: FormBuilder) {
    this.OpticianOptimitristForm = this.fb.group({
      OpticianOptimitristSelection: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  onOpticianOptimitristFormSubmit(e: any) {
    if (this.OpticianOptimitristForm.invalid) {
      e.preventDefault();
      return;
    }
    console.log(this.OpticianOptimitristForm.value);
  }

}
