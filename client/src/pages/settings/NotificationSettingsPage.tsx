import { useState, FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { Check } from "phosphor-react";
// Components
import Card from "../../components/basic/Card";
import Separator from "../../components/basic/Separator";
import ToggleSwitch from "../../components/form/ToggleSwitch";
import Button from "../../components/basic/Button";
// Redux
import { updateUser } from "../../redux/userSlice";
// Utils
import { submitForm } from "../../utils/form";
import { addSuccess } from "../../utils/utils";

const NotificationSettingsPage: FC = () => {
  /**
   * Dispatch function
   * @description Creating a dispatch method from the useDispatch hook, so we can update the redux store
   */
  const dispatch = useDispatch();

  /**
   * Logged user state
   * @description Getting the logged user from the redux store
   */
  const loggedUser = useSelector((state: RootStateOrAny) => state.user.user);

  /**
   * Default Values Settings
   * @description Creating a default values object, so if anything is changed from the original settings on page load, we will display a save changes button and so we can fill the fields with the information they have
   */
  const defaultValues = {
    notificationFriendRequest: loggedUser.settings.notification
      ? loggedUser.settings.notification.friendRequest
      : false,
    notificationPost: loggedUser.settings.notification
      ? loggedUser.settings.notification.post
      : false,
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
  const submit = async (values: FieldValues) => {
    // Set the submit form state to true, so we can display a loading animation
    setSubmittingForm(true);
    // Await the response
    const response = await submitForm(
      values,
      "user/settings/account",
      localStorage.getItem("X-Auth-Token"),
      "PUT"
    );
    // Checking if the status is 200, then we update the user settings, if not - display an error message
    if (response.status === 200) {
      dispatch(updateUser(response.data.user));
      addSuccess("settings");
      setSavedUpdate(true);
    }
    setSubmittingForm(false);
  };

  return (
    <div className="w-full flex justify-center">
      <Card className="p-8 mb-8" width="100%">
        <form
          onSubmit={handleSubmit(submit)}
          onChange={() => {
            setSavedUpdate(
              JSON.stringify(getValues()) === JSON.stringify(defaultValues)
            );
          }}
        >
          <div className="flex justify-between items-center">
            <h1 className="self-end">Notifications</h1>
            <div className="w-fit">
              {savedUpdate ? (
                <div
                  className="w-[42px] h-[42px] aspect-square bg-theme-400 dark:bg-theme-600 rounded-full flex justify-center items-center text-white cursor-pointer tooltip"
                  data-tooltip="Saved"
                >
                  <Check />
                </div>
              ) : (
                <Button variant="primary" submit loading={submittingForm}>
                  Save
                </Button>
              )}
            </div>
          </div>
          <Separator />
          <div className="mt-10 flex flex-col gap-5">
            <div className="flex w-full justify-between items-center">
              <div className="flex flex-col gap-2">
                <h4>Post notification</h4>
                <span className="subtitle">
                  Receive a notification, everytime one of your friends posts.
                </span>
              </div>
              <ToggleSwitch
                name="notificationPost"
                register={register}
                getValues={getValues}
              />
            </div>
            <div className="flex w-full justify-between items-center">
              <div className="flex flex-col gap-2">
                <h4>Friend request notification</h4>
                <span className="subtitle">
                  Receive a notification, everytime someone sends you a friend
                  request.
                </span>
              </div>
              <ToggleSwitch
                name="notificationFriendRequest"
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

export default NotificationSettingsPage;
