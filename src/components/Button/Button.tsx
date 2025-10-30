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
    return (
        <button
            className={`${className} pl-4 pr-4 pt-1 pb-1 bg-[#f0f0f0] rounded-(--border-radius-default) w-[50%] self-center text-(--default-black) transition-all duration-300 ease-out hover:bg-[#f0f0f09e] hover:rounded-b-md`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
export default Button;
