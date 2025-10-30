import { useEffect, useRef, useState } from "react";
import BaseText from "../../BaseText";
import Heading from "../../Heading";
import getFontClasses from "../../../utility/getFont";
import InputEntry from "../../InputEntry/InputEntry";
import { getAllowedUsers, type user } from "../../../utility/localStorage";
import useAuth from "../../../utility/useAuth";
import Button from "../../Button/Button";

interface LoginProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
function Login({ setLoggedIn }: LoginProps) {
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const { setUser } = useAuth();
    const [allowedUsers, setAllowedUsers] = useState<user[] | null>(null);
    const [error, setError] = useState<"none" | "username" | "password">(
        "none"
    );
    const font = getFontClasses("fira code");
    const handleEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.trim() !== "") {
            setError("none");
        }
    };
    useEffect(() => {
        const allowedUsers = getAllowedUsers();
        if (allowedUsers) {
            setAllowedUsers(allowedUsers);
        }
    }, []);
    const handleLogin = () => {
        if (!usernameRef.current || !passwordRef.current || !allowedUsers)
            return;
        const username = usernameRef.current;
        const password = passwordRef.current;
        const usernameValue = usernameRef.current.value.trim().toLowerCase();
        const passwordValue = passwordRef.current.value.trim();
        const user = allowedUsers.find(
            (value) => value.username === usernameValue
        );
        if (!user) {
            setError("username");
            username.focus();
            return;
        }
        if (user.password !== passwordValue) {
            setError("password");
            password.focus();
            return;
        }
        setUser(user);
        setLoggedIn(true);
    };
    return (
        <div className="relative flex flex-col items-center justify-center min-w-[300px] max-w-[700px] w-[20%] bg-[#323131] rounded-(--border-radius-default) gap-[clamp(20px,2vw,50px)] border border-[#626262] p-4 ">
            <Heading
                headingLevel="h2"
                textColor="#F8F8FF"
                fontSize="var(--sub-heading)"
            >
                Login
            </Heading>
            <div className="flex flex-col items-start justify-center self-start w-full gap-4">
                <div className="flex flex-col items-start justify-center w-full gap-2">
                    <BaseText
                        fontName="fira code"
                        fontSize="var(--small-text)"
                        fontWeight={500}
                    >
                        Username
                    </BaseText>

                    <InputEntry
                        style={{
                            fontSize: "var(--small-text)",
                            fontWeight: 300,
                        }}
                        onChange={handleEntryChange}
                        ref={usernameRef}
                    ></InputEntry>
                </div>
                <div className="flex flex-col items-start justify-center w-full gap-2">
                    <BaseText
                        fontName="fira code"
                        fontSize="var(--small-text)"
                        fontWeight={500}
                    >
                        Password
                    </BaseText>
                    <InputEntry
                        style={{
                            fontSize: "var(--small-text)",
                            fontWeight: 300,
                        }}
                        type="password"
                        onChange={handleEntryChange}
                        ref={passwordRef}
                    ></InputEntry>
                </div>

                <Button className={font} onClick={handleLogin}>
                    <BaseText
                        fontName="fira code"
                        fontSize="var(--small-text)"
                        textColor="inherit"
                    >
                        Log in
                    </BaseText>
                </Button>
            </div>
            {error !== "none" && (
                <BaseText
                    textColor="#D32F2F"
                    className="absolute bottom-0 w-full transform translate-y-full"
                    fontSize="var(--small-text)"
                    fontName="fira code"
                >
                    {error === "password"
                        ? "Incorrect Password!"
                        : "Incorrect Username!"}
                </BaseText>
            )}
        </div>
    );
}
export default Login;
