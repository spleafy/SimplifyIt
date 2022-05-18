import { ReactElement, useState, FC } from "react";
import { CaretDown, X } from "phosphor-react";
// Components
import Field from "./Field";
import FormFieldWrapper from "./FormFieldWrapper";
import Card from "../basic/Card";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

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
  getValues: UseFormGetValues<any>;
  multiple?: boolean;
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
  options,
  getValues,
  setValue,
  multiple,
}) => {
  /**
   * Expanded State
   * @description Creating a useState variable, so we can expand and hide the dropdown menu.
   */

  const [expanded, setExpanded] = useState(false);

  const [fieldOptions, setFieldOptions] = useState(options);

  const [chosenOptions, setChosenOptions]: any = useState([]);

  return (
    <FormFieldWrapper
      className={`flex flex-col relative ${className ? className : "mb-5"}`}
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
        className={`${multiple ? "hidden" : ""}`}
      />
      {multiple ? (
        <div
          className="text-sm w-full py-2 dark:text-white flex gap-3"
          onClick={() => {
            setExpanded(true);
          }}
        >
          {chosenOptions.length > 0 ? (
            <>
              {chosenOptions.map((chosenOption: string, index: number) => (
                <div
                  className="bg-slate-200 px-2 py-1 text-black rounded-full flex items-center gap-2 text-xs cursor-pointer"
                  key={index}
                  onClick={() => {
                    setFieldOptions([...fieldOptions, chosenOption]);
                    setChosenOptions(
                      chosenOptions.filter(
                        (choice: string) => choice !== chosenOption
                      )
                    );

                    setValue(name, chosenOptions.join(" "), {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                >
                  {chosenOption}
                  <X />
                </div>
              ))}
            </>
          ) : (
            <span className="text-slate-700 dark:text-slate-100">
              {placeholder}
            </span>
          )}
        </div>
      ) : (
        <></>
      )}
      <CaretDown className="text-gray-400" />
      <Card
        variant="panel"
        className={`absolute top-[80px] left-0 ${expanded ? "flex" : "hidden"}`}
      >
        {fieldOptions?.map((option: string, index: number) => (
          <div
            className="text-sm transition-colors text-gray-600 dark:text-gray-400 cursor-pointer hover:text-black dark:hover:text-white px-1 py-2"
            onClick={() => {
              if (!multiple) {
                setValue(name, option, {
                  shouldValidate: true,
                  shouldDirty: true,
                });

                setExpanded(false);

                return;
              }

              setValue(name, getValues(name) + " " + option, {
                shouldValidate: true,
                shouldDirty: true,
              });

              setFieldOptions(
                fieldOptions.filter((choice: string) => choice !== option)
              );

              setChosenOptions([...chosenOptions, option]);

              setExpanded(false);
            }}
            key={index}
          >
            {option}
          </div>
        ))}
      </Card>
    </FormFieldWrapper>
  );
};

export default SelectFormField;
