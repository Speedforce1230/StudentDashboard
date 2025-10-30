import { useEffect } from "react";
import "./App.css";
import Landing from "./components/Landing/Landing";
import { createLocalStorage } from "./utility/localStorage";

function App() {
    useEffect(() => {
        createLocalStorage();
    }, []);
    return (
        <>
            <Landing></Landing>
        </>
    );
}

export default App;
