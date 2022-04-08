import { ReactElement } from "react";

interface PanelProps {
  children: ReactElement | HTMLElement | ReactElement[] | HTMLElement[];
  width?: string;
  className?: string;
}

const Panel = ({ children, width, className }: PanelProps) => {
  return (
    <div
      className={`shadow-[0_0_20px_10px_rgba(0,0,0,0.1)] px-3 py-2 animate-slideTop bg-white dark:bg-slate-800 dark:text-white flex flex-col rounded-md overflow-y-auto z-10 ${
        width ? `w-[${width}] min-w-[${width}]` : "w-full"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Panel;
