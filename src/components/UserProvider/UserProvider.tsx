import { useState } from "react";
import { UserContext, defaultUser } from "../../utility/userContext";

function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(defaultUser.user);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
