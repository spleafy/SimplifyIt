import { useSelector } from "react-redux";
// Utils
import { defineError } from "../utils/utils";

const ErrorPanel = () => {
  /**
   * Errors State
   * @description Getting the errors stored in the redux store.
   */

  const errors = useSelector((state: any) => state.errors.errors);

  return (
    <div className="absolute right-8 bottom-8 flex flex-col gap-5">
      {errors.map((error: any, index: number) => (
        <div
          className="py-3 px-8 rounded-md bg-red-400 text-white animate-fadeOut"
          key={index}
        >
          {defineError(error.message)}
        </div>
      ))}
    </div>
  );
};

export default ErrorPanel;
