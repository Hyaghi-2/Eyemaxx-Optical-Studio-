import { Patient } from "./patient";

export class PatientListResponse {
    public patientList: Patient[] = [];

    Initialize(data: any): Patient[] {
        var list = data["patientList"];
        list.array.forEach((_element: any) => {
            let p: Patient = new Patient();
            p = Object.assign(_element);
            this.patientList.push(p);
        });
        return this.patientList;
    }


    constructor() {

    }
}
