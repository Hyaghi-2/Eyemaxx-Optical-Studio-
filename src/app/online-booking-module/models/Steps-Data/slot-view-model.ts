
export class SlotViewModel {
    public id: number;
    public start: string;
    public end: string;


    constructor(_id: number, _start: string, _end: string) {
        this.id = _id;
        this.start = _start;
        this.end = _end;
    }
}
