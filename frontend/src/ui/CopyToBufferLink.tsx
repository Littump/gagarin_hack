import { useState } from "react";

type Props = {
    text: string;
    className: string;
};

function CopyToBufferLink({ text, className }: Props) {
    const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
    const copyToBuffer = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setTooltipIsOpen(true);
            setTimeout(() => setTooltipIsOpen(false), 1500);
        } catch (err) {
            console.error("Ошибка:", err);
        }
    };

    return (
        <div
            className={`tooltip ${
                tooltipIsOpen ? "tooltip-open tooltip-success" : ""
            }`}
            data-tip={`${
                !tooltipIsOpen ? "Скопировать" : "Скопировано в буффер обмена"
            }`}
        >
            <button className={className} onClick={() => copyToBuffer(text)}>
                {text}
            </button>
        </div>
    );
}

export default CopyToBufferLink;
