import { ReactChild } from "react";
import { NavLink } from "react-router-dom";

interface NavigationLinkProps {
  to: string;
  children: ReactChild | ReactChild[];
}

const NavigationLink = ({ to, children }: NavigationLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return `py-2 flex items-center justify-between ${
          isActive
            ? `text-theme-400 font-bold dark:text-theme-500`
            : "text-slate-600 dark:text-white"
        }`;
      }}
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;
