import { Patient } from "./patient";

export class PatientListResponse {
    public patientList: Patient[] = [];

    Initialize(data: any): Patient[] {
        var list = data["patientList"];
        for (let i = 0; i < list.length; i++) {
            let p: Patient = new Patient();
            p = Object.assign(list[i]);
            this.patientList.push(p);
        }
        return this.patientList;
    }
    constructor() {

    }
}
