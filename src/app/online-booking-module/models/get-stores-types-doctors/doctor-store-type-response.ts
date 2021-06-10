import { AppointmentType } from "./appointment-type";
import { Doctor } from "./doctor";
import { Store } from "./store";

export class DoctorStoreTypeResponse {
    public Store: Store = new Store();
    public AppointmentTypes: AppointmentType[] = [];
    public Doctors: Doctor[] = [];

    Initialize(data: any) {
        this.Store = data["stores"][0];
        var types = data["appointmentTypes"];
        types.forEach((_element: any) => {
            let t: AppointmentType = new AppointmentType(0, '', false, 0);
            //t = <AppointmentType>Object.assign(JSON.parse(_element), {});
            t.id = _element['id'];
            t.name = _element['name'];
            t.serviceRenderedByDoctor = _element['serviceRenderedByDoctor'];
            this.AppointmentTypes.push(t);
        });
        var doctors = data["doctors"];
        doctors.forEach((_element: any) => {
            let t: Doctor = new Doctor();
            t = Object.assign(_element);
            this.Doctors.push(t);
        });
    }
    constructor() {

    }
}
