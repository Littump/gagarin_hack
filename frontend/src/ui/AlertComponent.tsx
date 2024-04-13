type Props = {
  children: JSX.Element | string;
  active: boolean;
  className: string;
};
function AlertComponent({ children, active, className }: Props) {
  return (
    <div
      role="alert"
      className={`fixed transition-all duration-500 alert w-[60vw] right-[20vw] ${
        active ? "opacity-100 bottom-2" : "opacity-0 -bottom-20"
      } ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>{children}</span>
    </div>
  );
}

export default AlertComponent;
