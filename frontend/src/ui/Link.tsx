import { NavLink } from "react-router-dom";

type Props = {
    children: string | JSX.Element;
    to: string;
    variant: "filled-light" | "filled-dark" | "nav" | "text";
    className: string;
};

function Link({ children, to, variant, className }: Props) {
    const classes = {
        nav: "text-black hover:text-blue-500 h-6 hover:border-b border-blue-500",
        text: "text-black hover:text-blue-500 h-6",
    };
    if (variant === "filled-light")
        return (
            <NavLink to={to} className={`btn text-md ${className}`}>
                {children}
            </NavLink>
        );
    if (variant === "filled-dark")
        return (
            <NavLink to={to} className={`btn btn-neutral text-md ${className}`}>
                {children}
            </NavLink>
        );
    return (
        <NavLink
            to={to}
            className={`transition w-fit ${
                variant === "nav" ? classes["nav"] : classes["text"]
            } ${className}`}
        >
            {children}
        </NavLink>
    );
}

export default Link;
