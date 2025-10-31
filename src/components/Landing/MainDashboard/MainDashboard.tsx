import useAuth from "../../../utility/useAuth";
import BaseText from "../../BaseText";
import Heading from "../../Heading";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import StudentDashboard from "./StudentDashboard/StudentDashboard";
function MainDashboard() {
    const { user } = useAuth();
    if (!user)
        return (
            <div className="flex w-full h-dvh items-center justify-center">
                <BaseText fontName="fira code">User not found</BaseText>
            </div>
        );
    return (
        <div className="flex flex-col w-full min-h-dvh h-auto  items-center justify-start">
            <Heading fontName="fira code">Welcome, {user.username}</Heading>

            <div className="flex flex-col w-[90%] items-center justify-center">
                {user.role === "student" ? (
                    <StudentDashboard></StudentDashboard>
                ) : (
                    <AdminDashboard></AdminDashboard>
                )}
            </div>
        </div>
    );
}
export default MainDashboard;
