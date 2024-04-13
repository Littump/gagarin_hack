type Props = {
    variant: "filled" | "text";
    children: string | JSX.Element;
};

function ButtonComponent({ variant = "filled", children, ...props }: Props) {
    const variantClasses = {
        filled: "text-white bg-blue-500 hover:bg-blue-400",
        text: "text-black hover:text-blue-500",
    };

    return (
        <button className={`btn ${variantClasses[variant]}`} {...props}>
            {children}
        </button>
    );
}

export default ButtonComponent;
