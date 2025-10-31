import { useEffect, useRef, useState } from "react";
import getFontClasses from "../utility/getFont";
import BaseText from "../components/BaseText";
import {
    faCheck,
    faFloppyDisk,
    faPencil,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    addSubmission,
    deleteAssignment,
    getSubmissionFromAssignment,
    updateAssignment,
    type assignment,
    type submission,
} from "../utility/localStorage";
import useAuth from "../utility/useAuth";
interface AssignmentListItemProps {
    id: string;
    title: string;
    description: string;
    submission: string;
    role: "admin" | "student";
    setAssignments?: React.Dispatch<React.SetStateAction<assignment[]>>;
}
function AssignmentListItem({
    id,
    title,
    description,
    role,
    submission,
    setAssignments = () => {},
}: AssignmentListItemProps) {
    const font = getFontClasses("fira code");
    const { user } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [submissions, setSubmissions] = useState<submission[]>([]);
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const submissionRef = useRef<HTMLInputElement | null>(null);
    const handleDelete = () => {
        const removedAssignments = deleteAssignment(id);
        setAssignments(removedAssignments);
    };
    const handleEditMode = () => {
        setEditMode(true);
    };
    const handleSaveChanges = () => {
        if (
            !titleRef.current ||
            !descriptionRef.current ||
            !submissionRef.current
        )
            return;
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const submission = submissionRef.current.value;
        const updatedAssignment: assignment = {
            title,
            description,
            submission,
            id,
        };
        const updatedAssignments = updateAssignment(id, updatedAssignment);
        setAssignments(updatedAssignments);
        setEditMode(false);
    };
    const iconSize = 20;
    const handleSubmission = () => {
        if (!user) return;
        const submission: submission = {
            assignmentId: id,
            student: user.username,
            submitted: true,
        };
        addSubmission(submission);
    };
    useEffect(() => {
        const submissions = getSubmissionFromAssignment(id);
        setSubmissions(submissions);
    }, [id]);
    return (
        <li className="flex items-center w-full overflow-hidden gap-2">
            <div
                className={`grid grid-rows-1 ${
                    role === "admin"
                        ? "grid-cols-[5fr_5fr_5fr_5fr_1fr]"
                        : "grid-cols-[5fr_5fr_5fr_1fr]"
                } w-full border-l border-r border-b border-l-[#696969] border-r-[#696969] border-b-[#696969] overflow-hidden`}
            >
                <div className="flex items-center justify-center p-4 border-r transition-colors duration-300 ease-out border-r-[#696969] text-[#f0f0f0] hover:text-[#191919] hover:bg-[#f0f0f0] min-w-0 w-full">
                    {editMode ? (
                        <input
                            className={`${font} focus:outline-0 text-center w-full break-all`}
                            style={{
                                fontSize: "var(--large-text)",
                                fontWeight: 500,
                            }}
                            defaultValue={title}
                            ref={titleRef}
                        ></input>
                    ) : (
                        <BaseText
                            fontName="fira code"
                            fontSize="var(--large-text)"
                            fontWeight={500}
                            textColor="inherit"
                        >
                            {title}
                        </BaseText>
                    )}
                </div>
                <div className="flex items-start justify-center p-4 border-r transition-colors duration-300 ease-out border-r-[#696969] text-[#f0f0f0] hover:text-[#191919] hover:bg-[#f0f0f0] min-w-0 w-full">
                    <textarea
                        className={`${font} focus:outline-0 text-left w-full min-h-[150px] scrollbar-hidden`}
                        style={{
                            fontSize: "var(--large-text)",
                            fontWeight: 300,
                        }}
                        readOnly={!editMode}
                        defaultValue={description}
                        ref={descriptionRef}
                    ></textarea>
                </div>
                <div className="flex items-center justify-center p-4 transition-colors duration-300 ease-out border-r border-r-[#696969] text-[#f0f0f0] hover:text-[#191919] hover:bg-[#f0f0f0] min-w-0 w-full ">
                    {editMode ? (
                        <input
                            className={`${font} focus:outline-0 text-center w-full break-all`}
                            style={{
                                fontSize: "var(--large-text)",
                                fontWeight: 300,
                            }}
                            defaultValue={submission}
                            ref={submissionRef}
                        ></input>
                    ) : (
                        <BaseText
                            fontName="fira code"
                            fontSize="var(--large-text)"
                            fontWeight={300}
                            textColor="inherit"
                        >
                            {submission}
                        </BaseText>
                    )}
                </div>
                {role === "admin" && (
                    <ul className="flex items-center justify-center p-4 transition-colors duration-300 ease-out text-[#f0f0f0] hover:text-[#191919] hover:bg-[#f0f0f0] min-w-0 w-full border-r border-r-[#696969]">
                        {submissions.map((value, index) => (
                            <li
                                className="flex items-center justify-center"
                                key={index}
                            >
                                <BaseText
                                    textColor="inherit"
                                    fontName="fira code"
                                    fontWeight={300}
                                >{`${value.student}`}</BaseText>
                            </li>
                        ))}
                    </ul>
                )}
                {role === "student" && (
                    <div className="flex justify-center items-center flex-col p-1 text-green-600 hover:text-[#f0f0f0] hover:bg-green-700 transition-colors duration-300 ease-out">
                        <button
                            className="cursor-pointer w-full h-full"
                            title="Mark as Complete"
                            onClick={handleSubmission}
                        >
                            <FontAwesomeIcon
                                icon={faCheck}
                                color="inherit"
                            ></FontAwesomeIcon>
                        </button>
                    </div>
                )}
                {role === "admin" && (
                    <div className="flex justify-center items-center flex-col p-1 gap-4">
                        {editMode ? (
                            <button
                                className="transition-colors duration-300 ease-out text-[#007BFF] hover:text-[#0358b3] cursor-pointer"
                                title="Save Changes"
                                onClick={handleSaveChanges}
                            >
                                <FontAwesomeIcon
                                    icon={faFloppyDisk}
                                    fontSize="var(--large-text)"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        maxWidth: iconSize,
                                        aspectRatio: 1,
                                    }}
                                ></FontAwesomeIcon>
                            </button>
                        ) : (
                            <>
                                <button
                                    className="transition-colors duration-300 ease-out text-[#F59E0B] hover:text-[#c37f09] cursor-pointer"
                                    onClick={handleEditMode}
                                    title="Edit Assignment"
                                >
                                    <FontAwesomeIcon
                                        icon={faPencil}
                                        fontSize="var(--large-text)"
                                        style={{
                                            width: "100%",
                                            height: "100%",

                                            aspectRatio: 1,
                                            maxWidth: iconSize,
                                        }}
                                    ></FontAwesomeIcon>
                                </button>
                                <button
                                    className="transition-colors duration-300 ease-out text-red-600 hover:text-[#8f1818] cursor-pointer"
                                    onClick={handleDelete}
                                    title="Delete Assignment"
                                >
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        fontSize="var(--large-text)"
                                        style={{
                                            width: "100%",
                                            maxWidth: iconSize,
                                            aspectRatio: 1,
                                            height: "100%",
                                        }}
                                    ></FontAwesomeIcon>
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </li>
    );
}
export default AssignmentListItem;
