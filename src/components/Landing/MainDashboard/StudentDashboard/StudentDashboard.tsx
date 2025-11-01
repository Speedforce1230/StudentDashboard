import { useEffect, useState } from "react";
import {
    getAssignments,
    getSubmissions,
    markSubmission,
    type assignment,
    type submission,
} from "../../../../utility/localStorage";
import Heading from "../../../Heading";
import AssignmentListItem from "../../../AssignmentListItem/AssignmentListItem";
import useAuth from "../../../../utility/useAuth";
import PopupModal from "../../../PopupModal/PopupModal";
import TableHeaderListItem from "../../../AssignmentListItem/TableHeaderListItem";
function StudentDashboard() {
    const [assignments, setAssignments] = useState<assignment[]>([]);
    const [submissions, setSubmissions] = useState<submission[]>([]);
    const { user } = useAuth();
    const [modalStep, setModalStep] = useState(0); // 0 hidden, 1 initial, 2 confirmation
    const [assignmentId, setAssignmentId] = useState<string | null>("");
    const [submittedAssignments, setSubmittedAssignments] = useState<
        assignment[]
    >([]);
    const handleStartSubmission = (id: string) => {
        setAssignmentId(id);
        setModalStep(1);
    };
    const handleFirstConfirm = () => {
        setModalStep(2);
    };
    const handleFinalConfirm = () => {
        if (!user || !assignmentId) return;
        const newSubmissions = markSubmission(assignmentId, user.username);
        setSubmissions(newSubmissions);
        setModalStep(0);
        setAssignmentId(null);
    };
    const handleCancel = () => {
        setModalStep(0);
        setAssignmentId(null);
    };
    useEffect(() => {
        if (!user) return;
        const assignments = getAssignments();
        const submissions = getSubmissions().filter(
            (sub) => sub.student === user.username
        );
        const [submitted, notSubmitted]: [assignment[], assignment[]] =
            assignments.reduce(
                ([submit, notSubmit], assignment) => {
                    if (
                        submissions.find(
                            (value) =>
                                value.assignmentId === assignment.id &&
                                value.submitted
                        )
                    ) {
                        submit.push(assignment);
                    } else notSubmit.push(assignment);
                    return [submit, notSubmit];
                },
                [[], []] as [assignment[], assignment[]]
            );
        setSubmittedAssignments(submitted);
        setAssignments(notSubmitted);
        // Updates UI
    }, [user, submissions]);

    return (
        <div className="flex flex-col items-start justify-start w-full relative z-0">
            <Heading fontName="fira code" className="self-start">
                Pending Assignments
            </Heading>
            <ul className="flex w-full flex-col items-start justify-start bg-[#323131] rounded-(--border-radius-default) p-4">
                <TableHeaderListItem userRole="student"></TableHeaderListItem>
                {assignments.length === 0 && (
                    <Heading
                        fontName="fira code"
                        fontSize="var(--sub-heading)"
                        headingLevel="h4"
                        className="self-center"
                    >
                        There are no pending assignments.
                    </Heading>
                )}
                {assignments.map((assignment) => (
                    <AssignmentListItem
                        role="student"
                        onSubmission={() =>
                            handleStartSubmission(assignment.id)
                        }
                        assignment={assignment}
                        key={assignment.id}
                    ></AssignmentListItem>
                ))}
            </ul>
            <Heading fontName="fira code" className="self-start">
                Completed Assignments
            </Heading>
            <ul className="flex w-full flex-col items-start justify-start bg-[#323131] rounded-(--border-radius-default) p-4">
                <TableHeaderListItem
                    submittedAsStudent
                    userRole="student"
                ></TableHeaderListItem>
                {submittedAssignments.length === 0 && (
                    <Heading
                        fontName="fira code"
                        fontSize="var(--sub-heading)"
                        headingLevel="h4"
                        className="self-center"
                    >
                        There are no completed assignments.
                    </Heading>
                )}
                {submittedAssignments.map((assignment) => (
                    <AssignmentListItem
                        alreadySubmitted={true}
                        role="student"
                        assignment={assignment}
                        key={assignment.id}
                    ></AssignmentListItem>
                ))}
            </ul>
            {modalStep === 1 && (
                <PopupModal
                    cancelText="Cancel"
                    confirmText="Yes, I have"
                    title="Confirm"
                    onCancel={handleCancel}
                    onConfirm={handleFirstConfirm}
                    description="Have you submitted your file to the Google Drive folder?"
                ></PopupModal>
            )}
            {modalStep === 2 && (
                <PopupModal
                    title="Final Confirm"
                    description="Are you sure? THIS ACTION CANNOT BE REVERSED!"
                    cancelText="cancel"
                    confirmText="Yes, I am sure"
                    onCancel={handleCancel}
                    onConfirm={handleFinalConfirm}
                ></PopupModal>
            )}
        </div>
    );
}
export default StudentDashboard;
