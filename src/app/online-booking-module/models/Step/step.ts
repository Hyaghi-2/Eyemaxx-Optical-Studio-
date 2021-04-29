export class Step {
    public order: number = -1;
    public name: string = '';
    public needRefresh: boolean = false;
    public enabled: boolean = false;
    public validated: boolean = false;
    public route: string = '';

    constructor(_order: number, _name: string, _nR: boolean, _enabled: boolean, _validated: boolean, _route: string) {
        this.order = _order;
        this.name = _name;
        this.needRefresh = _nR;
        this.enabled = _enabled;
        this.validated = _validated;
        this.route = _route
    }
}
