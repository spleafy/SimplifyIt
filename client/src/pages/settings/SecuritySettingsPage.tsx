import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Check } from "phosphor-react";
// Components
import Card from "../../components/Card";
import Separator from "../../components/Separator";
import ToggleSwitch from "../../components/form/ToggleSwitch";
import PrimaryButton from "../../components/PrimaryButton";
// Redux
import { updateUser } from "../../redux/userSlice";
// Utils
import { submitForm } from "../../utils/form";
import { addSuccess } from "../../utils/utils";

const SecuritySettingsPage = () => {
  /**
   * Dispatch function
   * @description Creating a dispatch method from the useDispatch hook, so we can update the redux store
   */
  const dispatch = useDispatch();

  /**
   * Logged user state
   * @description Getting the logged user from the redux store
   */
  const loggedUser = useSelector((state: any) => state.user.user);

  /**
   * Default Values Settings
   * @description Creating a default values object, so if anything is changed from the original settings on page load, we will display a save changes button and so we can fill the fields with the information they have
   */
  const defaultValues = {
    twoFactor: loggedUser.settings.twoFactor,
  };

  /**
   * useForm hook deconstruction
   * @description Deconstructing the useForm hook
   */
  const { register, handleSubmit, getValues } = useForm({
    mode: "all",
    defaultValues,
  });

  /**
   * Submiting form state
   * @description Creating a useState variable, so we can toggle the styling for the button when submitting the form
   */
  const [submittingForm, setSubmittingForm] = useState(false);

  /**
   * Saved update state
   * @description Creating a useState variable, so we can toggle between the saved and not saved state and display a "save" button or a "saved" button
   */
  const [savedUpdate, setSavedUpdate] = useState(
    JSON.stringify(getValues()) === JSON.stringify(defaultValues)
  );

  /**
   * Submit function for the settings
   * @description Creating a submit function for the form element
   */
  const submit = async (values: any) => {
    // Set the submit form state to true, so we can display a loading animation
    setSubmittingForm(true);
    // Await the response
    const response = await submitForm(
      values,
      "user/settings/account",
      localStorage.getItem("X-Auth-Token")
    );
    // Checking if the status is 200, then we update the user settings, if not - display an error message
    if (response.status === 200) {
      addSuccess("settings");
      dispatch(updateUser(response.data.user));
      setSavedUpdate(true);
    }
    setSubmittingForm(false);
  };

  return (
    <div className="w-full flex justify-center">
      <Card className="mb-20 p-8" width="100%">
        <form
          onSubmit={handleSubmit(submit)}
          onChange={() => {
            setSavedUpdate(
              JSON.stringify(getValues()) === JSON.stringify(defaultValues)
            );
          }}
        >
          <div className="flex justify-between items-center">
            <h1 className="self-end">Security</h1>
            <div className="w-fit">
              {savedUpdate ? (
                <div
                  className="w-[40px] h-[40px] aspect-square bg-theme-500 rounded-full flex justify-center items-center text-white cursor-pointer tooltip"
                  data-tooltip="Saved"
                >
                  <Check />
                </div>
              ) : (
                <PrimaryButton submit={true} loading={submittingForm}>
                  Save
                </PrimaryButton>
              )}
            </div>
          </div>
          <Separator />
          <div className="mt-10 flex flex-col gap-5">
            <div className="flex w-full justify-between items-center">
              <div className="flex flex-col gap-2">
                <h4>Two-factor authentication</h4>
                <span className="subtitle">
                  Receive an email with a code each time you log in.
                </span>
              </div>
              <ToggleSwitch
                name="twoFactor"
                register={register}
                getValues={getValues}
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SecuritySettingsPage;