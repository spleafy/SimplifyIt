import { ReactElement, useState, FC } from "react";
import { CaretDown } from "phosphor-react";
import { UseFormSetValue } from "react-hook-form";
// Components
import Field from "./Field";
import FormFieldWrapper from "./FormFieldWrapper";
import Card from "../basic/Card";
import OutsideEventHandler from "../OutsideEventHandler";

interface SelectFormFieldProps {
  name: string;
  placeholder: string;
  label: string;
  action?: HTMLElement | ReactElement;
  register: any;
  error: any;
  validators?: any;
  className?: string;
  options: string[];
  setValue: UseFormSetValue<any>;
}

/**
 * SelectFormField Params
 * @param {Object} props
 * @param {string} props.name The name the field will be registered with
 * @param {string} props.placeholder The placeholder of the field
 * @param {string | HTMLElement} props.label The label text or element for the label element
 * @param {string | HTMLElement=} props.action The label action text or element for the label element
 * @param {any} props.register The useForm hook register function
 * @param {Object} props.error The error object for the fields
 * @param {any} props.validators The validator functions of the field
 * @param {string=} props.className The additional classes for the select field component
 * @param {string[]} props.options The options for the select input
 * @param {UseFormGetValues<any>} props.getValues The options for the select input
 * @param {UseFormSetValue<any>} props.setValue The useForm hook setValue function to set the value of the input on option change
 * @param {boolean=} props.multiple The boolean, which will toggle the input from a default select input to a multiple select input
 * @returns Element
 */

const SelectFormField: FC<SelectFormFieldProps> = ({
  name,
  placeholder,
  label,
  action,
  register,
  error,
  validators,
  className,
  setValue,
  options,
}) => {
  /**
   * Expanded State
   * @description Creating a useState variable, so we can expand and hide the dropdown menu.
   */

  const [expanded, setExpanded] = useState(false);

  return (
    <FormFieldWrapper
      className={`flex flex-col relative ${className}`}
      error={error}
      label={label}
      action={action}
      name={name}
    >
      <Field
        name={name}
        placeholder={placeholder}
        register={register}
        type={"text"}
        validators={validators}
        onFocus={() => {
          setExpanded(true);
        }}
        readOnly={true}
      />
      <CaretDown className="text-gray-400" />

      {expanded ? (
        <OutsideEventHandler
          onEvent={() => {
            setExpanded(false);
          }}
        >
          <Card
            variant="panel"
            className="absolute top-[80px] left-0 flex min-w-[150px]"
          >
            {options?.map((option: string, index: number) => (
              <div
                className="text-sm transition-colors text-gray-600 dark:text-gray-400 cursor-pointer hover:text-black dark:hover:text-white px-1 py-2"
                onClick={() => {
                  setValue(name, option, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });

                  setExpanded(false);
                }}
                key={index}
              >
                {option}
              </div>
            ))}
          </Card>
        </OutsideEventHandler>
      ) : (
        <></>
      )}
    </FormFieldWrapper>
  );
};

export default SelectFormField;
