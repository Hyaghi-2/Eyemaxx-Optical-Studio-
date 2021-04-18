import { Store } from "./store";
import { User } from "./user";

export class LoginResponse {
    private Token: string;
    private store: Store;
    private user: User;

    get getToken(): string {
        return this.Token;
    }
    set setToken(_token: string) {
        this.Token = _token;
    }

    get getStore(): Store {
        return this.store;
    }

    get getUser(): User {
        return this.user;
    }


    Initialize(data: any) {
        this.Token = data["Token"];
        this.store = Object.assign(data["store"]);
        this.user = Object.assign(data["user"]);
    }
    constructor() {
        this.Token = '';
        this.store = new Store();
        this.user = new User();
    }

}
