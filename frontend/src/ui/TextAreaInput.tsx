import { Field } from "formik";

type Props = {
    label: string;
    className?: string;
    name: string;
    isError: boolean;
    type?: string;
    autoComplete?: string;
    min?: string;
    onClick?: () => void;
};

function TextAreaInput({ name, isError, label, className, ...props }: Props) {
    return (
        <label className={`form-control ${className}`}>
            <div className="label">
                <span className="label-text font-semibold prose-sm">
                    {label}
                </span>
            </div>
            <Field
                component="textarea"
                {...props}
                name={name}
                className={`textarea textarea-bordered ${
                    isError ? "border-red-500" : "border-neutral-400"
                } w-full text-md`}
                placeholder={label}
            />
        </label>
    );
}

export default TextAreaInput;
