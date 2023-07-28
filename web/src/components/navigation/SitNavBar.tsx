import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
// Types
import { FC, ReactNode } from "react";
import { SitComponent } from "../../types";

interface SitNavigationBarProps extends SitComponent {
  links: LinkProps[];
  layoutId: string;
}

interface LinkProps {
  element: ReactNode;
  to: string;
}

const SitNavBar: FC<SitNavigationBarProps> = ({
  links,
  layoutId,
  className,
  ...props
}) => {
  return (
    <div className="flex gap-5 items-center">
      {links.map((link: LinkProps, index: number) => (
        <NavLink to={link.to} key={index} {...props}>
          {({ isActive }) => (
            <div
              className={`flex w-full h-full relative items-center justify-center px-6 py-3 rounded-md transition-all group ${
                className ? className : ""
              }`}
            >
              <div
                className={`flex transition-all z-50 group-hover:text-primary-500 ${
                  isActive ? "text-primary-500" : "text-base-800"
                }`}
              >
                {link.element}
              </div>
              {isActive && (
                <motion.div
                  layoutId={layoutId}
                  className="flex w-full h-[2px] absolute z-10 bottom-0 left-0 bg-primary-500 rounded-md"
                ></motion.div>
              )}
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default SitNavBar;
