export class AppointmentType {
    public order!: number
    public name!: string;
    public id!: number;
    public serviceRenderedByDoctor!: boolean;

    constructor(_id: number, _name: string, _service: boolean, _order: number) {
        this.serviceRenderedByDoctor = _service;
        this.id = _id;
        this.name = _name;
        this.order = _order;
    }


}
