import { useEffect, useState } from "react";
import "./Modal.scss";

import IconClose from "../../assets/icons/IconClose.svg?react";
import LogoDark from "../../assets/icons/vk-marusya-logo-dark.svg?react";
import LoginForm from "../../ui/AuthForms/LoginForm";
import RegisterForm from "../../ui/AuthForms/RegisterForm";
import ErrorModal from "../../ui/AuthForms/ErrorModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "loginForm" | "registerForm" | "successModal" | "errorModal";
}

const Modal = ({ isOpen, onClose, type = "loginForm" }: ModalProps) => {
  const [mode, setMode] = useState(type);

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }, [isOpen]);

  // Add keyboard event listener for Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div className="modal">
        <LogoDark
          className="modal__logo"
          width={156}
          height={35}
          aria-hidden={true}
        />
        <button className="btn modal__btn-close" onClick={handleClose}>
          <IconClose
            className="modal__btn-close-icon"
            width={24}
            height={24}
            aria-hidden={true}
          />
        </button>
        {mode === "loginForm" && (
          <>
            <LoginForm onClose={onClose} setMode={setMode} />
          </>
        )}
        {mode === "registerForm" && (
          <>
            <RegisterForm setMode={setMode} />
          </>
        )}
        {mode === "errorModal" && (
          <>
            <ErrorModal setMode={setMode} />
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
