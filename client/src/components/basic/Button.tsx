import { MouseEventHandler, ReactNode, FC } from "react";
import { useLocation } from "react-router-dom";
// Components
import Loading from "./Loading";

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  submit?: boolean;
  onClick?: MouseEventHandler | any;
  loading?: boolean;
  disabled?: boolean;
  variant: string;
  color?: string;
  full?: boolean;
  tooltip?: string;
  className?: string;
}

/**
 * Button Params
 * @param {Object} props
 * @param {any} props.children The children of the button
 * @param {boolean=} props.submit The submit boolean for changing the type of the button from "button" to type "submit"
 * @param {any=} props.click The function for the onClick event
 * @param {boolean=} props.loading The loading boolean to toggle the loading state of the button
 * @param {boolean=} props.disabled The disabled boolean to toggle the disabled state of the button
 * @returns Element
 */

const Button: FC<ButtonProps> = ({
  children,
  icon,
  submit,
  onClick,
  loading,
  disabled,
  variant,
  color,
  full,
  tooltip,
  className,
}) => {
  /**
   * Location
   * @constant
   * @description Getting the location from the useLocation method, so we have access to the url.
   */

  const location = useLocation();

  return (
    <button
      className={`${
        variant === "primary"
          ? `${
              location.pathname.split("/")[1] === "app"
                ? "disabled:opacity-50 border bg-theme-400 border-theme-500 hover:bg-theme-400/90 dark:bg-theme-600 dark:border-theme-700 dark:hover:bg-theme-600/90"
                : "disabled:opacity-50 border bg-primary-400 border-primary-500 hover:bg-primary-400/90"
            } ${
              color === "warning"
                ? "bg-yellow-400 border-yellow-500 hover:bg-yellow-400/90 dark:bg-yellow-600 dark:border-yellow-700 dark:hover:bg-yellow-600/90"
                : ""
            } ${
              color === "error"
                ? "bg-red-400 border-red-500 hover:bg-red-400/90 dark:bg-red-600 dark:border-red-700 dark:hover:bg-red-600/90"
                : ""
            } `
          : ""
      } ${
        variant === "secondary"
          ? `border bg-transparent border-theme-500 text-theme-500 hover:bg-theme-100 dark:border-theme-700 dark:text-theme-600 dark:hover:bg-theme-900/20 ${
              color === "warning"
                ? "border-yellow-500 !text-yellow-500 hover:bg-yellow-100 dark:border-yellow-700 dark:text-yellow-600 dark:hover:bg-yellow-900/20"
                : ""
            } ${
              color === "error"
                ? "border-red-500 !text-red-500 hover:bg-red-100 dark:border-red-700 dark:text-red-600 dark:hover:bg-red-900/20"
                : ""
            }`
          : ""
      } ${
        variant === "text"
          ? `text-theme-400 hover:bg-theme-100 dark:text-theme-600 dark:hover:bg-theme-900/20 ${
              color === "warning"
                ? "text-yellow-400 hover:bg-yellow-100 dark:text-yellow-600 dark:hover:bg-yellow-900/20"
                : ""
            } ${
              color === "error"
                ? "text-red-400 hover:bg-red-100 dark:text-red-600 dark:hover:bg-red-900/20"
                : ""
            }`
          : ""
      } ${
        variant === "action"
          ? `!rounded-full !text-xl aspect-square !w-[35px] !h-[35px] !p-0 text-slate-600 hover:bg-slate-200/30 dark:text-slate-500 dark:hover:bg-slate-800  ${
              color === "warning"
                ? "text-yellow-600 hover:bg-yellow-200/30 dark:text-yellow-500 dark:hover:bg-yellow-800/30"
                : ""
            } ${
              color === "error"
                ? "text-red-600 hover:bg-red-200/30 dark:text-red-500 dark:hover:bg-red-800/30"
                : ""
            } ${
              color === "theme"
                ? "text-theme-600 hover:bg-theme-200/30 dark:text-theme-500 dark:hover:bg-theme-800/30"
                : ""
            }`
          : ""
      } disabled:pointer-events-none transition-all px-8 py-[10px] text-sm font-bold text-white rounded-lg w-fit whitespace-nowrap flex gap-2 items-center justify-center ${
        full ? "!w-full" : ""
      } ${className}`}
      type={submit ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled}
      data-tooltip={tooltip}
    >
      {loading ? (
        <div className="flex justify-center h-5">
          <Loading color="text-white" />
        </div>
      ) : (
        <>
          {icon ? <div className="text-lg">{icon}</div> : <></>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
