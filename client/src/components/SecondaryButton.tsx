import { MouseEventHandler, ReactChild } from "react";
// Components
import Loading from "./Loading";

interface SecondaryButtonProps {
  children: ReactChild | ReactChild[];
  submit?: boolean;
  click?: MouseEventHandler | any;
  loading?: boolean;
}

const SecondaryButton = ({
  children,
  submit,
  click,
  loading,
}: SecondaryButtonProps) => {
  return (
    <button
      className="text-theme-500 bg-theme-100 hover:text-theme-600 hover:bg-theme-200 dark:text-theme-100 dark:bg-theme-900 dark:hover:bg-theme-800 dark:hover:text-theme-200 opacity-90 transition-colors px-8 py-[10px] text-sm rounded-md w-full whitespace-nowrap"
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
