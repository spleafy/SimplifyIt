import { FC } from "react";

interface NavigationLabelProps {
  children: any;
}

/**
 * NavigationLabel Params
 * @param {Object} props
 * @param {any} props.children The children of the element
 * @returns Element
 */

const NavigationLabel: FC<NavigationLabelProps> = ({ children }) => {
  return (
    <div className="flex items-center pt-4 pb-2 justify-start px-8 text-slate-600 dark:text-slate-400 text-sm leading-[14px] tracking-widest opacity-80">
      {children}
    </div>
  );
};

export default NavigationLabel;
