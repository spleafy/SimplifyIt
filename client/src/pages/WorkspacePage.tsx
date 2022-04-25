// Components
import Column from "../components/Column";

const WorkspacePage = () => {
  /**
   * Document title
   * @description Updating the document title
   */
  document.title = `Workspace / ${process.env.REACT_APP_TITLE}`;

  return (
    <>
      <Column width="full">
        <h1>Workspaces</h1>
      </Column>
    </>
  );
};

export default WorkspacePage;
