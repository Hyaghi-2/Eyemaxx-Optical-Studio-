import { SinglePatient } from "./patient";

export class PatientListResponse {
    public patientList: SinglePatient[] = [];

    Initialize(data: any): SinglePatient[] {
        var list:any[] = data["patientList"];
        list.forEach((_element: any) => {
            let p: SinglePatient = new SinglePatient();
            p = Object.assign(_element);
            this.patientList.push(p);
        });
        return this.patientList;
    }


    constructor() {

    }
}
