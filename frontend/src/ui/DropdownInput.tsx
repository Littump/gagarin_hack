import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

type Props = {
  children: string | JSX.Element;
  items: string[];
  className?: string | null;
  placeholder: string;
  onClick: (text: string) => void;
  error?: boolean;
  dontShowTriangle?: boolean;
};

function DropdownInput({
  children,
  items,
  className,
  dontShowTriangle,
  error,
  onClick,
  placeholder,
  ...props
}: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const ref = useDetectClickOutside({
    onTriggered: () => setOpenMenu(false),
  });
  if (!items || !items.length) return null;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <summary
        tabIndex={0}
        role="button"
        className={`flex ${
          dontShowTriangle ? "justify-center" : "justify-start"
        } bg-white text-dark-gray btn ${error && "border border-red"}`}
        {...props}
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        {children}
        {!dontShowTriangle && (
          <ChevronDownIcon
            className={`w-5 h-5 transition absolute right-2 top-4 ${
              openMenu ? "rotate-0" : "rotate-180"
            }`}
          />
        )}
      </summary>
      <ul
        tabIndex={0}
        className={`${
          openMenu ? "" : "hidden"
        } absolute top-14 font-medium dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52`}
      >
        {!dontShowTriangle && (
          <li
            className="py-2 text-center hover:bg-base-300 transition cursor-pointer rounded-md"
            onClick={() => {}}
          >
            {placeholder}
          </li>
        )}
        {items.map((item: string) => (
          <li
            onClick={() => {
              onClick(item);
              setOpenMenu(false);
            }}
            key={item}
            className={`py-2 ${
              dontShowTriangle ? "border-b" : "border-t"
            } text-center border-base-300 hover:bg-base-300 transition cursor-pointer rounded-md`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropdownInput;
