import { AppointmentType } from "../get-stores-types-doctors/appointment-type";
import { Doctor } from "../get-stores-types-doctors/doctor";
import { DataParent } from "./data-parent";

export class AppointmentTypeData extends DataParent {
    ExamType!: AppointmentType;
    Staff!: Doctor;
    public isOptomitrist: boolean;
    public isEdgeDown: boolean;
    public isAnyOptomitrist: boolean;

    constructor(_order: number, _type: string, _typeId: AppointmentType, _staffid: Doctor,
        _job: boolean, _isED: boolean, _isAny: boolean) {
        super(_order, _type);
        this.ExamType = _typeId;
        this.Staff = _staffid;
        this.isOptomitrist = _job;
        this.isEdgeDown = _isED;
        this.isAnyOptomitrist = _isAny;
    }
}
