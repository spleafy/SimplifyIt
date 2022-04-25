interface FieldProps {
  name: string;
  placeholder: string;
  type: string | undefined;
  register: any;
  validators?: any;
  onFocus?: any;
  onBlur?: any;
  className?: string;
  readOnly?: boolean;
}

/**
 * Field Params
 * @param {Object} props
 * @param {string} props.name The name the field will be registered with
 * @param {stirng} props.placeholder The placeholder of the field
 * @param {string | undefined} props.type The type of the field e.g "text", "password"
 * @param {any} props.register The useForm hook register function
 * @param {any=} props.validators The validator functions of the field
 * @param {any=} props.onFocus The function for the onFocus event
 * @param {any=} props.onBlur The function for the onBlur event
 * @param {string=} props.className The additional classes for the field
 * @param {boolean=} props.readOnly The boolean for the readOnly property of the field
 * @returns Element
 */

const Field = ({
  name,
  placeholder,
  type,
  register,
  validators,
  onFocus,
  onBlur,
  className,
  readOnly,
}: FieldProps) => {
  return (
    <input
      name={name}
      id={name}
      placeholder={placeholder}
      type={type}
      className={`text-sm w-full py-2 dark:text-white ${className}`}
      {...register(name, {
        validate: validators,
      })}
      onFocus={onFocus}
      onBlur={onBlur}
      readOnly={readOnly ? true : false}
    />
  );
};

export default Field;
