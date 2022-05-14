import { useState, FC } from "react";
import { Check, X } from "phosphor-react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
// Components
import TextFormField from "../../components/form/TextFormField";
import Button from "../../components/basic/Button";
import ToggleSwitch from "../../components/form/ToggleSwitch";
import Separator from "../../components/basic/Separator";
import Card from "../../components/basic/Card";
// Redux
import { updateUser } from "../../redux/userSlice";
// Utils
import { submitForm } from "../../utils/form";
import {
  validateRequired,
  validateMin,
  validateURLRegex,
  validateUsernameRegex,
  validateUsernameBackend,
  validateEmailRegex,
  validateEmailBackend,
} from "../../utils/validators";
import { getColors, addSuccess } from "../../utils/utils";

const AccountSettingsPage: FC = () => {
  /**
   * Logged user state
   * @description Getting the logged user from the redux store
   */
  const loggedUser = useSelector((state: any) => state.user.user);

  /**
   * Dispatch function
   * @description Creating a dispatch method from the useDispatch hook, so we can update the redux store
   */
  const dispatch = useDispatch();

  /**
   * Expanded profile color state
   * @description Creating a useState variable, so we can toggle the expansion of the menu
   */
  const [expandedProfileColor, setExpandedProfileColor] = useState(false);

  /**
   * Submiting form state
   * @description Creating a useState variable, so we can toggle the styling for the button when submitting the form
   */
  const [submittingForm, setSubmittingForm] = useState(false);

  /**
   * Default Values Settings
   * @description Creating a default values object, so if anything is changed from the original settings on page load, we will display a save changes button and so we can fill the fields with the information they have
   */
  const defaultValuesSettings = {
    fullname: loggedUser.fullname,
    username: loggedUser.username,
    email: loggedUser.email.toLowerCase(),
    themeColor: loggedUser.settings.themeColor,
    darkTheme: loggedUser.settings.darkTheme,
    profileColor: loggedUser.settings.profileColor,
    jobtitle: loggedUser.jobtitle,
    website: loggedUser.website,
    location: loggedUser.location,
  };

  /**
   * Creating a default values for the reset password field
   */
  const defaultValuesReset = {
    password: "",
    newpassword: "",
    confirmnewpassword: "",
  };

  /**
   * useForm hook deconstruction
   * @description Deconstructing the useForm hook
   */
  const {
    register: registerSettings,
    handleSubmit: handleSubmitSettings,
    setValue: setValueSettings,
    getValues: getValuesSettings,
    reset: resetSettings,
    formState: { errors: errorsSettings },
  } = useForm({
    mode: "all",
    defaultValues: defaultValuesSettings,
  });

  /**
   * useForm hook deconstruction
   * @description Deconstructing the useForm hook
   */
  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: errorsReset },
  } = useForm({
    mode: "all",
    defaultValues: defaultValuesReset,
  });

  /**
   * Saved update state
   * @description Creating a useState variable, so we can toggle between the saved and not saved state and display a "save" button or a "saved" button
   */
  const [savedUpdate, setSavedUpdate] = useState(
    JSON.stringify(getValuesSettings()) ===
      JSON.stringify(defaultValuesSettings)
  );

  /**
   * Submit function for the settings
   * @description Creating a submit function for the form element
   */
  const submitSettings = async (values: any) => {
    // Checking if the values are different from the default values, so we don't submit the same data
    if (JSON.stringify(values) !== JSON.stringify(defaultValuesSettings)) {
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
        addSuccess("settings");
        dispatch(updateUser(response.data.user));
        setSavedUpdate(true);
      }
      setSubmittingForm(false);
    } else {
      setSubmittingForm(false);
    }
  };

  /**
   * Tailwind colors
   * @constant
   * @description Get all colors from the custom getColors method in utils/utils.ts
   */
  const colors = getColors("all");

  return (
    <div className="w-full flex justify-center">
      <Card className="mb-20 p-8" width="100%">
        <form
          onSubmit={handleSubmitSettings(submitSettings)}
          onChange={() => {
            setSavedUpdate(
              JSON.stringify(getValuesSettings()) ===
                JSON.stringify(defaultValuesSettings)
            );
          }}
        >
          <div className="flex w-full justify-between items-center">
            <h1 className="self-end">My Account</h1>
            <div className="w-fit">
              {savedUpdate ? (
                <div
                  className="w-[40px] h-[40px] aspect-square bg-theme-500 rounded-full flex justify-center items-center text-white cursor-pointer tooltip"
                  data-tooltip="Saved"
                >
                  <Check />
                </div>
              ) : (
                <Button
                  variant="primary"
                  submit={true}
                  loading={submittingForm}
                >
                  Save
                </Button>
              )}
            </div>
          </div>
          <Separator />
          <div className="flex gap-10 mt-10">
            <div
              className={`w-[125px] h-[125px] aspect-square rounded-full flex justify-center items-center relative overflow-hidden select-none`}
              style={{
                backgroundColor: loggedUser.settings
                  ? getColors(getValuesSettings().profileColor)[500]
                  : "#f3f3f3",
              }}
            >
              <div
                className="absolute w-full h-full transition-colors hover:bg-slate-900/30 cursor-pointer"
                onClick={() => {
                  setExpandedProfileColor(true);
                }}
              ></div>
              {loggedUser.fullname ? (
                <h1 className="text-white">
                  {loggedUser.fullname.split(" ")[0].charAt(0)}
                  {loggedUser.fullname.split(" ")[1].charAt(0)}
                </h1>
              ) : (
                <></>
              )}
            </div>
            {expandedProfileColor ? (
              <>
                <div className="absolute w-full h-full bg-slate-900/30 top-0 left-0 flex justify-center items-center z-10">
                  <Card variant="popup" width="480px">
                    <div className="flex flex-col p-5">
                      <X
                        size={20}
                        className="absolute right-[10px] top-[10px] cursor-pointer"
                        onClick={() => {
                          setExpandedProfileColor(false);
                        }}
                      />
                      <h1>Profile Color</h1>
                      <div className="flex flex-wrap gap-5 mt-5">
                        {Object.keys(colors).map((key: string, index: number) =>
                          colors[key][500] ? (
                            <div
                              className={`w-10 aspect-square rounded-full transition-all cursor-pointer flex justify-center items-center text-white hover:rounded-md`}
                              style={{ backgroundColor: colors[key][500] }}
                              onClick={() => {
                                setValueSettings("profileColor", key);
                                resetSettings(getValuesSettings());
                                setSavedUpdate(false);
                              }}
                              key={index}
                            >
                              {key === getValuesSettings().profileColor ? (
                                <div className="w-1 aspect-square rounded-full bg-white"></div>
                              ) : (
                                <></>
                              )}
                            </div>
                          ) : (
                            <div className="hidden" key={index}></div>
                          )
                        )}
                      </div>
                      <div className="flex justify-center gap-5 items-center my-5">
                        <Separator />
                        <h2>OR</h2>
                        <Separator />
                      </div>
                      <Button variant="primary">Choose File</Button>
                      <input
                        type="text"
                        className="hidden"
                        {...registerSettings("profileColor")}
                      />
                    </div>
                  </Card>
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="flex gap-5">
              <div className="w-[300px] flex flex-col gap-3">
                <TextFormField
                  name="fullname"
                  label="Full Name:"
                  placeholder="Enter new full name:"
                  register={registerSettings}
                  error={errorsSettings.fullname}
                  className="mb-2"
                  validators={{
                    required: (v: any) => validateRequired(v),
                  }}
                />
                <TextFormField
                  name="username"
                  label="Username:"
                  placeholder="Enter new username:"
                  register={registerSettings}
                  error={errorsSettings.username}
                  className="mb-2"
                  validators={{
                    required: (v: any) => validateRequired(v),
                    min: (v: any) => validateMin(v, 4, "Username"),
                    regex: (v: any) => validateUsernameRegex(v),
                    backend: async (v: any) => {
                      if (v === loggedUser.username) {
                        return;
                      }
                      const response = await validateUsernameBackend(v, false);
                      return response;
                    },
                  }}
                />
                <TextFormField
                  name="email"
                  label="Email:"
                  placeholder="Enter new email:"
                  register={registerSettings}
                  error={errorsSettings.email}
                  className="mb-2"
                  validators={{
                    required: (v: any) => validateRequired(v),
                    regex: (v: any) => validateEmailRegex(v),
                    backend: async (v: any) => {
                      if (v === loggedUser.email) {
                        return;
                      }
                      const response = await validateEmailBackend(v, false);
                      return response;
                    },
                  }}
                />
              </div>
              <div className="w-[300px] flex flex-col gap-3">
                <TextFormField
                  name="jobtitle"
                  label="Job Title:"
                  placeholder="Enter your job title:"
                  register={registerSettings}
                  error={errorsSettings.jobtitle}
                  className="mb-2"
                />
                <TextFormField
                  name="website"
                  label="Website:"
                  placeholder="Enter a wesite:"
                  register={registerSettings}
                  error={errorsSettings.website}
                  className="mb-2"
                  validators={{ regex: (v: string) => validateURLRegex(v) }}
                />
                <TextFormField
                  name="location"
                  label="Location:"
                  placeholder="Enter your location:"
                  register={registerSettings}
                  error={errorsSettings.location}
                  className="mb-2"
                />
              </div>
            </div>
          </div>
          <h1 className="mt-[60px]">Theme Color</h1>
          <Separator />
          <div className="mt-10 flex flex-wrap gap-5">
            {Object.keys(colors).map((key: string, index: number) =>
              colors[key][500] ? (
                <div
                  className="w-[60px] aspect-square flex justify-center items-center"
                  key={index}
                >
                  <div
                    className={`w-10 aspect-square rounded-full cursor-pointer  transition-transform flex justify-center items-center text-white ${
                      colors[getValuesSettings().themeColor][500] ===
                      colors[key][500]
                        ? "scale-150 hover:scale-150"
                        : "hover:scale-125"
                    }`}
                    style={{ backgroundColor: colors[key][500] }}
                    onClick={async () => {
                      setValueSettings("themeColor", key);
                      resetSettings(getValuesSettings());
                      setSavedUpdate(false);
                    }}
                  >
                    {colors[getValuesSettings().themeColor][500] ===
                    colors[key][500] ? (
                      <Check />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ) : (
                <div className="hidden" key={index}></div>
              )
            )}
            <input
              type="text"
              className="hidden"
              id="themeColor"
              {...registerSettings("themeColor")}
            />
          </div>
          <h1 className="mt-[60px] relative w-fit">Preferences</h1>
          <Separator />
          <div className="mt-10 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h4>Dark Mode</h4>
                <span className="subtitle">
                  Enjoy the dark appearance of SimplifyIt.
                </span>
              </div>
              <ToggleSwitch
                name="darkTheme"
                register={registerSettings}
                getValues={getValuesSettings}
              />
            </div>
          </div>
        </form>
        <h1 className="mt-[60px]">Reset Password</h1>
        <Separator />
        <form
          onSubmit={handleSubmitReset((values) => {
            console.log(values);
          })}
          className="mt-10 w-[300px]"
        >
          <TextFormField
            name="password"
            label="Current password:"
            placeholder="Enter current password:"
            register={registerReset}
            error={errorsReset.password}
            className="mb-2"
            validators={{
              required: (v: any) => validateRequired(v),
            }}
          />
          <TextFormField
            name="newpassword"
            label="New pasword:"
            placeholder="Enter new password:"
            register={registerReset}
            error={errorsReset.newpassword}
            className="mb-2"
            validators={{
              required: (v: any) => validateRequired(v),
            }}
          />
          <TextFormField
            name="confirmnewpassword"
            label="Password confirmation:"
            placeholder="Confirm new password:"
            register={registerReset}
            error={errorsReset.confirmnewpassword}
            className="mb-2"
            validators={{
              required: (v: any) => validateRequired(v),
            }}
          />
          <Button variant="primary" submit={true}>
            Reset Password
          </Button>
        </form>
        <h1 className="mt-[60px]">Delete account</h1>
        <Separator />
        <div className="mt-10 flex gap-5 flex-col">
          <span>
            Deleting your account will result in your data being removed.
          </span>
          <div className="w-fit">
            <Button variant="secondary" color="error">
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountSettingsPage;
