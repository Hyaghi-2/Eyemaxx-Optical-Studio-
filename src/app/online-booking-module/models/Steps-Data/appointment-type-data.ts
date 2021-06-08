import { AppointmentType } from "../get-stores-types-doctors/appointment-type";
import { Doctor } from "../get-stores-types-doctors/doctor";
import { DoctorStoreTypeResponse } from "../get-stores-types-doctors/doctor-store-type-response";
import { DataParent } from "./data-parent";

export class AppointmentTypeData extends DataParent {
    //the selected data from the user
    public ExamType!: AppointmentType;
    public Staff!: Doctor;
    public isOptomitrist: boolean;
    public isEdgeDown: boolean;
    public isOpticain: boolean;
    //component behavior
    DoctorStoreTypeData: DoctorStoreTypeResponse;
    constructor(_order: number, _type: string, _appType: AppointmentType,
        _isOptst: boolean, _behavior: DoctorStoreTypeResponse, _edge: boolean, optician: boolean, _staff?: Doctor) {
        super(_order, _type);
        this.ExamType = _appType;
        this.isOptomitrist = _isOptst;
        this.DoctorStoreTypeData = _behavior;
        if (_staff) {
            this.Staff = _staff;
        } else {
            this.Staff = new Doctor();
            this.Staff.id = -1;
        }
        this.isEdgeDown = _edge;
        this.isOpticain = optician;
    }
}
