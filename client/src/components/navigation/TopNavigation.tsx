import { ReactChild, FC } from "react";

interface TopNavigationProps {
  children: ReactChild | ReactChild[];
}

/**
 * TopNavigation Params
 * @param {Object} props
 * @param {any} props.children The children of the element
 * @returns
 */

const TopNavigation: FC<TopNavigationProps> = ({ children }) => {
  return (
    <div className="flex justify-between items-center h-[55px] min-h-[55px] border-b-[1px] px-5 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900">
      {children}
    </div>
  );
};

export default TopNavigation;
