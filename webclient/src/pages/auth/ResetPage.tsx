import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
// Components
import Card from "../../components/basic/Card";
import Form from "../../components/form/Form";
import TextFormField from "../../components/form/TextFormField";
import Button from "../../components/basic/Button";
// Utils
import { submitForm } from "../../utils/form";
import {
  validateRequired,
  validateMin,
  validateMatchBoth,
} from "../../utils/validators";

const ResetPage: FC = () => {
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
  const submit = async (values: FieldValues) => {
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
      <Card variant="popup" width="480px" heading="Reset Password">
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
                required: (v: string) => validateRequired(v),
                min: (v: string) => validateMin(v, 8, "Password"),
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
                required: (v: string) => validateRequired(v),
                min: (v: string) => validateMin(v, 8, "Password"),
                match: (v: string) =>
                  validateMatchBoth(v, getValues("password"), "Passwords"),
              }}
            />

            <Button variant="primary" submit full>
              Reset Password
            </Button>
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
          <div className="text-center drop-shadow-lg w-[480px] min-w-[480px] rounded-lg px-16 py-8 animate-scale bg-white select-none">
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
      </Card>
    </div>
  );
};

export default ResetPage;
