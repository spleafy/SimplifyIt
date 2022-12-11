import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
// Types
import { SitComponent } from "../../types";

interface SitLinkProps extends SitComponent {
  to: string;
  children: ReactNode;
  outside?: boolean;
  before?: Function;
}

const SitLink: FC<SitLinkProps> = ({
  to,
  children,
  outside,
  before,
  className,
  style,
}) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (!outside) {
      navigate(to);
    } else {
      window.open(to);
    }
  };

  return (
    <span
      className={`border-b border-primary-500 text-primary-500 cursor-pointer ${
        className ? className : ""
      }`}
      style={style}
      onClick={async () => {
        if (before) {
          await before();
        }
        handleNavigation();
      }}
    >
      {children}
    </span>
  );
};

export default SitLink;
