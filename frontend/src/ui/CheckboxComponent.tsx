import { Field } from "formik";

type Props = {
  children: string | JSX.Element;
  className?: string;
  name: string;
  onClick?: () => void;
};

function CheckboxComponent({ children, className, name, onClick }: Props) {
  return (
    <div className={` ${className} flex`}>
      <Field
        onClick={onClick}
        name={name}
        id={name}
        type="checkbox"
        className="checkbox"
      />
      <label htmlFor={name} className={`flex`}>
        {children}
      </label>
    </div>
  );
}

export default CheckboxComponent;
