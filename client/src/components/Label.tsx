interface LabelProps {
  children: HTMLElement | HTMLElement[] | String;
}

const Label = ({ children }: LabelProps) => {
  return (
    <div className="absolute rounded-md bg-theme-500 text-theme-200 -top-2 left-full whitespace-nowrap text-xs px-3 py-1">
      {children}
    </div>
  );
};

export default Label;
