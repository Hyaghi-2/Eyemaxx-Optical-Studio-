import { DataParent } from "./data-parent";

export class AppointmentSummaryData extends DataParent {
    OpticianAppointment: boolean;


    constructor(_order: number, _type: string, _optician: boolean) {
        super(_order, _type);
        this.OpticianAppointment = _optician;
    }
}
