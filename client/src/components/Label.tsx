interface LabelProps {
  children: HTMLElement | HTMLElement[] | String;
}

/**
 * Label Params
 * @param {Object} props
 * @param {any} props.children The children of the element
 * @returns Element
 */

const Label = ({ children }: LabelProps) => {
  return (
    <div className="rounded-md bg-theme-200 dark:bg-theme-800 text-theme-500 dark:text-theme-300 w-fit whitespace-nowrap text-xs px-3 py-1">
      {children}
    </div>
  );
};

export default Label;
