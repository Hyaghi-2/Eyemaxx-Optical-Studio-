import { Component, OnInit } from '@angular/core';
import { AppointmentType } from '../../models/get-stores-types-doctors/appointment-type';
import { DoctorStoreTypeResponse } from '../../models/get-stores-types-doctors/doctor-store-type-response';
import { BookingModuleService } from '../../services/booking-module-service.service';

@Component({
  selector: 'app-appointmentstypes',
  templateUrl: './appointmentstypes.component.html',
  styleUrls: ['./appointmentstypes.component.css']
})
export class AppointmentstypesComponent implements OnInit {

  DoctorStoreTypeData: DoctorStoreTypeResponse = new DoctorStoreTypeResponse();
  accountsId: number = 2040;
  companyName: string = 'test EyeMaxx';
  constructor(private serv: BookingModuleService) { }

  ngOnInit(): void {
    this.serv.getStoresTypesDoctors(this.accountsId, this.companyName).subscribe(t => {
      this.DoctorStoreTypeData.Initialize(t);
      console.log(this.DoctorStoreTypeData);

    });

  }

}
