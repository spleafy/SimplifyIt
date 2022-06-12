import { FC } from "react";
import { Spinner } from "phosphor-react";

interface LoadingProps {
  color?: string;
}

/**
 * Loading Params
 * @param {Object} props
 * @param {string} props.color The color of the loading svg element
 * @returns Element
 */

const Loading: FC<LoadingProps> = ({ color }) => {
  return (
    <Spinner
      className={`animate-spin ${color ? color : "text-slate-700"}`}
      size={"100%"}
    />
  );
};

export default Loading;
