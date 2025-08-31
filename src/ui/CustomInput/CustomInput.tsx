import { type ReactNode } from "react";
import "./CustomInput.scss";
interface CustomInputProps {
  className: string;
  children: ReactNode;
}

const CustomInput = ({ className, children }: CustomInputProps) => {
  return <div className={`custom-input ${className}`}>{children}</div>;
};

export default CustomInput;
