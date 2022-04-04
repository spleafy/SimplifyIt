import { MouseEventHandler, ReactChild } from "react";
import { useSelector } from "react-redux";
// Components
import Loading from "./Loading";

interface PrimaryButtonProps {
  children: ReactChild | ReactChild[];
  submit?: boolean;
  click?: MouseEventHandler | any;
  loading?: boolean;
  disabled?: boolean;
}

const PrimaryButton = ({
  children,
  submit,
  click,
  loading,
  disabled,
}: PrimaryButtonProps) => {
  const loggedUser = useSelector((state: any) => state.user.user);

  return (
    <button
      className={`${
        loggedUser.settings
          ? "bg-theme-500 dark:bg-theme-600"
          : "bg-primary-400"
      } ${
        loggedUser.settings
          ? "hover:bg-theme-600 dark:hover:bg-theme-700 disabled:bg-theme-300 dark:disabled:bg-theme-900"
          : "hover:bg-primary-500"
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
