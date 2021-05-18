export class BookAppointmentBody {
    public earlyRequest!: boolean;
    public earlyRequestComment!: boolean;
    public appointmentTypeId!: number;
    public storeId!: number;
    public doctorId!: number;
    public patientId!: number;
    public appointmentModification!: boolean;
    public oldappointmentId!: number;
    public isBookedOnline!: boolean;


    constructor() {
        this.earlyRequest = true;
        this.earlyRequestComment = true;
        this.isBookedOnline = true;
    }

}
