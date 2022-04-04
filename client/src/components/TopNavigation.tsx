import { ReactChild } from "react";

interface TopNavigationProps {
  children: ReactChild | ReactChild[];
}

const TopNavigation = ({ children }: TopNavigationProps) => {
  return (
    <div className="flex justify-between items-center h-[60px] min-h-[60px] border-b-[1px] px-5 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900">
      {children}
    </div>
  );
};

export default TopNavigation;
