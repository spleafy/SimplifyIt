import { MouseEventHandler, ReactChild } from "react";
import { useLocation } from "react-router-dom";
// Components
import Loading from "./Loading";

interface PrimaryButtonProps {
  children: ReactChild | ReactChild[];
  submit?: boolean;
  click?: MouseEventHandler | any;
  loading?: boolean;
  disabled?: boolean;
}

/**
 * PrimaryButton Params
 * @param {Object} props
 * @param {any} props.children The children of the button
 * @param {boolean=} props.submit The submit boolean for changing the type of the button from "button" to type "submit"
 * @param {any=} props.click The function for the onClick event
 * @param {boolean=} props.loading The loading boolean to toggle the loading state of the button
 * @param {boolean=} props.disabled The disabled boolean to toggle the disabled state of the button
 * @returns Element
 */

const PrimaryButton = ({
  children,
  submit,
  click,
  loading,
  disabled,
}: PrimaryButtonProps) => {
  /**
   * Location
   * @constant
   * @description Getting the location from the useLocation method, so we have access to the url.
   */

  const location = useLocation();

  return (
    <button
      className={`${
        location.pathname.split("/")[1] === "app"
          ? "bg-theme-500 dark:bg-theme-600"
          : "bg-primary-500"
      } ${
        location.pathname.split("/")[1] === "app"
          ? "hover:bg-theme-600 dark:hover:bg-theme-700 disabled:bg-theme-300 dark:disabled:bg-theme-900"
          : "hover:bg-primary-600"
      } transition-colors px-8 py-[10px] text-sm text-white rounded-md w-full whitespace-nowrap`}
      type={submit ? "submit" : "button"}
      onClick={click}
      disabled={disabled}
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

export default PrimaryButton;
