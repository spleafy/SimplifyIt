import { useState, FC, useRef } from "react";
import { Check } from "phosphor-react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";
import Draggable from "react-draggable";
// Components
import TextFormField from "../../components/form/TextFormField";
import Button from "../../components/basic/Button";
import ToggleSwitch from "../../components/form/ToggleSwitch";
import Separator from "../../components/basic/Separator";
import Card from "../../components/basic/Card";
import ColorPicker from "../../components/form/ColorPicker";
import Initials from "../../components/basic/Initials";
import TransparentBackground from "../../components/basic/TransparentBackground";
// Redux
import { updateUser } from "../../redux/userSlice";
// Utils
import { submitForm } from "../../utils/form";
import { uploadUserProfilePictureAndUpdate } from "../../utils/user";
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
  const loggedUser = useSelector((state: RootStateOrAny) => state.user.user);

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

  const [expandedProfilePicture, setExpandedProfilePicture] = useState(false);

  const [profilePictureURL, setProfilePictureURL] = useState("");

  const fileInputRef: any = useRef(null);

  const targetRef: any = useRef(null);

  const canvasRef: any = useRef(null);

  const imageRef: any = useRef(null);

  const [imageWidth, setImageWidth] = useState(0);

  const parentSize = 300;

  const childSize = 200;

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
    themeColor: loggedUser.settings.profile.themeColor,
    darkTheme: loggedUser.settings.profile.darkTheme,
    profileColor: loggedUser.settings.profile.profileColor,
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
  const submitSettings = async (values: FieldValues) => {
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

  const uploadProfilePicture = async () => {
    const str = targetRef.current.style.transform
      .replace(/[a-zA-Z!@#$%^&*() ]/g, "")
      .split(",");

    const left = str[0] ? Number(str[0]) : 0;

    const top = str[1] ? Number(str[1]) : 0;

    const ctx = canvasRef.current.getContext("2d");

    console.log(top, left);

    ctx.drawImage(
      imageRef.current,
      (left - (parentSize - imageWidth) / 2) * 4,
      top * 4,
      childSize * 3.5,
      childSize * 3.5,
      0,
      0,
      childSize,
      childSize
    );

    const file = canvasRef.current.toDataURL();

    const response = await uploadUserProfilePictureAndUpdate(file);
    // Checking if the status is 200, then we update the user settings, if not - display an error message
    if (response.status === 200) {
      addSuccess("settings");
      dispatch(updateUser(response.data.user));
    }
  };

  return (
    <div className="w-full flex justify-center">
      <Card className="p-8 mb-8" width="100%">
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
          <div className="flex gap-10 mt-10">
            <div
              className={`w-[125px] h-[125px] aspect-square rounded-full flex justify-center items-center relative overflow-hidden select-none bg-no-repeat bg-cover`}
              style={{
                backgroundColor:
                  loggedUser.settings && !loggedUser.settings.profilePicture
                    ? getColors(getValuesSettings().profileColor)[500]
                    : "#f3f3f3",
                backgroundImage:
                  loggedUser.settings && !loggedUser.settings.profilePicture
                    ? `url(${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/files/${loggedUser._id}.png)`
                    : "",
              }}
            >
              <div
                className="absolute w-full h-full transition-colors hover:bg-slate-900/30 cursor-pointer"
                onClick={() => {
                  setExpandedProfileColor(true);
                }}
              ></div>
              {loggedUser.fullname &&
              !loggedUser.settings.profile.profilePicture ? (
                <h1 className="text-white">
                  <Initials text={loggedUser.fullname} />
                </h1>
              ) : (
                <></>
              )}
            </div>
            {expandedProfileColor ? (
              <TransparentBackground>
                <Card
                  variant="popup"
                  width="480px"
                  heading="Profile Color"
                  setShown={setExpandedProfileColor}
                >
                  <div className="flex flex-col p-5">
                    <div className="flex flex-wrap gap-5 mt-5">
                      <ColorPicker
                        register={registerSettings}
                        name="profileColor"
                        getValues={getValuesSettings}
                        setValue={setValueSettings}
                        reset={resetSettings}
                        variant="squared"
                        animate="border"
                        active="dot"
                        onClick={() => {
                          resetSettings(getValuesSettings());
                          setSavedUpdate(false);
                        }}
                      />
                    </div>
                    <div className="flex justify-center gap-5 items-center my-5">
                      <Separator />
                      <h2>OR</h2>
                      <Separator />
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setExpandedProfilePicture(true);
                        setExpandedProfileColor(false);
                      }}
                      full
                    >
                      Upload a profile picture
                    </Button>
                  </div>
                </Card>
              </TransparentBackground>
            ) : (
              <></>
            )}
            {expandedProfilePicture ? (
              <TransparentBackground>
                <Card
                  variant="popup"
                  width="480px"
                  heading="Profile Picture"
                  setShown={() => {
                    setExpandedProfilePicture(false);
                    setProfilePictureURL("");
                    setImageWidth(0);
                  }}
                >
                  <div className="flex flex-col p-5">
                    <div
                      className="flex justify-center items-center relative aspect-square overflow-hidden"
                      style={{ width: parentSize, height: parentSize }}
                    >
                      {profilePictureURL ? (
                        <img
                          ref={imageRef}
                          src={profilePictureURL}
                          alt=""
                          className="h-full"
                          onLoad={(e) => {
                            setImageWidth(e.currentTarget.width);
                          }}
                        />
                      ) : (
                        <h4>No image chosen.</h4>
                      )}
                      {imageWidth > 0 ? (
                        <>
                          <Draggable
                            axis="both"
                            defaultPosition={{
                              x: (imageWidth - childSize) / 2,
                              y: (parentSize - childSize) / 2,
                            }}
                            grid={[10, 10]}
                            nodeRef={targetRef}
                            scale={1}
                            bounds={{
                              top: 0,
                              left: (parentSize - imageWidth) / 2,
                              bottom: parentSize - childSize,
                              right:
                                (parentSize - imageWidth) / 2 +
                                imageWidth -
                                childSize,
                            }}
                          >
                            <div
                              ref={targetRef}
                              className="aspect-square border border-white absolute left-0 top-0 cursor-move"
                              style={{ width: childSize, height: childSize }}
                            ></div>
                          </Draggable>
                          <canvas
                            ref={canvasRef}
                            width={childSize}
                            height={childSize}
                            className="relative hidden"
                          ></canvas>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="flex gap-2 mt-8">
                      <Button
                        variant="primary"
                        onClick={() => {
                          fileInputRef.current.click();
                        }}
                        full
                      >
                        Choose File
                      </Button>
                      <Button
                        variant="primary"
                        onClick={async () => {
                          await uploadProfilePicture();
                          setExpandedProfilePicture(false);
                        }}
                        full
                      >
                        Confirm
                      </Button>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={(e: any) => {
                        setProfilePictureURL(
                          URL.createObjectURL(e.currentTarget.files[0])
                        );
                      }}
                    />
                  </div>
                </Card>
              </TransparentBackground>
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
                  validators={{
                    required: (v: string) => validateRequired(v),
                  }}
                />
                <TextFormField
                  name="username"
                  label="Username:"
                  placeholder="Enter new username:"
                  register={registerSettings}
                  error={errorsSettings.username}
                  validators={{
                    required: (v: string) => validateRequired(v),
                    min: (v: string) => validateMin(v, 4, "Username"),
                    regex: (v: string) => validateUsernameRegex(v),
                    backend: async (v: string) => {
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
                  validators={{
                    required: (v: string) => validateRequired(v),
                    regex: (v: string) => validateEmailRegex(v),
                    backend: async (v: string) => {
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
                />
                <TextFormField
                  name="website"
                  label="Website:"
                  placeholder="Enter a wesite:"
                  register={registerSettings}
                  error={errorsSettings.website}
                  validators={{ regex: (v: string) => validateURLRegex(v) }}
                />
                <TextFormField
                  name="location"
                  label="Location:"
                  placeholder="Enter your location:"
                  register={registerSettings}
                  error={errorsSettings.location}
                />
              </div>
            </div>
          </div>
          <h1 className="mt-[60px]">Theme Color</h1>
          <Separator />
          <div className="mt-10 flex flex-wrap gap-5">
            <ColorPicker
              onClick={() => {
                setSavedUpdate(false);
              }}
              register={registerSettings}
              getValues={getValuesSettings}
              setValue={setValueSettings}
              reset={resetSettings}
              name="themeColor"
              variant="rounded"
              animate="scale"
              active="check"
              size="md"
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
            validators={{
              required: (v: string) => validateRequired(v),
            }}
          />
          <TextFormField
            name="newpassword"
            label="New pasword:"
            placeholder="Enter new password:"
            register={registerReset}
            error={errorsReset.newpassword}
            validators={{
              required: (v: string) => validateRequired(v),
            }}
          />
          <TextFormField
            name="confirmnewpassword"
            label="Password confirmation:"
            placeholder="Confirm new password:"
            register={registerReset}
            error={errorsReset.confirmnewpassword}
            validators={{
              required: (v: string) => validateRequired(v),
            }}
          />
          <Button variant="primary" submit>
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
