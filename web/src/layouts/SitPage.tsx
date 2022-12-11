import { FC } from "react";
import { Animated, hooks as H, Animations } from "@prismane/core";
// Types
import { SitComponent } from "../types";

interface SitPageProps extends SitComponent {
  animationIn?: Animations;
  title?: string;
}

const SitPage: FC<SitPageProps> = ({
  children,
  className,
  style,
  animationIn,
  title,
}) => {
  document.title = title ? `SimplifyIt | ${title}` : "SimplifyIt";

  return (
    <Animated
      animationIn={animationIn ? animationIn : "animate-fade-in"}
      className={`grow ${className ? className : ""}`}
      style={style}
    >
      {children}
    </Animated>
  );
};

export default SitPage;
