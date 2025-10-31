import { useEffect, useState } from "react";
import {
    getAssignments,
    type assignment,
} from "../../../../utility/localStorage";
import Heading from "../../../Heading";
import AssignmentListItem from "../../../../AssignmentListItem/AssignmentListItem";

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
                <li className="flex gap-2 w-full">
                    <div className="grid grid-rows-1 grid-cols-[5fr_5fr_5fr_1fr] w-full border border-[#696969] overflow-hidden">
                        <div className=" flex items-center justify-center p-4 border-r  border-r-[#696969] text-[#f0f0f0] min-w-0 w-full">
                            <Heading
                                fontName="fira code"
                                textColor="inherit"
                                className="break-all"
                                fontSize="var(--sub-heading)"
                                headingLevel="h3"
                            >
                                Title
                            </Heading>
                        </div>
                        <div className="flex items-center justify-center p-4 border-r  border-r-[#696969] text-[#f0f0f0] min-w-0 w-full">
                            <Heading
                                fontName="fira code"
                                textColor="inherit"
                                className="break-all"
                                fontSize="var(--sub-heading)"
                                headingLevel="h3"
                            >
                                Description
                            </Heading>
                        </div>
                        <div className="flex items-center justify-center p-4 border-r  border-r-[#696969] text-[#f0f0f0] min-w-0 w-full">
                            <Heading
                                fontName="fira code"
                                textColor="inherit"
                                className="break-all"
                                fontSize="var(--sub-heading)"
                                headingLevel="h3"
                            >
                                Link
                            </Heading>
                        </div>
                        <div className="flex items-center justify-center p-4 text-[#f0f0f0] min-w-0 w-full"></div>
                    </div>
                </li>
                {assignments.map((value) => (
                    <AssignmentListItem
                        description={value.description}
                        id={value.id}
                        role="student"
                        submission={value.submission}
                        title={value.title}
                        key={value.id}
                    ></AssignmentListItem>
                ))}
            </ul>
        </div>
    );
}
export default StudentDashboard;
