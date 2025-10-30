import styles from "../fonts.module.css";

function getFontClasses(key: string) {
    const stylesKey = key.replace(" ", "-").toLowerCase();
    return styles[`font-${stylesKey}`] || `${styles["arial-font-regular"]}`;
}
export default getFontClasses;
