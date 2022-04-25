interface LoadingProps {
  color?: string;
}

/**
 * Loading Params
 * @param {Object} props
 * @param {string} props.color The color of the loading svg element
 * @returns Element
 */

const Loading = ({ color }: LoadingProps) => {
  return (
    <svg
      className="animate-spin w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={color ? color : "white"}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export default Loading;
