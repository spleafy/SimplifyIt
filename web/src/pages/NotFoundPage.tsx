import { FC } from "react";
// Layouts
import SitPage from "../layouts/SitPage";
// Components
import SitLink from "../components/basic/SitLink";

interface NotFoundPageProps {
  to: string;
  name: string;
}

const NotFoundPage: FC<NotFoundPageProps> = ({ to, name }) => {
  return (
    <SitPage
      className="flex flex-col justify-center items-center"
      animationIn="animate-fade-in"
      title="Not Found"
    >
      <h1 className="text-9xl text-primary-500 mb-5 font-['Satoshi_Bold']">
        404
      </h1>
      <span>
        Couldn't find the resource you were looking for! Try heading to{" "}
        <SitLink to={to}>{name}</SitLink>?
      </span>
    </SitPage>
  );
};

export default NotFoundPage;
