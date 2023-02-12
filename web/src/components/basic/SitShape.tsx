import { FC } from "react";
import {
  Star,
  Triangle,
  Square,
  Circle,
  XCircle,
  IconProps,
} from "phosphor-react";

interface SitShapeProps extends IconProps {
  shape: "star" | "triangle" | "square" | "circle";
}

const SitShape: FC<SitShapeProps> = ({ shape, ...props }) => {
  if (shape === "star") {
    return <Star {...props} />;
  }

  if (shape === "triangle") {
    return <Triangle {...props} />;
  }

  if (shape === "square") {
    return <Square {...props} />;
  }

  if (shape === "circle") {
    return <Circle {...props} />;
  }

  return <XCircle {...props} />;
};

export default SitShape;
