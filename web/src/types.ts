import { ReactNode, StyleHTMLAttributes } from "react";

export interface SitComponent {
  onClick?: any;
  onHover?: any;
  onMouseOver?: any;
  onScroll?: any;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  className?: string;
  style?: StyleHTMLAttributes<HTMLElement>;
  children?: ReactNode | any;
}
