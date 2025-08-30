import CustomInput from "../CustomInput/CustomInput";
import IconEmail from "../../assets/icons/IconEmail.svg?react";
import IconPassword from "../../assets/icons/IconPassword.svg?react";
import IconUser from "../../assets/icons/IconUser.svg?react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  schema,
  type FormFields,
} from "../../validation/RegisterValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "../../api/auth.api";
import { useState } from "react";

interface RegisterFormProps {
  setMode: (mode: "loginForm" | "registerForm" | "successModal") => void;
}

const RegisterForm = ({ setMode }: RegisterFormProps) => {
  const [success, setSuccess] = useState(false);

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
      await authApi.register(data);
      setSuccess(true);
    } catch (error) {
      setError("root", {
        message: "This email is already taken!",
      });
    }
  };

  if (success) {
    return (
      <div className="modal-form__success">
        <h2 className="modal-form__title">Registration successful!</h2>
        <p className="modal-form__desc">
          Use your email and password to log in
        </p>
        <button
          className="btn btn--secondary modal-form__btn-success"
          onClick={() => setMode("loginForm")}
        >
          Go to Login
        </button>
      </div>
    );
  } else {
    return (
      <>
        <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-form__input">
            <CustomInput className={errors.email ? "error" : ""}>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              <IconEmail />
            </CustomInput>
            {errors.email && (
              <span className="modal-form__error">{errors.email.message}</span>
            )}
          </div>

          <div className="modal-form__input">
            <CustomInput className={errors.name ? "error" : ""}>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name")}
              />
              <IconUser />
            </CustomInput>
            {errors.email && (
              <span className="modal-form__error">{errors.name?.message}</span>
            )}
          </div>

          <div className="modal-form__input">
            <CustomInput className={errors.surname ? "error" : ""}>
              <input
                type="text"
                placeholder="Enter your surname"
                {...register("surname")}
              />
              <IconUser />
            </CustomInput>
            {errors.email && (
              <span className="modal-form__error">
                {errors.surname?.message}
              </span>
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
              <span className="modal-form__error">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="modal-form__input">
            <CustomInput className={errors.confirmPassword ? "error" : ""}>
              <input
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                autoComplete="on"
              />
              <IconPassword />
            </CustomInput>
            {errors.confirmPassword && (
              <span className="modal-form__error">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {errors.root && (
            <span className="modal-form__root-error">
              {errors.root.message}
            </span>
          )}

          <button
            className="btn btn--secondary modal-form__btn-submit"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Loading..." : "Register"}
          </button>
        </form>
        <button
          className="btn modal__link"
          onClick={() => setMode("loginForm")}
        >
          Already have an account? Login
        </button>
      </>
    );
  }
};

export default RegisterForm;
