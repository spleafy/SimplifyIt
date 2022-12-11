import { FC, ReactNode } from "react";
// Types
import { SitComponent } from "../types";

interface SitLayoutProps extends SitComponent {
  aside?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

const SitLayout: FC<SitLayoutProps> = ({
  aside,
  header,
  children,
  footer,
  className,
  style,
}) => {
  return (
    <div
      className={`flex flex-row gap-5 h-full ${className ? className : ""}`}
      style={style}
    >
      {aside}
      <div className="flex flex-col grow gap-5">
        {header}
        {children}
        {footer}
      </div>
    </div>
  );
};

export default SitLayout;
