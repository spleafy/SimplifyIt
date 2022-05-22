import { FC, ReactNode } from "react";

interface NavigationLabelProps {
  children: ReactNode;
  expanded?: boolean;
}

/**
 * NavigationLabel Params
 * @param {Object} props
 * @param {any} props.children The children of the element
 * @returns Element
 */

const NavigationLabel: FC<NavigationLabelProps> = ({ children, expanded }) => {
  return (
    <div
      className={`flex items-center transition-all ${
        expanded === false
          ? "text-center justify-center overflow-hidden text-ellipsis text-xs"
          : "px-8"
      } pt-4 pb-2 text-slate-600 dark:text-slate-100 text-sm leading-[14px] tracking-widest opacity-80`}
    >
      {children}
    </div>
  );
};

export default NavigationLabel;
