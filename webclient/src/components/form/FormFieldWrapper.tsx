import { ReactElement, FC, ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { RootStateOrAny, useSelector } from "react-redux";
import { WarningCircle } from "phosphor-react";

interface FormFieldWrapperProps {
  name: string;
  label: string;
  action?: HTMLElement | ReactElement;
  error: FieldError | undefined;
  className?: string;
  children?: ReactNode;
}

/**
 * FormFieldWrapper Params
 * @param {Object} props
 * @param {string} props.name The name for the "HTMLFor" property of the label element
 * @param {string | HTMLElement} props.label The label text or element for the label element
 * @param {string | HTMLElement=} props.action The label action text or element for the label element
 * @param {any=} props.children The children for the form field wrapper
 * @param {Object} props.error The error object for the fields
 * @param {string=} props.className The additional classes for the wrapper component
 * @returns Element
 */

const FormFieldWrapper: FC<FormFieldWrapperProps> = ({
  name,
  label,
  action,
  children,
  error,
  className,
}) => {
  /**
   * Logged User
   * @constant
   * @description Getting the logged user from the redux store.
   */

  const loggedUser = useSelector((state: RootStateOrAny) => state.user.user);

  return (
    <div className={`flex flex-col mb-5 ${className}`}>
      <label
        htmlFor={name}
        className="mb-2 text-slate-700 text-sm flex items-center justify-between dark:text-slate-100"
      >
        {label}
        {action}
      </label>
      <div
        className={`rounded-lg border border-slate-300 px-4 placeholder:text-slate-200 transition-colors flex items-center dark:border-slate-500 gap-2 ${
          loggedUser.settings
            ? "focus-within:border-theme-400 hover:border-theme-400"
            : "focus-within:border-primary-400 hover:border-primary-500"
        } ${error ? "!border-red-500" : ""}`}
      >
        {children}
        {error ? <WarningCircle className="text-red-500 text-lg" /> : <></>}
      </div>
      <div className="text-red-500 mt-2 text-sm flex gap-2 items-center">
        {error ? error.message : ""}
      </div>
    </div>
  );
};

export default FormFieldWrapper;
