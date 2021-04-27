export class Step {
    public order: number;
    public name: string;
    public needRefresh: boolean;
    public enabled: boolean;
    public validated: boolean;

    constructor(_order: number, _name: string, _nR: boolean, _enabled: boolean, _validated: boolean) {
        this.order = _order;
        this.name = _name;
        this.needRefresh = _nR;
        this.enabled = _enabled;
        this.validated = _validated;
    }
}
