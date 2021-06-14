
export class SlotViewModel {
    public id: number;
    public start: string;
    public end: string;
    doctorId: number;

    constructor(_id: number, _start: string, _end: string, _docId: number) {
        this.id = _id;
        this.start = _start;
        this.end = _end;
        this.doctorId = _docId;
    }
}
