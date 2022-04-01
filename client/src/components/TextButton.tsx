interface TextButtonProps {
  children: any;
}

const TextButton = ({ children }: TextButtonProps) => {
  return (
    <button className="hover:bg-theme-200 transition-colors px-4 py-[10px] text-sm text-theme-400 rounded-md w-full">
      {children}
    </button>
  );
};

export default TextButton;
