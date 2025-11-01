import BaseText from "../BaseText";
import Button from "../Button/Button";
interface PopupModalProps {
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
}
function PopupModal({
    onCancel,
    onConfirm,
    title,
    description,
    cancelText,
    confirmText,
}: PopupModalProps) {
    return (
        <div className="flex justify-center items-center fixed w-full h-full bg-[#00000091] inset-0 z-50">
            <div className="flex flex-col items-center w-[50%] min-w-[300px] bg-[#323131] border border-[#626262] p-4 rounded-(--border-radius-default) gap-4">
                <BaseText
                    fontName="fira code"
                    fontSize="var(--sub-heading)"
                    className="mb-auto mr-auto"
                >
                    {title}
                </BaseText>
                <BaseText
                    fontName="fira code"
                    fontSize="var(--large-text)"
                    className="p-4"
                >
                    {description}
                </BaseText>
                <div className="w-full flex items-center justify-around mt-auto">
                    <Button onClick={onConfirm}>
                        <BaseText
                            fontName="fira code"
                            fontSize="var(--large-text)"
                            textColor="inherit"
                        >
                            {confirmText}
                        </BaseText>
                    </Button>
                    <Button onClick={onCancel}>
                        <BaseText
                            fontName="fira code"
                            fontSize="var(--large-text)"
                            textColor="inherit"
                        >
                            {cancelText}
                        </BaseText>
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default PopupModal;
