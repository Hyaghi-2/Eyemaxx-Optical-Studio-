export class AppointmentSlot {

    public start: Date;
    public end: Date;
    public id: number;

    constructor() {
        this.start = new Date();
        this.end = new Date();
        this.id = -1;
    }
}
