import { createContext , useContext } from "react";

export const UserContextCreater = createContext({
    Username : "",
    Token : ""
});

export const UserConext = () => useContext(UserContextCreater);

export const UserConetxtProvider = UserContextCreater.Provider;