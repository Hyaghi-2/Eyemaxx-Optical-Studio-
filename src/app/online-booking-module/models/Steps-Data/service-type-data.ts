import { DataParent } from "./data-parent";

export class ServiceTypeData extends DataParent {
    public job: string


    constructor(_order: number, _type: string, _job: string) {
        super(_order, _type);
        this.job = _job
    }
}
