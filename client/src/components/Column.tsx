import { ReactChild } from "react";

interface ColumnProps {
  width?: string;
  minWidth?: string;
  children: ReactChild | ReactChild[];
}

const Column = ({ width, minWidth, children }: ColumnProps) => {
  return (
    <div
      className={`w-${width ? width : "full"} min-w-${
        minWidth ? minWidth : "fit"
      } flex flex-col px-5 overflow-y-scroll`}
    >
      {children}
    </div>
  );
};

export default Column;
