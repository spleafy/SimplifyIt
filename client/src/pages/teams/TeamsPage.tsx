import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { Plus, X } from "phosphor-react";
// Components
import Card from "../../components/basic/Card";
import Form from "../../components/form/Form";
import TextFormField from "../../components/form/TextFormField";
import Separator from "../../components/basic/Separator";
import Button from "../../components/basic/Button";
import ColorPicker from "../../components/form/ColorPicker";
// Utils
import { getColors } from "../../utils/utils";
import { submitForm } from "../../utils/form";
// Redux
import { pushTeam } from "../../redux/teamSlice";
import { TeamType } from "../../utils/types";

const TeamsPage: FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const teams = useSelector((state: RootStateOrAny) => state.teams.teams);

  /**
   * Expanded add panel state
   * @description Creating a useState variable, so we can toggle the add friends panel
   */
  const [expandedAddPanel, setExpandedAddPanel] = useState(false);

  const loggedUser = useSelector((state: RootStateOrAny) => state.user.user);

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
    defaultValues: {
      name: loggedUser.username + "'s team",
      users: loggedUser._id,
      color: "slate",
    },
  });

  const submit = async (values: FieldValues) => {
    const token = localStorage.getItem("X-Auth-Token");

    const response = await submitForm(values, "teams", token);

    console.log(response);

    if (response.status === 200) {
      dispatch(pushTeam(response.data.team));
      setExpandedAddPanel(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-5 h-full">
      {teams.map((team: TeamType, index: number) => (
        <Card width="200px" height="250px" key={index}>
          <div
            className="relative w-full h-full group"
            onClick={() => {
              navigate(`/app/teams/${team._id}`);
            }}
          >
            <div
              className="absolute w-full h-full flex justify-center items-center opacity-80 bg-gradient-to-t from-black/50 to-transparent cursor-pointer"
              style={{
                backgroundColor: getColors(team.settings.teamColor)[500],
              }}
            >
              <h1 className="text-white select-none">
                {team.name.split(" ")[0].charAt(0).toUpperCase()}
                {team.name.split(" ")[1].charAt(0).toUpperCase()}
              </h1>
            </div>
            <div className="px-5 py-3 absolute bottom-0 w-full">
              <h1 className="text-white">{team.name}</h1>
            </div>
          </div>
        </Card>
      ))}
      <Card width="200px" height="250px">
        <div
          className="px-5 py-3 w-full h-full flex flex-col justify-center items-center cursor-pointer"
          onClick={() => {
            setExpandedAddPanel(true);
          }}
        >
          <div className="border-dotted border-2 border-slate-700 p-3 rounded-full mb-5">
            <Plus />
          </div>
          <span>Create a team</span>
        </div>
      </Card>
      {expandedAddPanel ? (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-900/30">
          <div className="w-[600px]">
            <Card variant="popup" width="600px">
              <div className="flex w-full justify-between items-center text-xl">
                <h1>Create a team</h1>
                <X
                  className="cursor-pointer"
                  onClick={() => {
                    setExpandedAddPanel(false);
                  }}
                />
              </div>
              <Separator />
              <div className="mb-10"></div>
              <Form submit={handleSubmit(submit)}>
                <TextFormField
                  name="name"
                  label="Team name:"
                  placeholder="Enter team name:"
                  register={register}
                  error={errors.name}
                />
                <TextFormField
                  name="users"
                  label="Team users:"
                  placeholder="Enter users name:"
                  register={register}
                  error={errors.users}
                />
                <label
                  htmlFor=""
                  className="mb-2 text-slate-700 text-sm flex items-center justify-between dark:text-slate-100"
                >
                  Team color
                </label>
                <div className="flex w-full flex-wrap gap-5 mb-8">
                  <ColorPicker
                    register={register}
                    name="color"
                    getValues={getValues}
                    setValue={setValue}
                    reset={reset}
                    variant="rounded"
                    animate="scale"
                    active="dot"
                    size="sm"
                  />
                </div>
                <Button variant="primary" submit>
                  Create team
                </Button>
              </Form>
            </Card>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TeamsPage;
