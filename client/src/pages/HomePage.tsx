import { useNavigate } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// Components
import Column from "../components/Column";
import SecondaryButton from "../components/SecondaryButton";
// Utils

const HomePage = () => {
  document.title = `Home / ${process.env.REACT_APP_TITLE}`;

  const navigate = useNavigate();

  const loggedUser = useSelector((state: any) => state.user.user);

  return (
    <>
      <Column>
        <h1>Home</h1>
      </Column>
      <Column width="[400px]" minWidth="[400px]">
        <h1>Friends</h1>
        {loggedUser.friends && loggedUser.friends.length > 0 ? (
          <h1>Has Friends</h1>
        ) : (
          <div className="h-full flex flex-col justify-center items-center w-[90%] self-center">
            <span className="pb-2">Looks kind of lonely...</span>
            <div className="w-auto">
              <SecondaryButton
                click={() => {
                  navigate("/app/discover");
                }}
              >
                Discover More
              </SecondaryButton>
            </div>
          </div>
        )}
      </Column>
    </>
  );
};

export default HomePage;
