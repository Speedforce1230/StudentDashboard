import type { ReactNode } from "react";
import getFontClasses from "../../utility/getFont";
import styles from "./BaseText.module.css";
export interface TextProps {
    children: ReactNode;
    wrapper?: "p" | "blockquote" | "cite" | "span" | "time" | "code";
    dateTime?: string | null;
    className?: string;
    style?: React.CSSProperties;
    fontName?: string;
    textColor?: string;
    textShadow?: string;
    alignText?: "center" | "left" | "right";
    fontSize?: string;
    textSelectionBackgroundColor?: string;
    textSelectionTextColor?: string;
    fontWeight?: number | string;
}
function BaseText({
    children,
    wrapper = "p",
    className = "",
    style = {},
    fontName = "raleway",
    textColor = "var(--default-white)",
    textShadow = "none",
    alignText = "center",
    fontSize = "var(--large-text)",
    textSelectionBackgroundColor = "yellow",
    textSelectionTextColor = "black",
    fontWeight = 600,
    dateTime = null,
}: TextProps) {
    const TextWrapper = wrapper;
    const fontClass = getFontClasses(fontName);
    return (
        <TextWrapper
            className={`${styles["text"]} ${fontClass} ${className} `}
            style={
                {
                    ...style,
                    color: textColor,
                    textShadow,
                    textAlign: alignText,
                    fontSize,
                    "--background-color": textSelectionBackgroundColor,
                    "--text-color": textSelectionTextColor,
                    fontWeight,
                } as React.CSSProperties
            }
            {...(dateTime && { dateTime })}
        >
            {children}
        </TextWrapper>
    );
}
export default BaseText;
