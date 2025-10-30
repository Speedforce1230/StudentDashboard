import { useState } from "react";
import Login from "./Login/Login";
import MainDashboard from "./MainDashboard/MainDashboard";
function Landing() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div
            className={`flex flex-row w-full h-dvh bg-[#191919] justify-center items-center `}
        >
            {loggedIn ? (
                <MainDashboard></MainDashboard>
            ) : (
                <Login setLoggedIn={setLoggedIn}></Login>
            )}
        </div>
    );
}
export default Landing;
