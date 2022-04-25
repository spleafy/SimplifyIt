import Separator from "./Separator";

/**
 * NavigationLabel Params
 * @param {Object} props
 * @param {any} props.children The children of the element
 * @returns Element
 */

const NavigationLabel = ({ children }: any) => {
  return (
    <div className="flex items-center pt-4 pb-2">
      <div className="flex justify-start px-8 items-center text-slate-600 dark:text-slate-400 text-sm leading-[14px] tracking-widest opacity-80">
        {children}
      </div>
      <Separator />
    </div>
  );
};

export default NavigationLabel;
