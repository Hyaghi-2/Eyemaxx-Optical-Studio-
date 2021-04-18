export class Store {
    public country: number;
    public eFaxUsed: boolean;
    public pr: string;
    public streetNumber: number;
    public city: string;
    public companyName: string;
    public postalCode: string;
    public telephone: string;
    public storeId: number;
    public streetName: string;
    public unit: number;
    public name: string;
    public email: string;

    constructor() {
        this.country = -1;
        this.eFaxUsed = false;
        this.pr = '';
        this.streetNumber = -1;
        this.city = '';
        this.companyName = '';
        this.postalCode = '';
        this.telephone = '';
        this.storeId = -1;
        this.streetName = '';
        this.unit = -1;
        this.name = '';
        this.email = '';
    }
}
