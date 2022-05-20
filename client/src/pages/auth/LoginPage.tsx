import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// Components
import Card from "../../components/basic/Card";
import Form from "../../components/form/Form";
import TextFormField from "../../components/form/TextFormField";
import Button from "../../components/basic/Button";
// Utils
import { addSuccess } from "../../utils/utils";
import { submitForm } from "../../utils/form";
import {
  validateRequired,
  validateMin,
  validateUsernameRegex,
  validateUsernameBackend,
} from "../../utils/validators";

const LoginPage: FC = () => {
  /**
   * Document title
   * @description Updating the document title
   */
  document.title = `Login / ${process.env.REACT_APP_TITLE}`;

  /**
   * Navigate method
   * @description Creating a navigate method from the useNavigate hook, so we can navigate through the app
   */
  const navigate = useNavigate();

  /**
   * Submit method
   * @description Creating a submit method for the onSubmit form event
   */
  const submit = async (values: FieldValues) => {
    // We submit the form and await for the response
    const response = await submitForm(values, "user/auth/login");
    // If the response isn't 200, we set an error to the password field, if it is, we set the token in the localStorage and navigate the user to the home page
    if (response.status !== 200) {
      setError("password", {
        type: "manual",
        message: "This password is invalid for this email!",
      });
    } else {
      if (response.data.twoFactorToken) {
        navigate(`/auth/twofactor?token=${response.data.twoFactorToken}`);
      } else {
        addSuccess("login");
        localStorage.setItem("X-Auth-Token", response.data.token);
        navigate("/app");
      }
    }
  };

  /**
   * useForm deconstruction
   * @description Deconstructing the useForm hook
   */
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card variant="popup" width="480px" heading="Welcome back!">
        <Form submit={handleSubmit(submit)}>
          <TextFormField
            name="username"
            placeholder="Enter username:"
            label="Username:"
            type="text"
            register={register}
            error={errors.username}
            validators={{
              required: (v: string) => validateRequired(v),
              min: (v: string) => validateMin(v, 4, "Username"),
              regex: (v: string) => validateUsernameRegex(v),
              backend: async (v: string) =>
                await validateUsernameBackend(v, true),
            }}
          />
          <TextFormField
            name="password"
            placeholder="Enter password:"
            label="Password:"
            type="password"
            register={register}
            error={errors.password}
            validators={{
              required: (v: string) => validateRequired(v),
              min: (v: string) => validateMin(v, 8, "Password"),
            }}
            action={
              <Link
                to={"/auth/forgot"}
                className="text-primary-500 hover:underline"
              >
                Forgot Password?
              </Link>
            }
          />
          <Button variant="primary" submit>
            Login
          </Button>
          <span className="block w-full text-center text-slate-400 pt-6 text-sm">
            Don't have an account?&nbsp;
            <Link
              to={"/auth/register"}
              className="text-primary-500 hover:underline"
            >
              Register Now
            </Link>
          </span>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
