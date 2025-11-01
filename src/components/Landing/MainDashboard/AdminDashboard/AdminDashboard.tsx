import { useEffect, useRef, useState } from "react";
import {
    getAssignments,
    addAssignment,
    type assignment,
} from "../../../../utility/localStorage";
import Heading from "../../../Heading";
import AssignmentListItem from "../../../AssignmentListItem/AssignmentListItem";
import TableHeaderListItem from "../../../AssignmentListItem/TableHeaderListItem";

function AdminDashboard() {
    const [assignments, setAssignments] = useState<assignment[]>([]);
    const assignmentListRef = useRef<HTMLUListElement | null>(null);
    const [newAssignmentId, setNewAssignmentId] = useState<string | null>(null);
    const handleAddTask = () => {
        if (!assignmentListRef.current) return;
        const title = "New Title";
        const id = crypto.randomUUID();
        const newAssignment: assignment = {
            title,
            description: "New Description",
            link: "https://google-drive.co",
            id,
        };
        // Updating Local Storage
        const updatedAssignments = addAssignment(newAssignment);
        if (!updatedAssignments) {
            console.error("Failed to update assignments: ");
            return;
        }
        setAssignments(updatedAssignments);
        setNewAssignmentId(id);
    };
    useEffect(() => {
        const assignments = getAssignments();
        setAssignments(assignments);
    }, []);
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
                <TableHeaderListItem
                    userRole="admin"
                    handleAddTask={handleAddTask}
                ></TableHeaderListItem>
                {assignments.length === 0 && (
                    <Heading
                        fontName="fira code"
                        fontSize="var(--sub-heading)"
                        headingLevel="h4"
                        className="self-center"
                    >
                        There are no assignments. Click on the Plus icon to add
                        some!
                    </Heading>
                )}
                {assignments.map((assignment) => (
                    <AssignmentListItem
                        role="admin"
                        assignment={assignment}
                        key={assignment.id}
                        startInEditMode={assignment.id === newAssignmentId}
                        onEditDone={() => setNewAssignmentId(null)}
                        setAssignments={setAssignments}
                    ></AssignmentListItem>
                ))}
            </ul>
        </div>
    );
}
export default AdminDashboard;
