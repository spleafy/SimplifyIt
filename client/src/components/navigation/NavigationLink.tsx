import { ReactChild, FC } from "react";
import { NavLink } from "react-router-dom";

interface NavigationLinkProps {
  to: string;
  children: ReactChild | ReactChild[];
  className?: string;
  variant?: string;
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
  className,
  variant,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return `py-2 flex items-center justify-between transition-colors px-8 relative ${className} ${
          isActive
            ? `text-theme-500 font-bold dark:text-theme-500 ${
                variant === "bordered"
                  ? "border-b-2 border-theme-500"
                  : "before:absolute before:content-[''] before:h-1/2 before:w-1 before:left-0  before:bg-theme-400 before:rounded-r-md"
              } ${
                variant === "basic" ? "before:hidden px-2 bg-transparent" : ""
              }`
            : `text-slate-600 dark:text-white hover:text-theme-500 dark:hover:text-theme-500 ${
                variant === "basic" ? "!px-3" : ""
              }`
        }`;
      }}
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;
