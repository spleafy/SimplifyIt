import { FC, MouseEventHandler } from "react";
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { Check } from "phosphor-react";
// Utils
import { getColors } from "../../utils/utils";

interface ColorPickerProps {
  onClick?: MouseEventHandler;
  register: UseFormRegister<any>;
  name: string;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  reset: UseFormReset<any>;
  variant: string;
  active: string;
  animate?: string;
  size?: string;
}

const ColorPicker: FC<ColorPickerProps> = ({
  onClick,
  register,
  name,
  getValues,
  setValue,
  reset,
  variant,
  animate,
  active,
  size,
}) => {
  /**
   * Tailwind colors
   * @description Getting all of the colors from the getColors util
   */
  const colors = getColors("all");

  return (
    <>
      {Object.keys(colors).map((key: string, index: number) =>
        colors[key][500] ? (
          <div
            className={`w-10 ${size === "xs" ? "!w-6" : ""} ${
              size === "sm" ? "!w-8" : ""
            } ${size === "md" ? "!w-12" : ""} ${size === "lg" ? "!w-16" : ""} ${
              size === "xl" ? "!w-20" : ""
            } aspect-square transition-all cursor-pointer flex justify-center items-center text-white ${
              variant === "rounded" ? "rounded-full" : ""
            } ${variant === "squared" ? "rounded-lg" : ""}  ${
              animate === "scale"
                ? `${
                    key === getValues(name)
                      ? "scale-125 hover:scale-125"
                      : "hover:scale-110"
                  }`
                : ""
            } ${
              animate === "border"
                ? `${
                    key === getValues(name)
                      ? "rounded-full hover:rounded-full"
                      : "hover:rounded-xl"
                  }`
                : ""
            }`}
            style={{ backgroundColor: colors[key][500] }}
            onClick={(e) => {
              setValue(name, key);
              reset(getValues());
              if (onClick) {
                onClick(e);
              }
            }}
            key={index}
          >
            {key === getValues(name) ? (
              <>
                {active === "dot" ? (
                  <div className="w-1 aspect-square rounded-full bg-white"></div>
                ) : (
                  <></>
                )}

                {active === "check" ? <Check /> : <></>}
              </>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="hidden" key={index}></div>
        )
      )}
      <input type="text" className="hidden" {...register(name)} />
    </>
  );
};

export default ColorPicker;
