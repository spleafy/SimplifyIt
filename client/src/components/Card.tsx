import { ReactElement } from "react";

interface CardProps {
  children: ReactElement | HTMLElement | ReactElement[] | HTMLElement[];
  width?: string;
  height?: string;
  className?: string;
}

/**
 * Card Params
 * @param {Object} props
 * @param {any} props.children The children of the element
 * @param {string=} props.width The width of the element
 * @param {string=} props.height The height of the element
 * @param {string=} props.className The additional classes for styling the component
 * @returns Element
 */

const Card = ({ children, width, height, className }: CardProps) => {
  return (
    <div
      className={`bg-white dark:bg-slate-800 dark:text-white rounded-md shadow-md overflow-hidden ${className}`}
      style={{
        width: width ? width : "fit-content",
        height: height ? height : "fit-content",
      }}
    >
      {children}
    </div>
  );
};

export default Card;
