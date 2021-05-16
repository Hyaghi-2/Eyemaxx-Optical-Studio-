import { Patient } from "../create-patient/patient";
import { DataParent } from "./data-parent";

export class AppointmentConfirmationData extends DataParent {

    SelectedUser: Patient;

    /**
     *
     */
    constructor(_order: number, _type: string, _user: Patient) {
        super(_order, _type);
        this.SelectedUser = new Patient();
        this.SelectedUser = _user;

    }

}
