import { useState, FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
// Components
import Form from "../components/form/Form";
import TextFormField from "../components/form/TextFormField";
import Button from "../components/basic/Button";
import Card from "../components/basic/Card";
// Utils
import { submitForm } from "../utils/form";
import {
  validateRequired,
  validateEmailRegex,
  validateEmailBackend,
} from "../utils/validators";

const ForgotPage: FC = () => {
  /**
   * Document title
   * @description Setting the document title
   */
  document.title = `Forgot / ${process.env.REACT_APP_TITLE}`;

  /**
   * Email sent state
   * @description Creating a useState variable, so we can toggle the state of the page if the email was sent successfuly
   */
  const [sentEmail, setSentEmail] = useState(false);

  /**
   * Submit method
   * @description Creating a submit method for the onSubmit event of the form
   */
  const submit = async (values: any) => {
    // Submit the form and await the response
    const response = await submitForm(values, "user/auth/forgot");

    // If the response is 202, set the email sent state to true
    if (response.status === 202) {
      setSentEmail(true);
    }
  };

  /**
   * useForm hook deconstruction
   * @description Deconstructing the useForm hook
   */
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
        <Card width="480px" heading="Hope we can help!" variant="popup">
          <Form submit={handleSubmit(submit)}>
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
                backend: async (v: any) => await validateEmailBackend(v, true),
              }}
            />

            <Button variant="primary" submit={true}>
              Send Link
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
        </Card>
      ) : (
        <Card width="480px" heading="We sent you an email!" variant="popup">
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
