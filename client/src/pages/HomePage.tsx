import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// Redux
import { useSelector } from "react-redux";
// Components
import Column from "../components/basic/Column";
import Button from "../components/basic/Button";
import Card from "../components/basic/Card";
import Form from "../components/form/Form";
import TextFormField from "../components/form/TextFormField";
import SelectFormField from "../components/form/SelectFormField";
import NavigationLink from "../components/navigation/NavigationLink";
import Label from "../components/basic/Label";
// Utils
import { validateRequired } from "../utils/validators";

const HomePage: FC = () => {
  /**
   * Document title
   * @description Changing the document title
   */
  document.title = `Home / ${process.env.REACT_APP_TITLE}`;

  /**
   * Navigate method
   * @description Creating a navigate method from the useNavigate hook, so we can navigate through the app
   */
  const navigate = useNavigate();

  /**
   * Logged user state
   * @description Getting the logged user state from the redux store
   */
  const loggedUser = useSelector((state: any) => state.user.user);

  /**
   * useForm hoom deconstruction
   * @description Deconstructing the useForm hook
   */
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  return (
    <>
      <Column>
        <h1 className="mt-10">Components</h1>
        <div className="w-[200px] mt-5">
          <Button variant="primary">Primary</Button>
        </div>
        <div className="w-[200px] mt-5">
          <Button variant="secondary">Secondary</Button>
        </div>
        <div className="w-[200px] mt-5">
          <Button variant="text">Text</Button>
        </div>
        <div className="mt-5">
          <Card variant="popup" width="480px" heading="Test Form">
            <Form
              submit={handleSubmit((values) => {
                console.log(values);
              })}
            >
              <TextFormField
                name="field"
                label="Test Field"
                placeholder="Test"
                register={register}
                error={errors.field}
                validators={{ required: (v: any) => validateRequired(v) }}
              />
              <Button variant="primary" submit>
                Submit
              </Button>
            </Form>
          </Card>
        </div>
        <div className="mt-5 w-[300px]">
          <SelectFormField
            name="testselectmultiple"
            label="Test Field"
            placeholder="Test"
            register={register}
            error={{}}
            setValue={setValue}
            options={["Ivan", "Gosho", "Martin"]}
          />
        </div>
        <div className="w-[300px] mt-5">
          <TextFormField
            name="testtext"
            label="Test Field"
            placeholder="Test"
            register={register}
            error={{}}
          />
        </div>
        {/* <div className="mt-5">
          <ToggleSwitch
            toggled={false}
            onToggle={() => {}}
            name="nottoggled"
            register={register}
          />
        </div>
        <div className="mt-5">
          <ToggleSwitch
            toggled={true}
            onToggle={() => {}}
            name="toggled"
            register={register}
          />
        </div> */}
        <div className="mt-5 w-[100px]">
          <NavigationLink to={""}>Link</NavigationLink>
        </div>
        <div className="mt-5 w-[100px]">
          <NavigationLink to={""} variant="bordered">
            Link
          </NavigationLink>
        </div>
        <div className="mt-5">
          <Label>Label</Label>
        </div>
        <div className="mt-5">
          <Card variant="popup" width="480px" heading="Card Heading">
            <span>Card</span>
          </Card>
        </div>
      </Column>
      <Column width="[400px]" minWidth="[400px]">
        {loggedUser.friends && loggedUser.friends.length > 0 ? (
          <h1>Has Friends</h1>
        ) : (
          <div className="h-full flex flex-col justify-center items-center w-[90%] self-center">
            <span className="pb-2">Looks kind of lonely...</span>
            <div className="w-auto">
              <Button
                variant="secondary"
                onClick={() => {
                  navigate("/app/friends");
                }}
              >
                Discover More
              </Button>
            </div>
          </div>
        )}
      </Column>
    </>
  );
};

export default HomePage;
