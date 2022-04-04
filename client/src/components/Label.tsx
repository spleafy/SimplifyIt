interface LabelProps {
  children: HTMLElement | HTMLElement[] | String;
}

const Label = ({ children }: LabelProps) => {
  return (
    <div className="rounded-md bg-theme-200 text-theme-500 w-fit whitespace-nowrap text-xs px-3 py-1">
      {children}
    </div>
  );
};

export default Label;
