import { FC, useEffect, useState } from "react";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "phosphor-react";
// Components
import Card from "../../components/basic/Card";
// Utils
import { WorkspaceType } from "../../utils/types";
import { getColors } from "../../utils/utils";
import { updateAllWorkspaces } from "../../utils/user";
import { FieldValues, useForm } from "react-hook-form";
import Form from "../../components/form/Form";
import TextFormField from "../../components/form/TextFormField";
import Button from "../../components/basic/Button";
import ColorPicker from "../../components/form/ColorPicker";
import OutsideEventHandler from "../../components/OutsideEventHandler";
// Utils
import { validateRequired } from "../../utils/validators";
import { submitForm } from "../../utils/form";
// Redux
import { updateUser } from "../../redux/userSlice";
import { pushWorkspace } from "../../redux/workspaceSlice";

const WorkspacesOverviewPage: FC = () => {
  /**
   * Document title
   * @description Updating the document title
   */
  document.title = `Workspace / ${process.env.REACT_APP_TITLE}`;

  const navigate = useNavigate();

  useEffect(() => {
    const effect = async () => {
      await updateAllWorkspaces();
    };

    effect();
  }, []);

  /**
   * Dispatch method
   * @description Crating a dispatch method from the useDispatch hook, so we can update the redux store
   */
  const dispatch = useDispatch();

  /**
   * useForm deconstruction
   * @description Deconstructing the useForm hook
   */
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const workspaces = useSelector(
    (state: RootStateOrAny) => state.workspace.workspaces
  );

  const loggedUser = useSelector((state: RootStateOrAny) => state.user.user);

  useEffect(() => {
    reset({
      name: loggedUser.username ? `${loggedUser.username}'s workspace` : "",
      color: "slate",
    });
    console.log("called");
  }, [loggedUser, reset]);

  /**
   * Submit method
   * @description Creating a submit method for the form onSubmit method
   */
  const submit = async (values: FieldValues) => {
    // Getting the token from the local storage
    const token = localStorage.getItem("X-Auth-Token");

    // Submitting the form and awaiting the response
    const response = await submitForm(values, "workspace", token);

    // If the response is 200, update the user and update the workspace in the redux store, then navigate the user to the home page of the app
    if (response.status === 200) {
      dispatch(updateUser(response.data.user));
      dispatch(pushWorkspace(response.data.workspace));
      setExpandedCreatePanel(false);
    }
  };

  const [expandedCreatePanel, setExpandedCreatePanel] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-5">
        {workspaces ? (
          workspaces.map((workspace: WorkspaceType, index: number) => (
            <Card width="200px" height="250px" key={index}>
              <div
                className="relative w-full h-full cursor-pointer"
                onClick={() => {
                  navigate(`/app/workspaces/${workspace._id}`);
                }}
              >
                <div
                  className="absolute w-full h-full flex justify-center items-center opacity-80 bg-gradient-to-t from-black/50 to-transparent cursor-pointer"
                  style={{
                    backgroundColor: getColors(
                      workspace.settings.workspaceColor
                    )[500],
                  }}
                >
                  <h1 className="text-white select-none">
                    {workspace.name.split(" ")[0]
                      ? workspace.name.split(" ")[0].charAt(0).toUpperCase()
                      : ""}
                    {workspace.name.split(" ")[1]
                      ? workspace.name.split(" ")[1].charAt(0).toUpperCase()
                      : ""}
                  </h1>
                </div>
                {/* <div className="px-3 py-1 absolute right-3 top-3 bg-slate-900/20 rounded-lg text-white text-sm">
                  You
                </div> */}
                <div className="px-5 py-3 absolute bottom-0">
                  <h1 className="text-white line-clamp-2">{workspace.name}</h1>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <></>
        )}
        <Card width="200px" height="250px">
          <div
            className="px-5 py-3 w-full h-full flex flex-col justify-center items-center cursor-pointer"
            onClick={() => {
              setExpandedCreatePanel(true);
            }}
          >
            <div className="border-dotted border-2 border-slate-700 p-3 rounded-full mb-5">
              <Plus />
            </div>
            <span>Create workspace</span>
          </div>
        </Card>
      </div>
      {expandedCreatePanel ? (
        <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-gray-900/50">
          <OutsideEventHandler
            onEvent={() => {
              setExpandedCreatePanel(false);
            }}
          >
            <Card
              variant="popup"
              heading="Let's setup your workspace"
              width="480px"
            >
              <Form submit={handleSubmit(submit)}>
                <TextFormField
                  register={register}
                  label="Workspace name:"
                  name="name"
                  placeholder="Enter your workspace name:"
                  error={errors.name}
                  validators={{
                    required: (v: string) => validateRequired(v),
                  }}
                />
                <span className="mb-5 text-slate-700 text-sm flex items-center justify-between dark:text-slate-100">
                  Workspace color:
                </span>
                <div className="flex w-full flex-wrap gap-5 mb-8">
                  <ColorPicker
                    name="color"
                    register={register}
                    getValues={getValues}
                    setValue={setValue}
                    reset={reset}
                    variant="rounded"
                    animate="scale"
                    active="dot"
                    size="xs"
                  />
                </div>
                <Button variant="primary" submit full>
                  Create
                </Button>
              </Form>
            </Card>
          </OutsideEventHandler>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default WorkspacesOverviewPage;
