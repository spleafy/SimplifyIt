import { FC, ReactNode } from "react";
import { Tooltip } from "@prismane/core";
import { NavLink } from "react-router-dom";
// Types
import { SitComponent } from "../../types";

interface SitNavItemProps extends SitComponent {
  to: string;
  children: ReactNode;
  icon?: ReactNode;
  tooltip?: string;
  expanded?: boolean;
}

/**
 * SitNavItem Params
 * @param {Object} props
 * @param {string} props.to The location that the link would redirect to
 * @param {any} props.children The children of the element
 * @param {string=} props.className The additional classes for styling the component
 * @param {string=} props.variant The variant of the navigation link
 * @returns Element
 */

const SitNavItem: FC<SitNavItemProps> = ({
  to,
  children,
  icon,
  tooltip,
  expanded,
  className,
  ...props
}) => {
  const item = (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return `flex w-full items-center rounded-lg  h-10 ${
          expanded ? "gap-4 px-3 py-2" : "justify-center aspect-square !w-10"
        } ${isActive ? "bg-primary-100 text-primary-500" : "text-base-700"} ${
          className ? className : ""
        }`;
      }}
      {...props}
    >
      {icon}
      {expanded && (
        <div className="whitespace-nowrap grow text-sm w-full overflow-hidden">
          {children}
        </div>
      )}
    </NavLink>
  );

  return (
    <>
      {expanded ? (
        item
      ) : (
        <>
          {tooltip ? (
            <Tooltip title={tooltip} position="right" className="!left-[115%]">
              {item}
            </Tooltip>
          ) : (
            item
          )}
        </>
      )}
    </>
  );
};

export default SitNavItem;
