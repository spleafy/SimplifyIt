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
        return `px-4 flex items-center justify-between rounded-md h-fit py-1 my-2 transition-colors ${
          isActive
            ? `text-theme-400 bg-theme-200 font-bold dark:text-theme-200 dark:bg-theme-500`
            : "text-slate-600 dark:text-white hover:bg-theme-100 dark:hover:bg-theme-600"
        }`;
      }}
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;
