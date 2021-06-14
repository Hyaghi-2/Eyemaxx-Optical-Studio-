export class AppointmentSlot {

    public start: Date;
    public end: Date;
    public id: number;
    public doctorId: number;

    constructor() {
        this.start = new Date();
        this.end = new Date();
        this.id = -1;
        this.doctorId = -20;
    }
}
