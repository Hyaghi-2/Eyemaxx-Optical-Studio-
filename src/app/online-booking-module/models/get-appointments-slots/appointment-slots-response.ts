import { AppointmentSlot } from "./appointment-slot";

export class AppointmentSlotsResponse {
  public AppointmentSlotsList: AppointmentSlot[] = [];

  Initialize(data: any) {
    let list: any[] = data["appointmentsSlots"];
    for (let i = 0; i < list.length; i++) {
      let _start: Date = new Date(list[i].start);
      let _end: Date = new Date(list[i].end);
      let _id: number = list[i].id;
      let p: AppointmentSlot = new AppointmentSlot();
      p.start = _start;
      p.end = _end;
      p.id = _id;
      this.AppointmentSlotsList.push(p);
    }
    return this.AppointmentSlotsList;
  }

  constructor() {

  }

}
