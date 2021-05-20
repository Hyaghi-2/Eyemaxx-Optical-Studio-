export class BookAppointmentBody {


    public earlyRequest: boolean;
    public earlyRequestComment: string;
    public appointmentTypeId: number;
    public storeId: number;
    public doctorId: string;
    public slotId: number;
    public patientId: number;
    public appointmentModification: string;
    public oldappointmentId: string;
    public isBookedOnline: boolean;


    constructor() {
        this.earlyRequest = false;
        this.earlyRequestComment = "";
        this.appointmentTypeId = -1;
        this.storeId = -1;
        this.doctorId = "";
        this.slotId = -1;
        this.patientId = -1;
        this.appointmentModification = "false";
        this.oldappointmentId = "";
        this.isBookedOnline = true;
    }

}
