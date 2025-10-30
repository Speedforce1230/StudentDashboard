import { createContext } from "react";
import type { user } from "./localStorage";

interface UserContextObject {
    user: user | undefined;
    setUser: React.Dispatch<React.SetStateAction<user | undefined>>;
}
export const defaultUser: UserContextObject = {
    user: undefined,
    setUser: () => {},
};
export const UserContext = createContext<UserContextObject>(defaultUser);
