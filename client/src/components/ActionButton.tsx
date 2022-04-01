interface ActionButtonProps {
  children: any;
}

const ActionButton = ({ children }: ActionButtonProps) => {
  return (
    <button className="px-4 flex items-center justify-between rounded-md h-fit py-1 my-2 transition-colors hover:bg-theme-200 dark:hover:bg-theme-600 text-theme-400 font-bold dark:text-theme-200">
      {children}
    </button>
  );
};

export default ActionButton;
