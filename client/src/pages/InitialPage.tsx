import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Components
import PopUp from "../components/PopUp";
import Form from "../components/Form";
import FormField from "../components/FormField";
import PrimaryButton from "../components/PrimaryButton";
// Utils
import { validateRequired } from "../utils/validators";
import { submitForm } from "../utils/form";
import { getColors } from "../utils/utils";
import { updateUserData } from "../utils/user";
import { authToken } from "../utils/api";
// Redux
import { updateUser } from "../redux/userSlice";
import { updateWorkspace } from "../redux/workspaceSlice";

const InitialSetupPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const submit = async (values: any) => {
    const token = localStorage.getItem("X-Auth-Token");

    const response = await submitForm(values, "workspace/create", token);

    if (response.status === 200) {
      dispatch(updateUser(response.data.user));
      dispatch(updateWorkspace(response.data.workspace));
      navigate("/app/home");
    }
  };

  const loggedUser = useSelector((state: any) => state.user.user);

  const [workspaceColor, setWorkspaceColor] = useState("slate");

  const colors = getColors("all");

  useEffect(() => {
    reset({
      name: loggedUser.username ? `${loggedUser.username}'s Workspace` : "",
      color: "slate",
    });
  }, [reset, loggedUser]);

  useEffect(() => {
    const effect = async () => {
      const response = await authToken();

      if (response.status !== 200) {
        navigate("/auth");
      } else {
        await updateUserData();
      }
    };

    effect();
  }, [navigate]);

  useEffect(() => {
    if (loggedUser.settings && loggedUser.settings.initialSetup) {
      navigate("/app/home");
    }
  }, [loggedUser, navigate]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <PopUp heading="Let's setup your workspace" width="480px">
        <Form submit={handleSubmit(submit)}>
          <FormField
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
            {Object.keys(colors).map((key: string, index: number) =>
              colors[key][500] ? (
                <div
                  className={`flex justify-center items-center w-[25px] h-[25px] aspect-square rounded-full cursor-pointer transition-all ${
                    workspaceColor === key ? "scale-150" : "hover:scale-125"
                  }`}
                  style={{ backgroundColor: colors[key][500] }}
                  key={index}
                  onClick={() => {
                    setValue("color", key);
                    setWorkspaceColor(key);
                  }}
                >
                  {workspaceColor === key ? (
                    <div className="flex w-1 h-1 aspect-square rounded-full bg-white"></div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <div className="hidden" key={index}></div>
              )
            )}
          </div>
          <input type="text" {...register("color")} className="hidden" />
          <PrimaryButton submit={true}>Create</PrimaryButton>
        </Form>
      </PopUp>
    </div>
  );
};

export default InitialSetupPage;
