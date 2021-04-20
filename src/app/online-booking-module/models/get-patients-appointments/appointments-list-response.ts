import { Appointment } from "./appointment";

export class AppointmentsListResponse {
  public AppointmentList: Appointment[] = [];

  Initialize(data: any): Appointment[] {
      var list = data;
      list.array.forEach((_element: any) => {
          let p: Appointment = new Appointment();
          p = Object.assign(_element);
          this.AppointmentList.push(p);
      });
      return this.AppointmentList;
  }


  constructor() {

  }
}
