import { FC } from "react";

interface SeparatorProps {
  className?: string;
}

const Separator: FC<SeparatorProps> = ({ className }) => {
  return (
    <div
      className={`flex w-full h-[1px] bg-slate-200 dark:bg-slate-600 my-2 ${className}`}
    ></div>
  );
};

export default Separator;
