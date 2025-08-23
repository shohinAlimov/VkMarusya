import { useEffect } from "react";
import "./Modal.scss";

import IconClose from "../../assets/icons/IconClose.svg?react";
import LogoDark from "../../assets/icons/vk-marusya-logo-dark.svg?react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import CustomInput from "../../ui/TextField/CustomInput";

import IconEmail from "../../assets/icons/IconEmail.svg?react";
import IconPassword from "../../assets/icons/IconPassword.svg?react";
import { authApi } from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await authApi.login(data);
      if (response.result) {
        const profile = await authApi.getUser();
        dispatch(setUser(profile));

        onClose();
      } else {
        setError("root", { message: "Ошибка авторизации" });
      }
    } catch (error) {
      setError("root", {
        message: "Email или пароль неверные",
      });
    }
  };

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
        <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-form__input">
            <CustomInput className={errors.email ? "error" : ""}>
              <input type="email" placeholder="Email" {...register("email")} />
              <IconEmail />
            </CustomInput>
            {errors.email && (
              <span className="modal-form__error">{errors.email.message}</span>
            )}
          </div>

          <div className="modal-form__input">
            <CustomInput className={errors.password ? "error" : ""}>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              <IconPassword />
            </CustomInput>
            {errors.password && (
              <span className="modal-form__error">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            className="btn btn--secondary"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Загрузка..." : "Войти"}
          </button>
          {errors.root && (
            <span className="modal-form__error">{errors.root.message}</span>
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;
