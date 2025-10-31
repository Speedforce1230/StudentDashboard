import { useEffect, useRef, useState } from "react";
import {
    getAssignments,
    addAssignment,
    type assignment,
} from "../../../../utility/localStorage";
import Heading from "../../../Heading";
import AssignmentListItem from "../../../../AssignmentListItem/AssignmentListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AdminDashboard() {
    const [assignments, setAssignments] = useState<assignment[]>([]);
    const assignmentListRef = useRef<HTMLUListElement | null>(null);
    const [adding, setAdding] = useState(false);
    const handleAddTask = () => {
        if (!assignmentListRef.current) return;
        setAdding(true);
        const title = "New Title";
        const newAssignment: assignment = {
            title,
            description: "Lorem ipsum",
            submission: "",
            id: crypto.randomUUID(),
        };
        // Updating Local Storage
        const updatedAssignments = addAssignment(newAssignment);
        if (!updatedAssignments) {
            console.error("Failed to update assignments: ");
            return;
        }
        setAssignments(updatedAssignments);
        setAdding(false);
    };
    useEffect(() => {
        if (adding) return;
        const assignments = getAssignments();
        setAssignments(assignments);
    }, [adding]);
    return (
        <div className="grid grid-cols-1 grid-rows-[repeat(2, auto)] items-start justify-items-start w-full h-auto">
            <div className="flex items-center justify-between w-full flex-wrap">
                <Heading fontName="fira code" className="self-start">
                    Assignments
                </Heading>
            </div>
            <ul
                className="flex flex-col flex-wrap w-full items-start justify-start bg-[#323131] rounded-(--border-radius-default) p-4"
                ref={assignmentListRef}
            >
                <li className="flex gap-2 w-full">
                    <div className="grid grid-rows-1 grid-cols-[5fr_5fr_5fr_5fr_1fr] w-full border border-[#696969] overflow-hidden">
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
                        <div className="flex items-center justify-center p-4 text-[#f0f0f0] min-w-0 w-full border-r border-r-[#696969]">
                            <Heading
                                fontName="fira code"
                                textColor="inherit"
                                className="break-all"
                                fontSize="var(--sub-heading)"
                                headingLevel="h3"
                            >
                                Submissions
                            </Heading>
                        </div>
                        <div className="flex gap-1 p-1 items-center justify-center">
                            <button
                                className="text-green-500 transition-colors duration-300 ease-out hover:text-[#38A169] cursor-pointer "
                                title="Add Assignment"
                                onClick={handleAddTask}
                            >
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        aspectRatio: 1,
                                        maxWidth: 30,
                                    }}
                                ></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                </li>

                {assignments.map((assignment) => (
                    <AssignmentListItem
                        title={assignment.title}
                        role="admin"
                        description={assignment.description}
                        submission={assignment.submission}
                        key={assignment.id}
                        id={assignment.id}
                        setAssignments={setAssignments}
                    ></AssignmentListItem>
                ))}
            </ul>
        </div>
    );
}
export default AdminDashboard;
