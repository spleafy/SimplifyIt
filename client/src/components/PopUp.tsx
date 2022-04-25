import { ReactElement } from "react";

interface PopUpProps {
  heading?: string;
  alignHeading?: string;
  children: ReactElement | HTMLElement | ReactElement[] | HTMLElement[];
  width?: string;
  height?: string;
  className?: string;
}

/**
 * PopUp Params
 * @param {Object} props
 * @param {string=} props.heading The heading of the card
 * @param {any} props.children The children of the element
 * @param {string=} props.width The width of the element
 * @param {string=} props.height The height of the element
 * @param {string=} props.className The additional classes for styling the component
 * @returns Element
 */

const PopUp = ({
  heading,
  alignHeading,
  children,
  width,
  height,
  className,
}: PopUpProps) => {
  return (
    <div
      className={`shadow-[0_0_20px_10px_rgba(0,0,0,0.1)] px-16 py-8 animate-scale bg-white dark:bg-slate-800 dark:text-white flex flex-col rounded-md overflow-y-auto overflow-x-hidden ${
        width ? `w-[${width}]` : "w-full"
      } ${height ? `h-[${height}]` : "h-fit"} ${className}`}
    >
      {heading ? (
        <div
          className={`mb-8 mt-3 ${
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

export default PopUp;
