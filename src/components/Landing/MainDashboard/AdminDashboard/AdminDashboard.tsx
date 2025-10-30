import { useEffect, useRef, useState } from "react";
import {
    getAssignments,
    addAssignment,
    type assignment,
} from "../../../../utility/localStorage";
import Button from "../../../Button/Button";
import BaseText from "../../../BaseText";
import Heading from "../../../Heading";

function AdminDashboard() {
    const [assignments, setAssignments] = useState<assignment[]>([]);
    const assignmentListRef = useRef<HTMLUListElement | null>(null);
    const [adding, setAdding] = useState(false);
    const handleAddTask = () => {
        if (!assignmentListRef.current) return;
        setAdding(true);
        const title = "New Title";
        const newAssignment: assignment = { title, description: "Lorem ipsum" };
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
        <div className="flex flex-col items-start justify-start w-full">
            <div className="flex items-center justify-between w-full">
                <Heading fontName="fira code" className="self-start">
                    Assignments
                </Heading>
                <Button
                    className="flex-none max-w-[200px]"
                    onClick={handleAddTask}
                    disabled={adding}
                >
                    <BaseText
                        fontName="fira code"
                        fontSize="var(--small-text)"
                        textColor="inherit"
                    >
                        Add Task
                    </BaseText>
                </Button>
            </div>
            <ul
                className="flex w-full flex-col items-start justify-start bg-[#323131] rounded-(--border-radius-default) p-4"
                ref={assignmentListRef}
            >
                {assignments.reverse().map((value, index) => (
                    <li key={index} className="p-4">
                        <BaseText
                            fontName="fira code"
                            fontSize="var(--small-text)"
                        >
                            {value.title}-{index}
                        </BaseText>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default AdminDashboard;
