import {AuthType} from "./api";


class AuthContainer {
    private authType: AuthType | undefined;

    constructor() {
        this.authType = undefined;
    }

    resetAuthType(): void {
        this.authType = undefined;
    }

    getAuthType(): AuthType | undefined {
        return this.authType;
    }

    setAuthType(username: string, password: string): void {
        this.authType = {
            username: username,
            password: password
        };
    }

    isAuthorized(): boolean {
        return !!this.authType;
    }
}

export default AuthContainer;