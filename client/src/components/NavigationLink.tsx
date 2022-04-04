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
        return `py-2 flex items-center justify-between transition-colors px-3 ${className} ${
          isActive
            ? `text-theme-500 font-bold dark:text-theme-500 ${
                variant === "bordered"
                  ? "border-b-2 border-theme-500"
                  : "bg-theme-50 dark:bg-theme-900 rounded-md"
              }`
            : "text-slate-600 dark:text-white hover:text-theme-500"
        }`;
      }}
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;
