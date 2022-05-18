import { FC } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// Components
import Form from "../../components/form/Form";
import TextFormField from "../../components/form/TextFormField";
import Card from "../../components/basic/Card";
import Button from "../../components/basic/Button";
// Utils
import { submitForm } from "../../utils/form";
import {
  validateRequired,
  validateMin,
  validateEmailRegex,
  validateEmailBackend,
  validateUsernameRegex,
  validateUsernameBackend,
} from "../../utils/validators";

const RegisterPage: FC = () => {
  /**
   * Document title
   * @description Updating the document title
   */
  document.title = `Register / ${process.env.REACT_APP_TITLE}`;

  /**
   * Navigate method
   * @description Creating a navigate method from the useNavigate hook, so we can navigate through the app
   */
  const navigate = useNavigate();

  /**
   * Submit method
   * @description Creating a submit method for the onSubmit event of the form
   */
  const submit = async (values: any) => {
    // Submit the form and await the response
    const response = await submitForm(values, "user/auth/register");
    // If the response is not 200, create an error
    if (response.status !== 200) {
      setError("password", {
        type: "manual",
        message: "An error occured!",
      });
    } else {
      // Set the token from the response to the localStorage
      localStorage.setItem("X-Auth-Token", response.data.token);
      // Navigate the user to the initial setup page
      navigate("/initial-setup");
    }
  };

  /**
   * useForm deconstruction
   * @description Deconstructing the useForm hook
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: "all",
  });

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card variant="popup" width="480px" heading="Happy to see you!">
        <Form submit={handleSubmit(submit)}>
          <TextFormField
            name="fullname"
            placeholder="Enter name:"
            label="Full Name:"
            type="text"
            register={register}
            error={errors.fullname}
            validators={{
              required: (v: any) => validateRequired(v),
            }}
          />
          <TextFormField
            name="email"
            placeholder="Enter email:"
            label="Email:"
            type="text"
            register={register}
            error={errors.email}
            validators={{
              required: (v: any) => validateRequired(v),
              regex: (v: any) => validateEmailRegex(v),
              backend: async (v: any) => await validateEmailBackend(v, false),
            }}
          />
          <TextFormField
            name="username"
            placeholder="Enter username:"
            label="Username:"
            type="text"
            register={register}
            error={errors.username}
            validators={{
              required: (v: any) => validateRequired(v),
              min: (v: any) => validateMin(v, 4, "Username"),
              regex: (v: any) => validateUsernameRegex(v),
              backend: async (v: any) =>
                await validateUsernameBackend(v, false),
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
              required: (v: any) => validateRequired(v),
              email: (v: any) => validateMin(v, 8, "Password"),
            }}
          />
          <span className="block w-full text-slate-400 pb-6 text-sm">
            By registering, you agree to our&nbsp;
            <Link to={"/"} className="text-primary-500 hover:underline">
              Terms & Conditions
            </Link>
            &nbsp;and&nbsp;
            <Link to={"/"} className="text-primary-500 hover:underline">
              Privacy Policy
            </Link>
          </span>
          <Button variant="primary" submit>
            Continue
          </Button>
          <span className="block w-full text-center text-slate-400 pt-6 text-sm">
            Already have an account?&nbsp;
            <Link
              to={"/auth/login"}
              className="text-primary-500 hover:underline"
            >
              Login Now
            </Link>
          </span>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
