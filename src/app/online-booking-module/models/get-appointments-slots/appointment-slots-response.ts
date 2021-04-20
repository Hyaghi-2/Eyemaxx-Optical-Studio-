import { AppointmentSlot } from "./appointment-slot";

export class AppointmentSlotsResponse {
  public AppointmentSlotsList: AppointmentSlot[] = [];

  Initialize(data: any): AppointmentSlot[] {
      var list = data["appointmentsSlots"];
      list.array.forEach((_element: any) => {
          let p: AppointmentSlot = new AppointmentSlot();
          p = Object.assign(_element);
          this.AppointmentSlotsList.push(p);
      });
      return this.AppointmentSlotsList;
  }


  constructor() {

  }

}
