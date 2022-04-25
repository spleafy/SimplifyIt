import { useState } from "react";
import { useSelector } from "react-redux";
import { Plus, X } from "phosphor-react";
import { useForm } from "react-hook-form";
// Components
import Card from "../components/Card";
import Column from "../components/Column";
import TextFormField from "../components/form/TextFormField";
import Form from "../components/form/Form";
import PopUp from "../components/PopUp";
import Separator from "../components/Separator";
// Utils
import { getColors } from "../utils/utils";

const PeoplePage = () => {
  /**
   * Logged user state
   * @description Getting the logged user state from the
   */
  const loggedUser = useSelector((state: any) => state.user.user);

  /**
   * Expanded add panel state
   * @description Creating a useState variable, so we can toggle the add people panel
   */
  const [expandedAddPanel, setExpandedAddPanel] = useState(false);

  /**
   * useForm deconstruction
   * @description Deconstructing the useForm hook
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  return (
    <>
      <Column>
        <div className="flex flex-wrap gap-5">
          <Card width="200px" height="250px">
            <div className="relative w-full h-full">
              <div
                className="absolute w-full h-full flex justify-center items-center opacity-80 bg-gradient-to-t from-black/50 to-transparent cursor-pointer"
                style={{
                  backgroundColor: getColors(
                    loggedUser.settings.profileColor
                  )[500],
                }}
              >
                <h1 className="text-white select-none">
                  {loggedUser.fullname.split(" ")[0].charAt(0)}
                  {loggedUser.fullname.split(" ")[1].charAt(0)}
                </h1>
              </div>
              <div className="px-3 py-1 absolute right-3 top-3 bg-slate-900/20 rounded-md text-white text-sm">
                You
              </div>
              <div className="px-5 py-3 absolute bottom-0">
                <h1 className="text-white">{loggedUser.username}</h1>
              </div>
            </div>
          </Card>
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
              <span>Add people</span>
            </div>
          </Card>
        </div>
      </Column>
      {expandedAddPanel ? (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-900/30">
          <div className="w-[600px]">
            <PopUp width="600px">
              <div className="flex w-full justify-between items-center text-xl">
                <h1>Add people</h1>
                <X
                  className="cursor-pointer"
                  onClick={() => {
                    setExpandedAddPanel(false);
                  }}
                />
              </div>
              <Separator />
              <div className="mb-10"></div>
              <Form
                submit={handleSubmit((values) => {
                  console.log(values);
                })}
              >
                <TextFormField
                  name="name"
                  label="Challange name:"
                  placeholder="Enter challange name:"
                  register={register}
                  error={errors.name}
                />
              </Form>
            </PopUp>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PeoplePage;
