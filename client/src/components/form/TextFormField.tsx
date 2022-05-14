import { ReactElement, useState, FC } from "react";
// Components
import FormFieldWrapper from "./FormFieldWrapper";
import Field from "./Field";

interface TextFormFieldProps {
  name: string;
  placeholder: string;
  type?: string;
  label: string;
  action?: HTMLElement | ReactElement;
  validating?: boolean;
  register: any;
  error: any;
  validators?: any;
  className?: string;
  onFocus?: any;
  onChange?: any;
  min?: number;
  max?: number;
}

/**
 * TextFormField Params
 * @param {Object} props
 * @param {string} props.name The name the field will be registered with
 * @param {string} props.placeholder The placeholder of the field
 * @param {string | HTMLElement} props.label The label text or element for the label element
 * @param {string | HTMLElement=} props.action The label action text or element for the label element
 * @param {any} props.register The useForm hook register function
 * @param {Object} props.error The error object for the fields
 * @param {any} props.validators The validator functions of the field
 * @param {string=} props.className The additional classes for the text field component
 * @param {any=} props.onFocus The function for the onFocus event
 * @param {any=} props.onChange The function for the onChange event
 * @param {boolean=} props.validating The validating boolean for async validation display
 * @param {number=} props.min The min length of the field
 * @param {number=} props.max The max length of the field
 * @returns Element
 */

const TextFormField: FC<TextFormFieldProps> = ({
  name,
  placeholder,
  type,
  label,
  action,
  validating,
  register,
  error,
  validators,
  className,
  onFocus,
  min,
  max,
}) => {
  /**
   * Mutable Type
   * @description Mutate the password type to text, so the user can see the password he entered.
   */

  const [mutableType, setMutableType] = useState(type);

  return (
    <FormFieldWrapper
      name={name}
      label={label}
      error={error}
      action={action}
      className={className}
    >
      <Field
        name={name}
        placeholder={placeholder}
        type={mutableType}
        validators={validators}
        register={register}
        onFocus={onFocus}
        min={min}
        max={max}
      />
      {type === "password" ? (
        <span
          className="text-sm text-primary-500 hover:underline cursor-pointer"
          onClick={() => {
            mutableType === "password"
              ? setMutableType("text")
              : setMutableType("password");
          }}
        >
          {mutableType === "password" ? "Show" : "Hide"}
        </span>
      ) : (
        <></>
      )}
      {validating ? (
        <svg
          role="status"
          className="w-6 h-6 animate-spin fill-primary-500"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="primary-500"
          />
        </svg>
      ) : (
        <></>
      )}
    </FormFieldWrapper>
  );
};

export default TextFormField;
