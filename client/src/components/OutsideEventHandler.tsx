import { ReactNode, useEffect, useRef, FC, RefObject } from "react";

interface OutsideEventHandlerProps {
  children: ReactNode;
  onEvent: Function;
}

const OutsideEventHandler: FC<OutsideEventHandlerProps> = ({
  children,
  onEvent,
}) => {
  const ref: RefObject<HTMLDivElement> = useRef(null);

  const handleEvent = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
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
