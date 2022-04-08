import { ReactChild } from "react";
import { NavLink } from "react-router-dom";

interface NavigationLinkProps {
  to: string;
  children: ReactChild | ReactChild[];
  className?: string;
  variant?: string;
}

const NavigationLink = ({
  to,
  children,
  className,
  variant,
}: NavigationLinkProps) => {
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
