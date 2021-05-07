import { SlotViewModel } from "./slot-view-model"

export class AppointmentViewModel {
    public AppointmentDate: Date = new Date();
    public Slots: SlotViewModel[] = [];


    constructor() {

    }
}
