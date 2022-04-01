// Components
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  document.title = `Not Found / ${process.env.REACT_APP_TITLE}`;

  return (
    <div className="flex w-full h-full justify-center items-center flex-col">
      <h1>We couldn't find the resource you were looking for</h1>
      <span>
        Try heading to{" "}
        <Link to={"/app/home"} className="underline text-theme-500 font-bold">
          Home
        </Link>
      </span>
    </div>
  );
};

export default NotFoundPage;
