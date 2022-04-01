// Components
import Column from "../components/Column";

const DiscoverPage = () => {
  document.title = `Discover / ${process.env.REACT_APP_TITLE}`;

  return (
    <>
      <Column width="full">
        <h1>Discover</h1>
      </Column>
    </>
  );
};

export default DiscoverPage;
