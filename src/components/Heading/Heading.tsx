import getFontClasses from "../../utility/getFont";
import styles from "./Heading.module.css";

export interface HeadingProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
    textColor?: string;
    fontName?: string;
    headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    fontSize?: string;
    textShadow?: string;
    textSelectionBackgroundColor?: string;
    fontWeight?: number | string;
    textSelectionTextColor?: string;
    className?: string;
}

function Heading({
    children,
    textColor = "var(--default-white)",
    fontName = "raleway",
    className = "",
    headingLevel = "h2",
    fontSize = "var(--heading)",
    textShadow = "",
    textSelectionBackgroundColor = "yellow",
    textSelectionTextColor = "black",
    fontWeight = 800,
    style = {},
}: HeadingProps) {
    const HeadingType = headingLevel;
    const fontClass = getFontClasses(fontName);

    return (
        <HeadingType
            className={`${fontClass} ${styles["heading"]} ${className}`}
            style={
                {
                    "--text-color": textColor,
                    fontSize,
                    textShadow,
                    "--background-color": textSelectionBackgroundColor,
                    "--text-selection-color": textSelectionTextColor,
                    fontWeight,
                    transition: "color 0.3s ease-out",
                    ...style,
                } as React.CSSProperties
            }
        >
            {children}
        </HeadingType>
    );
}
export default Heading;
