export class User {
    public firstName: string;
    public lastName: string;
    public province: string;
    public isExternal: boolean;
    public city: string;
    public id: string;
    public version: number;
    public email: string;


    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.province = '';
        this.isExternal = false;
        this.city = '';
        this.id = '';
        this.version = -1;
        this.email = '';

    }

}
