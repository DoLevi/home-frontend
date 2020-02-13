import {PurchaseControllerApi, UserControllerApi} from "./api";
import {createContext} from "react";
import AuthContainer from "./AuthContainer";

const backendBasePath = 'http://localhost:8080/backend';

const userApi = new UserControllerApi(backendBasePath);
const purchaseApi = new PurchaseControllerApi(backendBasePath);

const AuthContext = createContext<AuthContainer>(new AuthContainer());

export {
    userApi,
    purchaseApi,
    AuthContext,
}
