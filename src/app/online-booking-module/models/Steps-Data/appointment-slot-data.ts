import { AppointmentViewModel } from "./appointment-view-model";
import { DataParent } from "./data-parent";
import { SlotViewModel } from "./slot-view-model";

export class AppointmentSlotData extends DataParent {
    public CallendarDisabled: boolean;
    public SelectedDate: Date;
    public MinDate: Date;
    public MaxDate: Date;
    public ActiveDistinctAppointments: AppointmentViewModel[];
    public InvalidAppointments: Date[];
    public SelectedTimeSlot: SlotViewModel;
    public ActiveSlots: SlotViewModel[];


    constructor(_order: number, _type: string, _ce: boolean, _sd: Date, _min: Date, _max: Date, _dis: AppointmentViewModel[]
        , _invalid: Date[], _slot: SlotViewModel, _activeSlots: SlotViewModel[]) {
        super(_order, _type);
        this.CallendarDisabled = _ce;
        this.SelectedDate = _sd;
        this.MinDate = _min;
        this.MaxDate = _max;
        this.ActiveDistinctAppointments = _dis;
        this.InvalidAppointments = _invalid;
        this.SelectedTimeSlot = _slot;
        this.ActiveSlots = _activeSlots;

    }
}
