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
      className={`flex flex-col h-full ${className ? className : ""}`}
      style={style}
    >
      {header && <header>{header}</header>}
      <div className="flex grow">
        {aside && <aside>{aside}</aside>}
        <main className="flex grow">{children}</main>
      </div>
      {footer && <footer>{footer}</footer>}
    </div>
  );
};

export default SitLayout;
