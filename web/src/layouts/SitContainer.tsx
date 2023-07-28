import { FC } from "react";
import { Animated } from "@prismane/core";
// Types
import { SitComponent } from "../types";

const SitContainer: FC<SitComponent> = ({ children, className, ...props }) => {
  return (
    <Animated
      entry="fadeIn"
      className={`p-5 flex w-full ${className ? className : ""}`}
      {...props}
    >
      {children}
    </Animated>
  );
};

export default SitContainer;
