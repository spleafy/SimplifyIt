import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Star, Triangle, Square, Circle } from "phosphor-react";
import {
  Backdrop,
  PopUp,
  Form,
  TextField,
  ToggleBar,
  Button,
} from "@prismane/core";
// API
import api from "../../api";
// Utils
import { events, getColors } from "../../utils/utils";
// Redux
import store from "../../redux/store";
import { slice as projects } from "../../redux/projects";

const ProjectsActions = () => {
  const navigate = useNavigate();

  const [shown, setShown] = useState(false);

  document.addEventListener(events.project, () => {
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
            header={<h1>Create Project</h1>}
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
              />
              <ToggleBar
                name="settings.color"
                label="Project color:"
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
              />
              <ToggleBar
                name="settings.shape"
                label="Project shape:"
                options={[
                  { element: <Star size={20} />, value: "star" },
                  { element: <Triangle size={20} />, value: "triangle" },
                  { element: <Square size={20} />, value: "square" },
                  { element: <Circle size={20} />, value: "circle" },
                ]}
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

export default ProjectsActions;
