import { MouseEventHandler, ReactChild } from "react";
// Components
import Loading from "./Loading";

interface SecondaryButtonProps {
  children: ReactChild | ReactChild[];
  submit?: boolean;
  click?: MouseEventHandler | any;
  loading?: boolean;
  variant?: string;
}

const SecondaryButton = ({
  children,
  submit,
  click,
  loading,
  variant,
}: SecondaryButtonProps) => {
  return (
    <button
      className={`text-theme-500 bg-theme-100 hover:text-theme-600 hover:bg-theme-200 dark:text-theme-100 dark:bg-theme-900 dark:hover:bg-theme-800 dark:hover:text-theme-200 opacity-90 transition-colors px-8 py-[10px] text-sm rounded-md w-full whitespace-nowrap ${
        variant === "warning"
          ? "text-yellow-500 bg-yellow-100 hover:text-yellow-600 hover:bg-yellow-200 dark:text-yellow-100 dark:bg-yellow-900 dark:hover:bg-yellow-800 dark:hover:text-yellow-200"
          : ""
      } ${
        variant === "error"
          ? "text-red-500 bg-red-100 hover:text-red-600 hover:bg-red-200/80 dark:text-red-100 dark:bg-red-900 dark:hover:bg-red-800 dark:hover:text-red-200"
          : ""
      }`}
      type={submit ? "submit" : "button"}
      onClick={click}
    >
      {loading ? (
        <div className="flex justify-center h-5">
          <Loading color="rgb(51 65 85)" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default SecondaryButton;
