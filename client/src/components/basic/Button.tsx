import { MouseEventHandler, ReactChild, FC } from "react";
import { useLocation } from "react-router-dom";
// Components
import Loading from "./Loading";

interface ButtonProps {
  children: ReactChild | ReactChild[];
  submit?: boolean;
  onClick?: MouseEventHandler | any;
  loading?: boolean;
  disabled?: boolean;
  variant: string;
  color?: string;
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
  submit,
  onClick,
  loading,
  disabled,
  variant,
  color,
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
                ? "bg-theme-500 hover:bg-theme-600 disabled:bg-theme-300 dark:disabled:bg-theme-900"
                : "bg-primary-500 hover:bg-primary-600"
            } ${
              color === "warning"
                ? "bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 dark:disabled:bg-yellow-900"
                : ""
            } ${
              color === "error"
                ? "bg-red-500 hover:bg-red-600 disabled:bg-red-300 dark:disabled:bg-red-900"
                : ""
            } `
          : ""
      } ${
        variant === "secondary"
          ? `text-theme-500 bg-theme-100 hover:text-theme-600 hover:bg-theme-200 dark:text-theme-100 dark:bg-theme-900 dark:hover:bg-theme-800 dark:hover:text-theme-200 opacity-90 ${
              color === "warning"
                ? "text-yellow-500 bg-yellow-100 hover:text-yellow-600 hover:bg-yellow-200 dark:text-yellow-100 dark:bg-yellow-900 dark:hover:bg-yellow-800 dark:hover:text-yellow-200"
                : ""
            } ${
              color === "error"
                ? "text-red-500 bg-red-100 hover:text-red-600 hover:bg-red-200/80 dark:text-red-100 dark:bg-red-900 dark:hover:bg-red-800 dark:hover:text-red-200"
                : ""
            }`
          : ""
      } ${
        variant === "text"
          ? `text-theme-500 bg-transparent hover:bg-theme-100 opacity-50 dark:text-theme-900 dark:hover:bg-theme-800 ${
              color === "warning"
                ? "text-yellow-500 bg-transparent hover:bg-yellow-100 opacity-50 dark:text-yellow-900 dark:hover:bg-yellow-800"
                : ""
            } ${
              color === "error"
                ? "text-red-500 bg-transparent hover:bg-red-100 opacity-50 dark:text-red-900 dark:hover:bg-red-800"
                : ""
            }`
          : ""
      } ${
        variant === "action"
          ? `flex items-center justify-center !text-xl text-slate-600 aspect-square !w-[35px] !p-0 transition-colors cursor-pointer hover:bg-slate-200/70 dark:text-slate-500 dark:hover:bg-slate-800  ${
              color === "warning"
                ? "text-yellow-600 hover:bg-yellow-200/70 dark:text-yellow-500 dark:hover:bg-yellow-800"
                : ""
            } ${
              color === "error"
                ? "text-red-600 hover:bg-red-200/70 dark:text-red-500 dark:hover:bg-red-800"
                : ""
            }`
          : ""
      } transition-colors px-8 py-[10px] text-sm text-white rounded-md w-full whitespace-nowrap ${className}`}
      type={submit ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled}
      data-tooltip={tooltip}
    >
      {loading ? (
        <div className="flex justify-center h-5">
          <Loading color="#a9c3fc" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
