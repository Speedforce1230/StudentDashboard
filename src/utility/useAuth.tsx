import { useContext } from "react";
import { UserContext } from "./userContext";

function useAuth() {
    return useContext(UserContext);
}
export default useAuth;
