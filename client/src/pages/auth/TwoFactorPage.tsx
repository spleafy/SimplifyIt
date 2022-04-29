import { useForm } from "react-hook-form";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
// Components
import PopUp from "../../components/PopUp";
import Form from "../../components/form/Form";
import TextFormField from "../../components/form/TextFormField";
import PrimaryButton from "../../components/PrimaryButton";
// Utils
import { validateRequired } from "../../utils/validators";
import { submitForm } from "../../utils/form";
import { addSuccess } from "../../utils/utils";

const TwoFactorPage = () => {
  const navigate = useNavigate();

  const [params] = useSearchParams();

  const token = params.get("token");

  const submit = async (values: any) => {
    const response = await submitForm(values, "user/auth/twofactor", token);

    console.log(response.status);

    if (response.status !== 200) {
      // If the response status is not 200, we create an error
      setError("twofactorcode", {
        type: "manual",
        message: "This is not the correct code!",
      });
    } else {
      addSuccess("login");
      localStorage.setItem("X-Auth-Token", response.data.token);
      navigate("/app");
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
      {token ? (
        <PopUp width="480px" heading="Two factor authentication">
          <Form submit={handleSubmit(submit)}>
            <TextFormField
              name="twofactorcode"
              label="Code:"
              placeholder="Enter code:"
              type="text"
              register={register}
              error={errors.twofactorcode}
              validators={{ required: (v: string) => validateRequired(v) }}
            />
            <PrimaryButton submit={true}>Submit</PrimaryButton>
          </Form>
        </PopUp>
      ) : (
        <PopUp width="480px" heading="No token detected">
          <span className="block w-full text-slate-400 pt-6 text-sm text-center">
            Go back to login?&nbsp;
            <Link
              to={"/auth/login"}
              className="text-primary-500 hover:underline"
            >
              Login Now
            </Link>
          </span>
        </PopUp>
      )}
    </div>
  );
};

export default TwoFactorPage;
