import { FC, Dispatch, useEffect } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Check } from "phosphor-react";
// Components
import ProfilePicture from "./basic/ProfilePicture";
import Card from "./basic/Card";
import OutsideEventHandler from "./OutsideEventHandler";
// Utils
import {
  updateAllWorkspaces,
  changeActiveWorkspaceAndUpdate,
} from "../utils/user";
import { WorkspaceType } from "../utils/types";

interface WorkspacesPanelProps {
  setShown: Dispatch<boolean>;
  shown: boolean;
}
const WorkspacesPanel: FC<WorkspacesPanelProps> = ({ setShown, shown }) => {
  useEffect(() => {
    const effect = async () => {
      await updateAllWorkspaces();
    };

    if (shown === true) {
      effect();
    }
  }, [shown]);

  const workspaces = useSelector(
    (state: RootStateOrAny) => state.workspace.workspaces
  );

  const activeWorkspace: WorkspaceType = useSelector(
    (state: RootStateOrAny) => state.workspace.active
  );

  return (
    <OutsideEventHandler
      onEvent={() => {
        setShown(false);
      }}
    >
      <Card
        className={shown ? "right-0" : "-right-[400px]"}
        variant="panel"
        heading="Workspaces"
        setShown={setShown}
      >
        <div className="flex flex-col gap-2">
          {workspaces.map((workspace: WorkspaceType, index: number) => (
            <div
              className={`flex items-center justify-between mt-2 py-2 cursor-pointer`}
              key={index}
              onClick={async () => {
                await changeActiveWorkspaceAndUpdate(workspace._id);
                setShown(false);
              }}
            >
              <div className="flex items-center gap-5">
                <ProfilePicture
                  color={workspace.settings.workspaceColor}
                  name={workspace.name}
                  size="xs"
                />
                <span className="max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap transition-colors">
                  {workspace.name}
                </span>
              </div>
              {workspace._id === activeWorkspace._id ? (
                <Check
                  size={20}
                  className="text-theme-500 dark:text-theme-300"
                />
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </Card>
    </OutsideEventHandler>
  );
};

export default WorkspacesPanel;
