export class LoginBody {
    public accountsId: number;
    public expiration: number;
    public storeId: number;
    constructor() {
        this.accountsId = 2040;
        this.storeId = 1;
        this.expiration = 24;
    }
}
