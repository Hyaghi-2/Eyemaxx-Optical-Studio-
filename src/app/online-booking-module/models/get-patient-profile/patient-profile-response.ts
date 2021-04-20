export class PatientProfileResponse {
    public lastName!: string;
    public country!: string;
    public gender!: number;
    public streetNumber!: number;
    public city!: string;
    public postalCode!: string;
    public dateOfBirth!: string;
    public cell!: string;
    public version!: string;
    public countryId!: number;
    public medicalCard!: string;
    public firstName!: string;
    public languagePreference!: string;
    public streetName!: string;
    public unit!: string;
    public province!: string;
    public phone!: string;
    public medicalCardVersion!: string;
    public id!: number;
    public email!: string;
    public medicalCardExp!: string;

    Initialize(data: any): PatientProfileResponse {
        let p: PatientProfileResponse = new PatientProfileResponse();
        p = Object.assign(data["patient"]);
        return p;
    }
    constructor() {
    }
}
