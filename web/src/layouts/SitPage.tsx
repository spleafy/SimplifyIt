import { FC, ReactNode } from "react";
import { Animated, hooks as H, Animations } from "@prismane/core";
// Types
import { SitComponent } from "../types";

interface SitPageProps extends SitComponent {
  entry?: Animations;
  title?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

const SitPage: FC<SitPageProps> = ({
  children,
  className,
  style,
  entry,
  title,
  header,
  footer,
}) => {
  document.title = title ? `SimplifyIt | ${title}` : "SimplifyIt";

  return (
    <Animated
      entry={entry ? entry : "fadeIn"}
      className={`grow p-5 ${className ? className : ""}`}
      style={style}
    >
      {header && <div className="mb-10 flex w-full">{header}</div>}
      {children}
      {footer && <div className="mt-10 flex w-full">{footer}</div>}
    </Animated>
  );
};

export default SitPage;
