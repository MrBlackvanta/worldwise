import { type ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  styleClass: string;
  type?: "button" | "submit";
};

export default function Button({
  children,
  onClick,
  styleClass,
  type,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${styles["btn"]} ${styles[styleClass]}`}
    >
      {children}
    </button>
  );
}
