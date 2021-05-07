import { AppointmentType } from "../get-stores-types-doctors/appointment-type";
import { Doctor } from "../get-stores-types-doctors/doctor";
import { DataParent } from "./data-parent";

export class AppointmentTypeData extends DataParent {
    ExamType!: AppointmentType;
    Staff!: Doctor;
    public isOptomitrist: boolean;
    constructor(_order: number, _type: string, _appType: AppointmentType,
        _isOptst: boolean, _staff?: Doctor) {
        super(_order, _type);
        this.ExamType = _appType;
        this.isOptomitrist = _isOptst;
        if (_staff) {
            this.Staff = _staff;
        }
    }
}
