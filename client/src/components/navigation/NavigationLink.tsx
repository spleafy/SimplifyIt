import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface NavigationLinkProps {
  to: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  variant?: string;
  expanded?: boolean;
}

/**
 * NavigationLink Params
 * @param {Object} props
 * @param {string} props.to The location that the link would redirect to
 * @param {any} props.children The children of the element
 * @param {string=} props.className The additional classes for styling the component
 * @param {string=} props.variant The variant of the navigation link
 * @returns Element
 */

const NavigationLink: FC<NavigationLinkProps> = ({
  to,
  children,
  icon,
  className,
  variant,
  expanded,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return `flex items-center gap-3 transition-all overflow-hidden rounded-lg group text-slate-600 dark:text-white hover:text-theme-500 dark:hover:text-theme-500 px-4 py-2 ${
          variant === "navigation"
            ? `mt-2 mx-4 hover:bg-theme-100/20 dark:hover:bg-theme-900/10 ${
                !expanded
                  ? "w-[35px] aspect-square !justify-center tooltip-rel after:left-[105%] after:translate-y-1/2"
                  : ""
              }`
            : ""
        } ${
          variant === "bordered"
            ? "mx-4 rounded-none border-theme-500 before:hidden bg-transparent"
            : ""
        } ${
          isActive
            ? `!text-theme-500 ${
                variant === "navigation"
                  ? "before:absolute before:content-[''] before:h-[25px] before:w-1 before:left-0 before:rounded-r-md before:bg-theme-400 text-theme-500 bg-theme-100/50 hover:!bg-theme-100/50 dark:before:bg-theme-500 dark:bg-theme-900/20 dark:hover:!bg-theme-900/20"
                  : ""
              } ${variant === "bordered" ? "border-b-2" : ""}`
            : ``
        } ${className}`;
      }}
      data-tooltip={children}
    >
      {icon ? <div className="text-lg">{icon}</div> : <></>}
      {expanded === false ? (
        <></>
      ) : (
        <div className="whitespace-nowrap">{children}</div>
      )}
    </NavLink>
  );
};

export default NavigationLink;
