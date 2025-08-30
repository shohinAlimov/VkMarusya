import CustomInput from "../CustomInput/CustomInput";
import IconEmail from "../../assets/icons/IconEmail.svg?react";
import IconPassword from "../../assets/icons/IconPassword.svg?react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  schema,
  type FormFields,
} from "../../validation/LoginValidationSchema";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "../../api/auth.api";
import { setUser } from "../../store/authSlice";

interface LoginFormProps {
  onClose: () => void;
  setMode: (mode: "loginForm" | "registerForm" | "successModal") => void;
}

const LoginForm = ({ onClose, setMode }: LoginFormProps) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

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

  return (
    <>
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
              autoComplete="on"
            />
            <IconPassword />
          </CustomInput>
          {errors.password && (
            <span className="modal-form__error">{errors.password.message}</span>
          )}
        </div>

        {errors.root && (
          <span className="modal-form__root-error">{errors.root.message}</span>
        )}

        <button
          className="btn btn--secondary modal-form__btn-submit"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Loading..." : "Login"}
        </button>
      </form>
      <button
        className="btn modal__link"
        onClick={() => setMode("registerForm")}
      >
        Dont' have an account? Register
      </button>
    </>
  );
};

export default LoginForm;
