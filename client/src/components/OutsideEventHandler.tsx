import { ReactNode, useEffect, useRef, FC } from "react";

interface OutsideEventHandlerProps {
  children: ReactNode;
  onEvent: any;
}

const OutsideEventHandler: FC<OutsideEventHandlerProps> = ({
  children,
  onEvent,
}) => {
  const ref: any = useRef(null);

  const handleEvent = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onEvent();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleEvent);

    document.addEventListener("escape", handleEvent);

    return () => {
      document.removeEventListener("mousedown", handleEvent);
      document.removeEventListener("escape", handleEvent);
    };
  });

  return <div ref={ref}>{children}</div>;
};

export default OutsideEventHandler;
