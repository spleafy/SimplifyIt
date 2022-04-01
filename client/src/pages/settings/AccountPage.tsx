import { useState } from "react";
import { FiEdit2, FiCheck, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
// Components
import FormField from "../../components/FormField";
import PrimaryButton from "../../components/PrimaryButton";
import ToggleSwitch from "../../components/ToggleSwitch";
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

const AccountPage = () => {
  const loggedUser = useSelector((state: any) => state.user.user);

  const dispatch = useDispatch();

  const [expandedProfileColor, setExpandedProfileColor] = useState(false);

  const [submittingForm, setSubmittingForm] = useState(false);

  const [savedUpdate, setSavedUpdate] = useState(false);

  const defaultValues = {
    fullname: loggedUser.fullname,
    username: loggedUser.username,
    email: loggedUser.email.toLowerCase(),
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
    <>
      <h1>Your Account</h1>
      <div className="mt-10">
        <div
          className={`w-[100px] aspect-square rounded-full flex justify-center items-center relative`}
          style={{
            backgroundColor: loggedUser.settings
              ? getColors(loggedUser.settings.profileColor)[500]
              : "#f3f3f3",
          }}
        >
          <div
            className={`absolute flex justify-center items-center transition-colors rounded-full cursor-pointer w-[50px] aspect-square hover:bg-slate-900/50 bg-slate-700/50 ${
              expandedProfileColor
                ? "hover:bg-slate-700/50"
                : "hover:bg-slate-900/50"
            }`}
            onClick={() => {
              setExpandedProfileColor(true);
            }}
          >
            <FiEdit2 color="white" />
          </div>
          {expandedProfileColor ? (
            <div className="absolute left-[150px] p-[20px] pt-[50px] flex flex-wrap justify-center items-center gap-[20px] bg-slate-200/40 dark:bg-slate-700/50 w-[300px] rounded-lg animate-scale">
              <FiX
                size={20}
                className="stroke-slate-700 dark:stroke-white absolute right-[10px] top-[10px] cursor-pointer"
                onClick={() => {
                  setExpandedProfileColor(false);
                }}
              />
              {Object.keys(colors).map((key: string, index: number) =>
                colors[key][500] ? (
                  <div
                    className={`w-5 aspect-square rounded-full cursor-pointer transition flex justify-center items-center text-white hover:rounded-md`}
                    style={{ backgroundColor: colors[key][500] }}
                    onClick={async () => {
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
          ) : (
            <></>
          )}
          {loggedUser.fullname ? (
            <h1 className="text-white">
              {loggedUser.fullname.split(" ")[0].charAt(0)}
              {loggedUser.fullname.split(" ")[1].charAt(0)}
            </h1>
          ) : (
            <></>
          )}
        </div>

        <form
          onSubmit={handleSubmit(submit)}
          className="w-[300px] mt-10"
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
          <div className="w-1/2 mt-4">
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
                  <FiCheck />
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
      <h1 className="mt-[60px] relative w-fit">Preference</h1>
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h4>Dark Mode</h4>
          <ToggleSwitch
            toggled={loggedUser.settings.darkTheme}
            onToggle={async () =>
              await updateUserDarkThemeAndUpdate(!loggedUser.settings.darkTheme)
            }
          />
        </div>
      </div>
    </>
  );
};

export default AccountPage;
