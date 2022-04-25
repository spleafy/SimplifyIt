import { ReactElement } from "react";

interface ActionButtonProps {
  children: ReactElement | HTMLElement | ReactElement[] | HTMLElement[];
  onClick?: any;
  className?: string;
  tooltip?: string;
}

/**
 * ActionButton Params
 * @param {Object} props
 * @param {any} props.children The children of the component
 * @param {any=} props.onClick The function for the onClick event
 * @param {string=} props.className The additional classes for styling the component
 * @param {string=} props.tooltip The tooltip text
 * @returns Element
 */

const ActionButton = ({
  children,
  onClick,
  className,
  tooltip,
}: ActionButtonProps) => {
  return (
    <div
      className={`flex items-center justify-center text-xl text-slate-600 aspect-square w-[35px] rounded-md transition-colors cursor-pointer hover:bg-slate-200/70 dark:text-slate-500 dark:hover:bg-slate-800 ${className}`}
      onClick={onClick}
      data-tooltip={tooltip}
    >
      {children}
    </div>
  );
};

export default ActionButton;
