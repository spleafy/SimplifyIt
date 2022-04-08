import { useState } from "react";
import { Check, X } from "phosphor-react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
// Components
import FormField from "../../components/FormField";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import ToggleSwitch from "../../components/ToggleSwitch";
import Separator from "../../components/Separator";
import Card from "../../components/Card";
import PopUp from "../../components/PopUp";
// Redux
import { updateUser } from "../../redux/userSlice";
// Utils
import { submitForm } from "../../utils/form";
import {
  validateRequired,
  validateMin,
  validateUsernameRegex,
  validateUsernameBackend,
  validateEmailRegex,
  validateEmailBackend,
} from "../../utils/validators";
import {
  updateUserProfileColorAndUpdate,
  updateUserThemeColorAndUpdate,
  updateUserDarkThemeAndUpdate,
} from "../../utils/user";
import { getColors } from "../../utils/utils";

const AccountSettingsPage = () => {
  const loggedUser = useSelector((state: any) => state.user.user);

  const dispatch = useDispatch();

  const [expandedProfileColor, setExpandedProfileColor] = useState(false);

  const [submittingForm, setSubmittingForm] = useState(false);

  const [savedUpdate, setSavedUpdate] = useState(false);

  const defaultValues = {
    fullname: loggedUser.fullname,
    username: loggedUser.username,
    email: loggedUser.email.toLowerCase(),
    password: "",
    newpassword: "",
    confirmnewpassword: "",
  };

  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  const submit = async (values: any) => {
    if (JSON.stringify(values) !== JSON.stringify(defaultValues)) {
      setSubmittingForm(true);
      const response = await submitForm(
        values,
        "user/settings/account",
        localStorage.getItem("X-Auth-Token")
      );
      if (response.status === 200) {
        dispatch(updateUser(response.data.user));
        setSavedUpdate(true);
      }
      setSubmittingForm(false);
    } else {
      setSubmittingForm(false);
    }
  };

  const colors = getColors("all");

  return (
    <div className="w-full flex justify-center">
      <Card className="mb-20 p-10">
        <h1>My Account</h1>
        <Separator />
        <div className="flex gap-10 mt-10">
          <div
            className={`w-[125px] h-[125px] aspect-square rounded-full flex justify-center items-center relative overflow-hidden select-none`}
            style={{
              backgroundColor: loggedUser.settings
                ? getColors(loggedUser.settings.profileColor)[500]
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
                <PopUp width="480px">
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
                            onClick={async (e) => {
                              e.preventDefault();
                              updateUserProfileColorAndUpdate(key);
                            }}
                          >
                            {key === loggedUser.settings.profileColor ? (
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
                    <PrimaryButton>Choose File</PrimaryButton>
                  </div>
                </PopUp>
              </div>
            </>
          ) : (
            <></>
          )}
          <form
            onSubmit={handleSubmit(submit)}
            className="w-[300px]"
            onChange={() => {
              setSavedUpdate(false);
            }}
          >
            <FormField
              name="fullname"
              label="Full Name:"
              placeholder="Enter new full name:"
              register={register}
              error={errors.fullname}
              className="mb-2"
              validators={{
                required: (v: any) => validateRequired(v),
              }}
            />
            <FormField
              name="username"
              label="Username:"
              placeholder="Enter new username:"
              register={register}
              error={errors.username}
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
            <FormField
              name="email"
              label="Email:"
              placeholder="Enter new email:"
              register={register}
              error={errors.email}
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
            <div className="mt-4">
              <PrimaryButton
                submit={true}
                loading={submittingForm}
                disabled={savedUpdate}
              >
                {savedUpdate ? "Saved" : "Save Changes"}
              </PrimaryButton>
            </div>
          </form>
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
                    colors[loggedUser.settings.themeColor][500] ===
                    colors[key][500]
                      ? "scale-150 hover:scale-150"
                      : "hover:scale-125"
                  }`}
                  style={{ backgroundColor: colors[key][500] }}
                  onClick={async () => {
                    await updateUserThemeColorAndUpdate(key);
                  }}
                >
                  {colors[loggedUser.settings.themeColor][500] ===
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
        </div>
        <h1 className="mt-[60px] relative w-fit">Preferences</h1>
        <Separator />
        <div className="mt-10 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h4>Dark Mode</h4>
            <ToggleSwitch
              toggled={loggedUser.settings.darkTheme}
              onToggle={async () =>
                await updateUserDarkThemeAndUpdate(
                  !loggedUser.settings.darkTheme
                )
              }
            />
          </div>
        </div>
        <h1 className="mt-[60px]">Reset Password</h1>
        <Separator />
        <form
          onSubmit={handleSubmit((values) => {
            console.log(values);
          })}
          className="mt-10 w-[300px]"
        >
          <FormField
            name="password"
            label="Current password:"
            placeholder="Enter current password:"
            register={register}
            error={errors.password}
            className="mb-2"
            validators={{
              required: (v: any) => validateRequired(v),
            }}
          />
          <FormField
            name="newpassword"
            label="New pasword:"
            placeholder="Enter new password:"
            register={register}
            error={errors.newpassword}
            className="mb-2"
            validators={{
              required: (v: any) => validateRequired(v),
            }}
          />
          <FormField
            name="confirmnewpassword"
            label="Password confirmation:"
            placeholder="Confirm new password:"
            register={register}
            error={errors.confirmnewpassword}
            className="mb-2"
            validators={{
              required: (v: any) => validateRequired(v),
            }}
          />
          <PrimaryButton submit={true}>Reset Password</PrimaryButton>
        </form>
        <h1 className="mt-[60px]">Delete account</h1>
        <Separator />
        <div className="mt-10 flex gap-5 flex-col">
          <span>
            Deleting your account will result in your data being removed.
          </span>
          <div className="w-fit">
            <SecondaryButton variant="error">Delete Account</SecondaryButton>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountSettingsPage;
