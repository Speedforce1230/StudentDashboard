import { useEffect, useRef, useState } from "react";
interface ButtonProps {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
    disabled?: boolean;
}
function Button({
    className = "",
    onClick = () => {},
    children,
    disabled = false,
}: ButtonProps) {
    const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);
    const [shouldExpand, setShouldExpand] = useState(false);
    const timer = 300;
    // Cleaning up on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    const handleClick = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setShouldExpand(true);
        onClick();
        timeoutRef.current = setTimeout(() => {
            setShouldExpand(false);
        }, timer);
    };
    return (
        <button
            className={`${className} pl-4 pr-4 pt-1 pb-1 bg-[#f0f0f0] rounded-(--border-radius-default) self-center text-(--default-black) transition-all duration-300 ease-out hover:bg-[#f0f0f09e] hover:rounded-b-md ${
                shouldExpand ? "transform-[scale(1.2)]" : ""
            }`}
            onClick={handleClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
export default Button;
