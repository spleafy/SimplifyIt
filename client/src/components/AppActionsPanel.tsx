import { FC } from "react";
import { useSelector } from "react-redux";
import { Warning, CheckCircle, WarningOctagon } from "phosphor-react";
// Utils
import { defineError, defineSuccess, defineWarning } from "../utils/utils";

const AppActionsPanel: FC = () => {
  /**
   * Errors State
   * @description Getting the failed actions stored in the redux store.
   */
  const errors = useSelector((state: any) => state.actions.errors);

  /**
   * Successes State
   * @description Getting the successful actions stored in the redux store.
   */
  const successes = useSelector((state: any) => state.actions.successes);

  /**
   * Warnings State
   * @description Getting the warning actions stored in the redux store.
   */
  const warnings = useSelector((state: any) => state.actions.warnings);

  return (
    <div className="absolute right-8 bottom-8 flex flex-col gap-5">
      {errors.map((error: any, index: number) => (
        <div
          className="py-3 px-5 bg-red-400 text-white text-sm rounded-full animate-slideInOut flex items-center gap-2"
          key={index}
        >
          <WarningOctagon size={20} />
          {defineError(error.message)}
        </div>
      ))}
      {successes.map((success: any, index: number) => (
        <div
          className="py-3 px-5 bg-green-400 text-white text-sm rounded-full animate-slideInOut flex items-center gap-2"
          key={index}
        >
          <CheckCircle size={20} />
          {defineSuccess(success.message)}
        </div>
      ))}
      {warnings.map((warning: any, index: number) => (
        <div
          className="py-3 px-5 bg-yellow-400 text-white text-sm rounded-full animate-slideInOut flex items-center gap-2"
          key={index}
        >
          <Warning size={20} />
          {defineWarning(warning.message)}
        </div>
      ))}
    </div>
  );
};

export default AppActionsPanel;
