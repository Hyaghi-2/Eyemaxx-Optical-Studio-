import { Patient } from "../create-patient/patient";
import { PatientListResponse } from "../get-patients/patient-list-response";
import { DataParent } from "./data-parent";

export class AppointmentConfirmationData extends DataParent {

  SelectedUser: Patient;
  UsersList: PatientListResponse;
  constructor(_order: number, _type: string, _user: Patient, _users: PatientListResponse) {
    super(_order, _type);
    this.SelectedUser = new Patient();
    this.SelectedUser = _user;
    this.UsersList = _users;

  }

}
