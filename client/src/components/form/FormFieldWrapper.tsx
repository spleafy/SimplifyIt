import { ReactElement, FC } from "react";
import { useSelector } from "react-redux";

interface FormFieldWrapperProps {
  name: string;
  label: string;
  action?: HTMLElement | ReactElement;
  error: any;
  className?: string;
  children?: any;
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

  const loggedUser = useSelector((state: any) => state.user.user);

  return (
    <div className={`flex flex-col mb-5 ${className ? className : "mb-5"}`}>
      <label
        htmlFor={name}
        className="mb-2 text-slate-700 text-sm flex items-center justify-between dark:text-slate-100"
      >
        {label}
        {action}
      </label>
      <div
        className={`rounded-md border-[1px] border-slate-300 px-4 placeholder:text-slate-200 transition-colors flex items-center dark:border-slate-500 ${
          loggedUser.settings
            ? "focus-within:border-theme-400 hover:border-theme-400"
            : "focus-within:border-primary-400 hover:border-primary-500"
        }`}
      >
        {children}
      </div>
      <div className="text-red-600 mt-3 text-sm">
        {error ? error.message : ""}
      </div>
    </div>
  );
};

export default FormFieldWrapper;
