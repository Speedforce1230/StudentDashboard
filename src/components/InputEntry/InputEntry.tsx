import type { HTMLInputTypeAttribute } from "react";
import getFontClasses from "../../utility/getFont";

interface InputEntryProps {
    ref?: React.RefObject<HTMLInputElement | null> | null;
    style?: React.CSSProperties;
    className?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    type?: HTMLInputTypeAttribute;
    readOnly?: boolean;
    value?: string;
    defaultValue?: string;
}
function InputEntry({
    ref = null,
    style,
    className = "",
    onChange = () => {},
    readOnly = false,
    type = "text",
    defaultValue = "",
}: InputEntryProps) {
    const font = getFontClasses("fira code");
    return (
        <input
            ref={ref}
            onChange={onChange}
            style={style}
            readOnly={readOnly}
            type={type}
            defaultValue={defaultValue}
            className={`w-full appearance-none p-2 focus:outline-none relative flex items-start justify-center rounded-md transition-color duration-300 ease-out  border-2 border-[#696969]  not-focus:bg-[#323131] not-focus:text-[#f0f0f0] focus:bg-[#f0f0f0] focus:text-[--default-black] hover:bg-[#595757]  ${font} ${className}`}
        ></input>
    );
}
export default InputEntry;
