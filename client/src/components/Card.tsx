import { ReactElement } from "react";

interface CardProps {
  children: ReactElement | HTMLElement | ReactElement[] | HTMLElement[];
  width?: string;
  height?: string;
  className?: string;
}

const Card = ({ children, width, height, className }: CardProps) => {
  return (
    <div
      className={`bg-white dark:bg-slate-800 dark:text-white rounded-md shadow-md overflow-hidden max-w-[1400px] ${className}`}
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
