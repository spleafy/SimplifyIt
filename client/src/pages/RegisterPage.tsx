import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// Components
import Form from "../components/Form";
import FormField from "../components/FormField";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
// Utils
import { submitForm } from "../utils/form";
import {
  validateRequired,
  validateMin,
  validateEmailRegex,
  validateEmailBackend,
  validateUsernameRegex,
  validateUsernameBackend,
} from "../utils/validators";

const RegisterPage = () => {
  document.title = `Register / ${process.env.REACT_APP_TITLE}`;

  const navigate = useNavigate();

  const submit = async (values: any) => {
    const response = await submitForm(values, "user/auth/register");
    if (response.status !== 200) {
      setError("password", {
        type: "manual",
        message: "An error occured!",
      });
    } else {
      localStorage.setItem("X-Auth-Token", response.data.token);
      navigate("/app");
    }
  };

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
      <Card width="480px" heading="Happy to see you!">
        <Form submit={handleSubmit(submit)}>
          <FormField
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
          <FormField
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
          <FormField
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
          <FormField
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
          <PrimaryButton submit={true}>Register</PrimaryButton>
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
