import { FC, ReactNode } from "react";

interface FloatingActionButtonsPanelProps {
  children: ReactNode;
}

const FloatingActionButtonsPanel: FC<FloatingActionButtonsPanelProps> = ({
  children,
}) => {
  return <div className="flex bottom-8 right-8 absolute">{children}</div>;
};

export default FloatingActionButtonsPanel;
