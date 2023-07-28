import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Triangle, Square, Circle } from "phosphor-react";
import {
  Backdrop,
  PopUp,
  Form,
  TextField,
  SelectField,
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
  const [shown, setShown] = useState(false);

  const [id, setId] = useState("");

  document.addEventListener(events.task, (e: any) => {
    setShown(true);
    if (e.detail.id) {
      setId(e.detail.id);
    }
  });

  const colors: any = getColors();

  const projects = useSelector((state: any) => state.projects.projects);

  const close = () => {
    setId("");
    setShown(false);
  };

  const submit = async (v: any) => {
    const response = await api.tasks.create(v);

    if (response.status === "SUCCESS" && response.data.tasks) {
      store.dispatch(tasks.actions.add(response.data.tasks));
      // navigate("/app/tasks/" + response.data.tasks._id);
    }

    close();
  };

  return (
    <>
      {shown && (
        <Backdrop>
          <PopUp header={<h1>Create Task</h1>} setShown={close} width="500px">
            <Form
              submit={submit}
              initial={{
                name: `Simple Task`,
                settings: {
                  color: colors["slate"][500],
                  shape: "star",
                },
              }}
            >
              {id ? (
                <div className="hidden">
                  <TextField
                    name="projectId"
                    placeholder=""
                    label=""
                    value={id}
                  />
                </div>
              ) : (
                <SelectField
                  name="projectId"
                  placeholder="Choose project:"
                  label="Choose project:"
                  options={projects.map((project: any) => {
                    return {
                      element: (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 aspect-square rounded-sm"
                            style={{ backgroundColor: project.settings.color }}
                          ></div>
                          <span className="text-sm">{project.name}</span>
                        </div>
                      ),
                      value: project._id,
                    };
                  })}
                  validators={{
                    required: (v: string) => V.required(v),
                  }}
                />
              )}
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
                label="Task shape:"
                variant="filled"
                options={[
                  { element: <Star size={20} />, value: "star" },
                  { element: <Triangle size={20} />, value: "triangle" },
                  { element: <Square size={20} />, value: "square" },
                  { element: <Circle size={20} />, value: "circle" },
                ]}
                validators={{ required: (v: string) => V.required(v) }}
                className="!bg-transparent"
                border
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
