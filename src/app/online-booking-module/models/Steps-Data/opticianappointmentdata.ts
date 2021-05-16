import { DataParent } from "./data-parent"

export class OpticianAppointmentData extends DataParent {
  public Email: string;


  constructor(_order: number, _type: string, _email: string) {
    super(_order, _type);
    this.Email = _email;
  }
}
