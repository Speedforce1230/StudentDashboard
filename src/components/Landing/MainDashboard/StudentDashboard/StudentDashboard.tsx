import { useEffect, useState } from "react";
import {
    getAssignments,
    type assignment,
} from "../../../../utility/localStorage";
import BaseText from "../../../BaseText";
import Heading from "../../../Heading";

function StudentDashboard() {
    const [assignments, setAssignments] = useState<assignment[]>([]);
    useEffect(() => {
        const assignments = getAssignments();
        setAssignments(assignments);
    }, []);
    return (
        <div className="flex flex-col items-start justify-start w-full ">
            <Heading fontName="fira code" className="self-start">
                Assignments
            </Heading>
            <ul className="flex w-full flex-col items-start justify-start bg-[#323131] rounded-(--border-radius-default) p-4">
                {assignments.map((value, index) => (
                    <li key={index} className="p-4">
                        <BaseText
                            fontName="fira code"
                            fontSize="var(--small-text)"
                        >
                            {value.title}
                        </BaseText>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default StudentDashboard;
