import { ReactChild } from "react";

interface ColumnProps {
  width?: string;
  minWidth?: string;
  children: ReactChild | ReactChild[];
}

/**
 * Column Params
 * @param {Object} props
 * @param {string=} props.width The width of the element
 * @param {string=} props.minWidth The minimal width of the element
 * @param {any} props.children The children of the element
 * @returns Element
 */

const Column = ({ width, minWidth, children }: ColumnProps) => {
  return (
    <div
      className={`${width ? "w-[400px]" : "w-full"} min-w-${
        minWidth ? minWidth : "fit"
      } h-full flex flex-col overflow-y-scroll pt-8 px-8`}
    >
      {children}
    </div>
  );
};

export default Column;
