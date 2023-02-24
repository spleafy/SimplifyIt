import { FC } from "react";
// Types
import { SitComponent } from "../types";

const SitContainer: FC<SitComponent> = ({ children, className, ...props }) => {
  return (
    <div className={`p-5 flex grow ${className ? className : ""}`} {...props}>
      {children}
    </div>
  );
};

export default SitContainer;
