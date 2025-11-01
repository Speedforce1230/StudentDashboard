import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Heading from "../Heading";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
interface TableHeaderListItemProps {
    userRole?: "student" | "admin";
    handleAddTask?: () => void;
    submittedAsStudent?: boolean;
}
function TableHeaderListItem({
    userRole = "admin",
    handleAddTask = () => {},
    submittedAsStudent = false,
}: TableHeaderListItemProps) {
    const gridCols =
        userRole === "admin"
            ? "grid-cols-[5fr_5fr_5fr_5fr_1fr]"
            : submittedAsStudent
            ? "grid-cols-3"
            : "grid-cols-[5fr_5fr_5fr_1fr]";
    return (
        <li className="flex gap-2 w-full">
            <div
                className={`grid grid-rows-1 ${gridCols} w-full border border-[#696969] overflow-hidden relative`}
            >
                <div className=" flex items-center justify-center p-4 border-r  border-r-[#696969] text-[#f0f0f0] min-w-0 w-full relative">
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
                <div className="flex items-center justify-center p-4 border-r  border-r-[#696969] text-[#f0f0f0] min-w-0 w-full relative">
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
                <div className="flex items-center justify-center p-4 border-r  border-r-[#696969] text-[#f0f0f0] min-w-0 w-full relative">
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
                {userRole === "admin" ? (
                    <>
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
                        <div className="flex gap-1 items-center justify-center w-full h-full">
                            <button
                                className="text-green-500 transition-colors duration-300 ease-out hover:text-[#f0f0f0] hover:bg-[#38a169] cursor-pointer w-full h-full"
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
                    </>
                ) : (
                    !submittedAsStudent && (
                        <div className="flex items-center justify-center min-w-0 w-full p-1 text-[#f0f0f0] hover:text-[#a9a9a9] transition-colors duration-300 ease-out"></div>
                    )
                )}
            </div>
        </li>
    );
}
export default TableHeaderListItem;
