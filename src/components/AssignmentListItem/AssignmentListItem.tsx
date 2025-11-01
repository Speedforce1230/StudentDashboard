import { useEffect, useRef, useState } from "react";
import getFontClasses from "../../utility/getFont";
import BaseText from "../BaseText";
import {
    faCheck,
    faCopy,
    faFloppyDisk,
    faPencil,
    faTrash,
    faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    deleteAssignment,
    getSubmissionFromAssignment,
    updateAssignment,
    type assignment,
    type submission,
} from "../../utility/localStorage";
interface AssignmentListItemProps {
    assignment: assignment;
    role: "admin" | "student";
    setAssignments?: React.Dispatch<React.SetStateAction<assignment[]>>;
    modalStep?: number;
    setModalStep?: React.Dispatch<React.SetStateAction<number>>;
    onSubmission?: () => void;
    startInEditMode?: boolean;
    onEditDone?: () => void;
    alreadySubmitted?: boolean;
}
function AssignmentListItem({
    assignment,
    role,
    setAssignments = () => {},
    startInEditMode = false,
    onEditDone = () => {},
    onSubmission = () => {},
    alreadySubmitted,
}: AssignmentListItemProps) {
    const font = getFontClasses("fira code");
    const [editMode, setEditMode] = useState(startInEditMode);
    const [submissions, setSubmissions] = useState<submission[]>([]);
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const linkRef = useRef<HTMLInputElement | null>(null);
    const handleDelete = () => {
        const removedAssignments = deleteAssignment(assignment.id);
        setAssignments(removedAssignments);
    };
    const handleEditMode = () => {
        setEditMode(true);
    };
    const handleSaveChanges = () => {
        if (!titleRef.current || !descriptionRef.current || !linkRef.current)
            return;
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const submission = linkRef.current.value;
        const updatedAssignment: assignment = {
            title,
            description,
            link: submission,
            id: assignment.id,
        };
        const updatedAssignments = updateAssignment(
            assignment.id,
            updatedAssignment
        );
        setAssignments(updatedAssignments);
        setEditMode(false);
        onEditDone();
    };
    const handleUndoChanges = () => {
        if (!titleRef.current || !descriptionRef.current || !linkRef.current)
            return;
        titleRef.current.value = assignment.title;
        descriptionRef.current.value = assignment.description;
        linkRef.current.value = assignment.link;
        setEditMode(false);
        onEditDone();
    };
    const iconSize = 20;
    useEffect(() => {
        const submissions = getSubmissionFromAssignment(assignment.id);
        setSubmissions(submissions);
    }, [assignment.id]);
    const copyLinkToClipboard = () => {
        if (!linkRef.current) return;
        navigator.clipboard.writeText(linkRef.current.value);
    };
    const submissionsTotal = submissions.filter((sub) => sub.submitted).length;
    const submissionsLength = submissions.length;
    const submissionsPercentage =
        submissionsLength > 0
            ? Math.round((submissionsTotal / submissionsLength) * 100)
            : 100;
    return (
        <li
            className={`flex items-center w-full overflow-hidden gap-2 ${
                editMode ? "outline-1 outline-amber-400" : ""
            }`}
        >
            <div
                className={`grid grid-rows-1 ${
                    role === "admin"
                        ? "grid-cols-[5fr_5fr_5fr_5fr_1fr]"
                        : alreadySubmitted
                        ? "grid-cols-3"
                        : "grid-cols-[5fr_5fr_5fr_1fr]"
                } w-full border-l border-r border-b border-l-[#696969] border-r-[#696969] border-b-[#696969] overflow-hidden`}
            >
                <div
                    className={`flex items-center justify-center p-4 border-r transition-colors duration-300 ease-out border-r-[#696969] text-[#f0f0f0] ${
                        editMode
                            ? ""
                            : "hover:text-[#191919] hover:bg-[#f0f0f0]"
                    }  min-w-0 w-full`}
                >
                    {editMode ? (
                        <input
                            className={`${font} focus:outline-0 text-center w-full rounded-md border-2 border-[#696969] focus:bg-[#f0f0f0] focus:text-(--default-black) hover:bg-[#595757] transition-colors duration-300 ease-out`}
                            style={{
                                fontSize: "var(--large-text)",
                                fontWeight: 500,
                            }}
                            defaultValue={assignment.title}
                            readOnly={!editMode}
                            ref={titleRef}
                        ></input>
                    ) : (
                        <BaseText
                            fontName="fira code"
                            fontSize="var(--large-text)"
                            textColor="inherit"
                            fontWeight={500}
                        >
                            {assignment.title}
                        </BaseText>
                    )}
                </div>
                <div
                    className={`flex items-center justify-center p-4 border-r transition-colors duration-300 ease-out border-r-[#696969] text-[#f0f0f0] ${
                        editMode
                            ? ""
                            : "hover:text-[#191919] hover:bg-[#f0f0f0]"
                    }  min-w-0 w-full`}
                >
                    <textarea
                        className={`${font} focus:outline-0 text-left w-full min-h-[150px] custom-scrollbar break-normal rounded-md  ${
                            editMode
                                ? "border-2 border-[#696969] focus:bg-[#f0f0f0] focus:text-(--default-black) hover:bg-[#595757] transition-colors duration-300 ease-out"
                                : ""
                        }`}
                        style={{
                            fontSize: "var(--large-text)",
                            fontWeight: 300,
                        }}
                        readOnly={!editMode}
                        defaultValue={assignment.description}
                        ref={descriptionRef}
                    ></textarea>
                </div>
                <div
                    className={`flex flex-col items-center justify-center p-4 border-r transition-colors duration-300 ease-out border-r-[#696969] text-[#f0f0f0]  min-w-0 w-full`}
                >
                    <input
                        className={`${font} focus:outline-1 text-center w-full rounded-md  ${
                            editMode
                                ? "border-2 border-[#696969] focus:bg-[#f0f0f0] focus:text-(--default-black)  hover:bg-[#595757] transition-colors duration-300 ease-out"
                                : "mt-auto "
                        }`}
                        style={{
                            fontSize: "var(--large-text)",
                            fontWeight: 300,
                        }}
                        readOnly={!editMode}
                        defaultValue={assignment.link}
                        ref={linkRef}
                    ></input>
                    {!editMode && (
                        <button
                            className="mt-auto mr-auto w-[clamp(10px, 1vw, 30px)] aspect-square border border-[#696969] p-2 text-[#f0f0f0] cursor-pointer rounded-(--border-radius-default) transition-colors duration-300 ease-out hover:bg-[#f0f0f0] hover:text-[#191919]"
                            onClick={copyLinkToClipboard}
                        >
                            <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
                        </button>
                    )}
                </div>
                {role === "admin" && (
                    <ul className="relative flex flex-col items-center justify-center p-4 transition-colors duration-300 ease-out text-[#f0f0f0] hover:text-[#191919] hover:bg-[#f0f0f0] min-w-0 w-full border-r border-r-[#696969]">
                        <li className="w-full flex flex-col items-center overflow-hidden ">
                            <div className="relative w-full bg-[#696969] rounded-(--border-radius-default) overflow-hidden h-4">
                                <div
                                    className={
                                        "w-full absolute h-4 bg-green-500 rounded-(--border-radius-default)"
                                    }
                                    style={{
                                        transform: `translateX(-${
                                            100 - submissionsPercentage
                                        }%)`,
                                    }}
                                ></div>
                            </div>

                            <BaseText
                                fontName="fira code"
                                fontSize="var(--small-text)"
                                textColor="inherit"
                            >
                                {submissionsPercentage}%
                            </BaseText>
                        </li>
                        {submissions.map((value, index) => (
                            <li
                                className="flex items-center justify-center"
                                key={index}
                            >
                                <BaseText
                                    textColor="inherit"
                                    fontName="fira code"
                                    fontWeight={300}
                                >{`${value.student} -${
                                    value.submitted
                                        ? " Submitted"
                                        : " Not Submitted"
                                }`}</BaseText>
                            </li>
                        ))}
                    </ul>
                )}
                {role === "student" && !alreadySubmitted && (
                    <div className="flex justify-center items-center flex-col p-1 text-green-600 hover:text-[#f0f0f0] hover:bg-green-700 transition-colors duration-300 ease-out">
                        <button
                            className="cursor-pointer w-full h-full"
                            title="Mark as Complete"
                            onClick={onSubmission}
                        >
                            <FontAwesomeIcon
                                icon={faCheck}
                                color="inherit"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    maxWidth: 30,
                                    aspectRatio: 1,
                                }}
                            ></FontAwesomeIcon>
                        </button>
                    </div>
                )}
                {role === "admin" && (
                    <div className="flex justify-center items-center flex-col p-1 gap-4">
                        {editMode ? (
                            <>
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
                                <button
                                    className="transition-colors duration-300 ease-out text-[#6c757d] hover:text-[#3d4348] cursor-pointer"
                                    title="Undo Changes"
                                    onClick={handleUndoChanges}
                                >
                                    <FontAwesomeIcon
                                        icon={faUndo}
                                        fontSize="var(--large-text)"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            maxWidth: iconSize,
                                            aspectRatio: 1,
                                        }}
                                    ></FontAwesomeIcon>
                                </button>
                            </>
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
