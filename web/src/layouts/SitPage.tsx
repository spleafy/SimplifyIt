import { FC, ReactNode } from "react";
import { Animated, hooks as H, Animations } from "@prismane/core";
// Types
import { SitComponent } from "../types";

interface SitPageProps extends SitComponent {
  animationIn?: Animations;
  title?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

const SitPage: FC<SitPageProps> = ({
  children,
  className,
  style,
  animationIn,
  title,
  header,
  footer,
}) => {
  document.title = title ? `SimplifyIt | ${title}` : "SimplifyIt";

  return (
    <Animated
      animationIn={animationIn ? animationIn : "animate-fade-in"}
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
