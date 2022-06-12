import { ReactNode, FC, Dispatch } from "react";
// Components
import { X } from "phosphor-react";

interface CardProps {
  heading?: string;
  alignHeading?: string;
  children: ReactNode;
  width?: string;
  height?: string;
  className?: string;
  variant?: string;
  setShown?: Dispatch<boolean>;
}

/**
 * Column Params
 * @param {Object} props
 * @param {string=} props.heading The heading of the card if there is any
 * @param {string=} props.alignHeading The alignment of the heading element
 * @param {ReactElement | HTMLElement | ReactElement[] | HTMLElement[]} props.children The children of the card
 * @param {string=} props.width The width of the card
 * @param {string=} props.height The height of the card
 * @param {string=} props.className The additional classes for the component
 * @param {string=} props.variant The variant of the card
 * @returns Element
 */

const Card: FC<CardProps> = ({
  heading,
  alignHeading,
  children,
  width,
  height,
  className,
  variant,
  setShown,
}) => {
  return (
    <div
      className={`${
        variant === "popup"
          ? "drop-shadow-lg px-16 py-12 animate-scale !overflow-y-auto"
          : ""
      } ${
        variant === "dropdown"
          ? "drop-shadow-lg px-3 py-2 animate-slideTop z-10 !overflow-y-auto"
          : ""
      } ${
        variant === "panel"
          ? "absolute top-[55px] drop-shadow-lg px-6 py-4 !overflow-y-auto rounded-none border-l border-slate-200 dark:border-slate-600 transition-all !overflow-x-visible min-w-[400px] !h-full"
          : ""
      } bg-white dark:bg-slate-800 dark:text-white flex flex-col rounded-lg overflow-hidden ${className}`}
      style={{
        width: width ? width : "fit-content",
        height: height ? height : "fit-content",
      }}
    >
      {heading ? (
        <div
          className={`mb-8 flex justify-between items-center ${
            alignHeading === "left" ? "text-left" : "text-center"
          } ${variant === "panel" ? "!mb-2" : ""}`}
        >
          <h1>{heading}</h1>
          {setShown ? (
            <X
              size={24}
              className="cursor-pointer text-slate-700 dark:text-white rotate"
              onClick={() => {
                setShown(false);
              }}
            />
          ) : (
            <></>
          )}
        </div>
      ) : (
        ""
      )}
      {children}
    </div>
  );
};

export default Card;
