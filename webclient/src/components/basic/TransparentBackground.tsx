import { FC, ReactNode } from "react";

interface TransparentBackgroundProps {
  children: ReactNode;
  className?: string;
}

const TransparentBackground: FC<TransparentBackgroundProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`fixed w-full h-full flex justify-center items-center bg-gray-900/50 z-20 top-0 left-0 ${className}`}
    >
      {children}
    </div>
  );
};

export default TransparentBackground;
