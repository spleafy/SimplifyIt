import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Triangle, Square, Circle } from "phosphor-react";
import {
  Backdrop,
  PopUp,
  Form,
  TextField,
  ToggleBar,
  Button,
  validators as V,
} from "@prismane/core";
// API
import api from "../../api";
// Utils
import { events, getColors } from "../../utils/utils";
// Redux
import store from "../../redux/store";
import { slice as tasks } from "../../redux/tasks";
import { useSelector } from "react-redux";

const TasksActions = () => {
  const navigate = useNavigate();

  const [shown, setShown] = useState(false);

  const [id, setId] = useState("");

  document.addEventListener(events.task, (e: any) => {
    setShown(true);
    setId(e.detail.id);
  });

  const project = useSelector((state: any) => state.projects.projects).filter(
    (p: any) => p._id === id
  )[0];

  const colors: any = getColors();

  const submit = async (v: any) => {
    v.projectId = id;

    const response = await api.tasks.create(v);

    if (response.status === "SUCCESS") {
      store.dispatch(tasks.actions.add([response.data.tasks]));
      // navigate("/app/tasks/" + response.data.tasks._id);
    }

    setShown(false);
  };

  return (
    <>
      {shown && (
        <Backdrop>
          <PopUp
            header={<h1>Create Task</h1>}
            setShown={setShown}
            width="500px"
          >
            <Form
              submit={submit}
              initial={{
                name: `${project.name}'s Task`,
                settings: {
                  color: project.settings.color,
                  shape: project.settings.shape,
                },
              }}
            >
              <TextField
                name="name"
                placeholder="Enter task name:"
                label="Task name:"
                validators={{
                  required: (v: string) => V.required(v),
                  min: (v: string) => V.min(v, 4, "Task's name"),
                }}
              />
              <TextField
                name="description"
                placeholder="Enter task description:"
                label="Task description:"
                validators={{
                  required: (v: string) => V.required(v),
                }}
              />
              <ToggleBar
                name="settings.color"
                label="Task color:"
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
              />
              <ToggleBar
                name="settings.shape"
                label="Task shape:"
                options={[
                  { element: <Star size={20} />, value: "star" },
                  { element: <Triangle size={20} />, value: "triangle" },
                  { element: <Square size={20} />, value: "square" },
                  { element: <Circle size={20} />, value: "circle" },
                ]}
                validators={{ required: (v: string) => V.required(v) }}
              />
              <Button variant="primary" className="mt-10" submit>
                Create task
              </Button>
            </Form>
          </PopUp>
        </Backdrop>
      )}
    </>
  );
};

export default TasksActions;
