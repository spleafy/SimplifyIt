import { useForm } from "react-hook-form";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
// Components
import PopUp from "../components/PopUp";
import Form from "../components/form/Form";
import TextFormField from "../components/form/TextFormField";
import PrimaryButton from "../components/PrimaryButton";
// Utils
import { submitForm } from "../utils/form";
import {
  validateRequired,
  validateMin,
  validateMatchBoth,
} from "../utils/validators";

const ResetPage = () => {
  /**
   * Document title
   * @description Updating the document title
   */
  document.title = `Reset / ${process.env.REACT_APP_TITLE}`;

  /**
   * Navigate method
   * @description Creating a navigate method from the useNavigate hook, so we can navigate through the app
   */
  const navigate = useNavigate();

  /**
   * Params array
   * @description Getting the params from the url, as an array
   */
  const [params] = useSearchParams();

  /**
   * Token param
   * @description Getting the token from the params array
   */
  const token = params.get("token");

  /**
   * Submit method
   * @description Creating a submit method for the onSubmit event of the form
   */
  const submit = async (values: any) => {
    // Submit the form and await the response
    const response = await submitForm(values, "user/auth/reset", token);

    // Checking the response status
    if (response.status !== 200) {
      // If the response status is not 200, we create an error
      setError("repassword", {
        type: "manual",
        message: "An error occured! Try again in a second!",
      });
    } else {
      // If the response status is 200, we navigate the user to the login page
      navigate("/auth/login");
    }
  };

  /**
   * useForm deconstruction
   * @description Deconstructing the useForm hook
   */
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  return (
    <div className="flex justify-center items-center h-full w-full">
      <PopUp width="480px" heading="Reset Password">
        {token ? (
          <Form submit={handleSubmit(submit)}>
            <TextFormField
              name="password"
              placeholder="Enter new password:"
              label="New password:"
              type="password"
              register={register}
              error={errors.password}
              validators={{
                required: (v: any) => validateRequired(v),
                min: (v: any) => validateMin(v, 8, "Password"),
              }}
            />

            <TextFormField
              name="repassword"
              placeholder="Retype new password:"
              label="Retype new password:"
              type="password"
              register={register}
              error={errors.repassword}
              validators={{
                required: (v: any) => validateRequired(v),
                min: (v: any) => validateMin(v, 8, "Password"),
                match: (v: any) =>
                  validateMatchBoth(v, getValues("password"), "Passwords"),
              }}
            />

            <PrimaryButton submit={true}>Reset Password</PrimaryButton>
            <span className="block w-full text-center text-slate-400 pt-6 text-sm">
              Remembered your password?&nbsp;
              <Link
                to={"/auth/login"}
                className="text-primary-500 hover:underline"
              >
                Login Now
              </Link>
            </span>
          </Form>
        ) : (
          <div className="text-center shadow-[0_0_20px_10px_rgba(0,0,0,0.1)] w-[480px] min-w-[480px] rounded-md px-16 py-8 animate-scale bg-white select-none">
            <h1>We didn't detect the reset token!</h1>
            <span className="block w-full text-slate-400 pt-6 text-sm">
              Go back to login?&nbsp;
              <Link
                to={"/auth/login"}
                className="text-primary-500 hover:underline"
              >
                Login Now
              </Link>
            </span>
          </div>
        )}
      </PopUp>
    </div>
  );
};

export default ResetPage;
