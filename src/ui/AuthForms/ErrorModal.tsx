interface ErrorModalProps {
  setMode: (mode: "loginForm" | "registerForm" | "successModal") => void;
}

const ErrorModal = ({ setMode }: ErrorModalProps) => {
  return (
    <div className="modal__error">
      <h2 className="modal__title-error">
        Want to save this movie? Please log in or create a free account to add
        movies to your favorites.
      </h2>
      <button
        className="btn btn--secondary modal__btn-switch"
        onClick={() => setMode("loginForm")}
      >
        Go to Login
      </button>
    </div>
  );
};

export default ErrorModal;
