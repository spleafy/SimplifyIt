import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
// Components
import Card from "../components/Card";
import Form from "../components/Form";
import FormField from "../components/FormField";
import PrimaryButton from "../components/PrimaryButton";
// Utils
import { submitForm } from "../utils/form";
import {
  validateRequired,
  validateEmailRegex,
  validateEmailBackend,
} from "../utils/validators";

const ForgotPage = () => {
  document.title = `Forgot / ${process.env.REACT_APP_TITLE}`;

  const [sentEmail, setSentEmail] = useState(false);

  const submit = async (values: any) => {
    const response = await submitForm(values, "user/auth/forgot");

    if (response.status === 202) {
      setSentEmail(true);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  return (
    <div className="flex justify-center items-center h-full w-full">
      {!sentEmail ? (
        <Card width="480px" heading="Hope we can help!">
          <Form submit={handleSubmit(submit)}>
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
                backend: async (v: any) => await validateEmailBackend(v, true),
              }}
            />

            <PrimaryButton submit={true}>Send Link</PrimaryButton>
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
        </Card>
      ) : (
        <Card width="480px" heading="We sent you an email!">
          <h2 className="text-md mb-8 mt-3 text-slate-700 text-center">
            If you don't find the email, check the junk folder!
          </h2>
          <span className="block w-full text-slate-400 pt-6 text-sm text-center">
            Go back to login?&nbsp;
            <Link
              to={"/auth/login"}
              className="text-primary-500 hover:underline"
            >
              Login Now
            </Link>
          </span>
        </Card>
      )}
    </div>
  );
};

export default ForgotPage;
