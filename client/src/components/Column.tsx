import { ReactChild } from "react";

interface ColumnProps {
  width?: string;
  minWidth?: string;
  children: ReactChild | ReactChild[];
}

const Column = ({ width, minWidth, children }: ColumnProps) => {
  return (
    <div
      className={`${width ? "w-[400px]" : "w-full"} min-w-${
        minWidth ? minWidth : "fit"
      } h-full flex flex-col overflow-y-scroll pt-6 px-5`}
    >
      {children}
    </div>
  );
};

export default Column;
