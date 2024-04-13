import React, { memo, ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  heading: ReactNode;
  className?: string;
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
}

const Modal = memo(
  ({ heading, children, className, isModalOpen, setIsModalOpen }: Props) => {
    const modalRef = useRef<HTMLDialogElement | null>(null);
    useEffect(() => {
      const modalElement = modalRef.current;
      if (modalElement) {
        if (isModalOpen) {
          modalElement.showModal();
        } else {
          modalElement.close();
        }
      }
    }, [isModalOpen]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    return (
      <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          type="button"
          onClick={() => setTimeout(() => setIsModalOpen(true), 10)}
        >
          {heading}
        </button>
        <dialog
          ref={modalRef}
          className="modal w-full"
          onKeyDown={handleKeyDown}
        >
          <div className={`modal-box overflow-visible max-w-full max-h-full ${className}`}>
            <span
              className="link absolute top-3 right-3 text-dark-gray"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </span>
            {children}
          </div>
        </dialog>
      </>
    );
  },
);

export default Modal;
