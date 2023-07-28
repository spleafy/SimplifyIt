import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Star, Triangle, Square, Circle } from "phosphor-react";
import {
  Backdrop,
  PopUp,
  Form,
  TextField,
  Button,
  ToggleBar,
  Separator,
  validators as V,
} from "@prismane/core";
// API
import api from "../../api";
// Utils
import { events, getColors } from "../../utils/utils";
// Redux
import store from "../../redux/store";
import { slice as projects } from "../../redux/projects";
import { schedule } from "../../redux/schedule";

const Create = () => {
  const navigate = useNavigate();

  const [shown, setShown] = useState(false);

  document.addEventListener(events.project.create, (e: any) => {
    setShown(true);
  });

  const user = useSelector((state: any) => state.user.user);

  const colors: any = getColors();

  const submit = async (v: any) => {
    const response = await api.projects.create(v);

    if (response.status === "SUCCESS") {
      store.dispatch(projects.actions.add(response.data.projects));
      navigate("/app/projects/" + response.data.projects._id);
    }

    setShown(false);
  };

  return (
    <>
      {shown && (
        <Backdrop>
          <PopUp
            header={<h1>Create a project</h1>}
            setShown={setShown}
            width="500px"
          >
            <Form
              submit={submit}
              initial={{
                name: `${user.fullname}'s Project`,
                settings: {
                  color: colors["slate"][500],
                  shape: "star",
                },
              }}
            >
              <TextField
                name="name"
                placeholder="Enter project name:"
                label="Project name:"
                validators={{
                  required: (v: string) => V.required(v),
                  min: (v: string) => V.min(v, 4, "Task's name"),
                }}
              />
              <ToggleBar
                name="settings.color"
                label="Project color:"
                variant="filled"
                options={Object.keys(colors).map(
                  (key: string, index: number) => {
                    return {
                      element: (
                        <div className="flex w-6 h-6 justify-center items-center">
                          <div
                            className="flex w-4 h-4 aspect-square rounded-full border-[2px] border-white"
                            style={{ backgroundColor: colors[key][500] }}
                            key={index}
                          ></div>
                        </div>
                      ),
                      value: colors[key][500],
                    };
                  }
                )}
                validators={{
                  required: (v: string) => V.required(v),
                }}
                className="!bg-transparent"
                border
              />
              <ToggleBar
                name="settings.shape"
                label="Project shape:"
                variant="filled"
                options={[
                  { element: <Star size={20} />, value: "star" },
                  { element: <Triangle size={20} />, value: "triangle" },
                  { element: <Square size={20} />, value: "square" },
                  { element: <Circle size={20} />, value: "circle" },
                ]}
                validators={{
                  required: (v: string) => V.required(v),
                }}
                className="!bg-transparent"
                border
              />
              <Button variant="primary" className="mt-10" submit>
                Create project
              </Button>
            </Form>
          </PopUp>
        </Backdrop>
      )}
    </>
  );
};

const Update = () => {
  const navigate = useNavigate();

  const [shown, setShown] = useState(false);

  const [id, setId] = useState("");

  document.addEventListener(events.project.update, (e: any) => {
    setId(e.detail.id);
    setShown(true);
  });

  const colors: any = getColors();

  const project = useSelector((state: any) => state.projects.projects).filter(
    (p: any) => p._id === id
  )[0];

  const submit = async (v: any) => {
    const response = await api.projects.update(v, id as string);

    if (response.status === "SUCCESS" && response.data.projects) {
      store.dispatch(projects.actions.remove(id));
      store.dispatch(projects.actions.add(response.data.projects));
    }

    setShown(false);
  };

  const remove = async () => {
    const response = await api.projects.remove(id as string);

    if (response.status === "SUCCESS") {
      schedule.projects.remove(id as string);
      navigate("/app/projects");
    }
  };

  return (
    <>
      {shown && (
        <Backdrop>
          <PopUp
            header={<h1>Project settings</h1>}
            setShown={setShown}
            width="500px"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <span className="text-xl font-semibold text-base-700">
                  Appearance
                </span>
                <Separator className="!my-0" />
              </div>
              <Form
                submit={submit}
                initial={{
                  name: project.name,
                  settings: project.settings,
                }}
              >
                <TextField
                  name="name"
                  placeholder="Enter project name:"
                  label="Project name:"
                  validators={{
                    required: (v: string) => V.required(v),
                    min: (v: string) => V.min(v, 4, "Task's name"),
                  }}
                />
                <ToggleBar
                  name="settings.color"
                  label="Project color:"
                  variant="filled"
                  options={Object.keys(colors).map(
                    (key: string, index: number) => {
                      return {
                        element: (
                          <div
                            className="flex w-4 h-4 aspect-square rounded-full border-[2px] border-white"
                            style={{ backgroundColor: colors[key][500] }}
                            key={index}
                          ></div>
                        ),
                        value: colors[key][500],
                      };
                    }
                  )}
                  validators={{
                    required: (v: string) => V.required(v),
                  }}
                  className="!bg-transparent"
                  border
                />
                <ToggleBar
                  name="settings.shape"
                  label="Project shape:"
                  variant="filled"
                  options={[
                    { element: <Star size={20} />, value: "star" },
                    { element: <Triangle size={20} />, value: "triangle" },
                    { element: <Square size={20} />, value: "square" },
                    { element: <Circle size={20} />, value: "circle" },
                  ]}
                  validators={{
                    required: (v: string) => V.required(v),
                  }}
                  className="!bg-transparent"
                  border
                />
                <Button variant="primary" submit full>
                  Update project
                </Button>
              </Form>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <span className="text-xl font-semibold text-base-700">
                  Delete
                </span>
                <Separator className="!my-0" />
              </div>
              <Button
                variant="tertiary"
                color="error"
                onClick={remove}
                fillOnHover
              >
                Delete
              </Button>
            </div>
          </PopUp>
        </Backdrop>
      )}
    </>
  );
};

const ProjectsActions = () => {
  return (
    <>
      <Create />
      <Update />
    </>
  );
};

export default ProjectsActions;
