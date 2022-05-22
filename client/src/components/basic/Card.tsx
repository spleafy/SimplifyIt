import { ReactNode, FC } from "react";

interface CardProps {
  heading?: string;
  alignHeading?: string;
  children: ReactNode;
  width?: string;
  height?: string;
  className?: string;
  variant?: string;
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
}) => {
  return (
    <div
      className={`${
        variant === "popup"
          ? "drop-shadow-lg px-16 py-12 animate-scale !overflow-y-auto"
          : ""
      } ${
        variant === "panel"
          ? "drop-shadow-lg px-3 py-2 animate-slideTop z-10 !overflow-y-auto"
          : ""
      } bg-white dark:bg-slate-800 dark:text-white flex flex-col rounded-lg overflow-hidden ${className}`}
      style={{
        width: width ? width : "fit-content",
        height: height ? height : "fit-content",
      }}
    >
      {heading ? (
        <div
          className={`mb-8 ${
            alignHeading === "left" ? "text-left" : "text-center"
          }`}
        >
          <h1>{heading}</h1>
        </div>
      ) : (
        ""
      )}
      {children}
    </div>
  );
};

export default Card;
