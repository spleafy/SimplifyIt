import { FC } from "react";
import { useForm } from "react-hook-form";
import { Trash } from "phosphor-react";
// Components
import Column from "../components/basic/Column";
import Button from "../components/basic/Button";
import Card from "../components/basic/Card";
import Form from "../components/form/Form";
import TextFormField from "../components/form/TextFormField";
import SelectFormField from "../components/form/SelectFormField";
import NavigationLink from "../components/navigation/NavigationLink";
import Label from "../components/basic/Label";
import FriendsPanel from "../components/FriendsPanel";
// Utils
import { validateRequired } from "../utils/validators";

const HomePage: FC = () => {
  /**
   * Document title
   * @description Changing the document title
   */
  document.title = `Home / ${process.env.REACT_APP_TITLE}`;

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
        <h1 className="mt-10">Heading</h1>
        <h2 className="mt-5">Heading</h2>
        <h3 className="mt-5">Heading</h3>
        <h4 className="mt-5">Heading</h4>
        <h5 className="mt-5">Heading</h5>
        <h6 className="mt-5">Heading</h6>
        <div className="w-[200px] mt-5">
          <Button variant="primary">Primary</Button>
        </div>
        <div className="w-[200px] mt-5">
          <Button variant="primary" loading={true}>
            Loading...
          </Button>
        </div>
        <div className="w-[200px] mt-5">
          <Button variant="primary" icon={<Trash />}>
            Icon
          </Button>
        </div>
        <div className="w-[200px] mt-5">
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
        <div className="w-[200px] mt-5">
          <Button variant="secondary">Secondary</Button>
        </div>
        <div className="w-[200px] mt-5">
          <Button variant="text">Text</Button>
        </div>
        <div className="w-[200px] mt-5">
          <Button variant="action">
            <Trash />
          </Button>
        </div>
        <div className="w-[200px] mt-5">
          <Button variant="action" color="theme">
            <Trash />
          </Button>
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
                validators={{ required: (v: string) => validateRequired(v) }}
              />
              <Button variant="primary" submit full>
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
            error={{ type: "test" }}
            register={register}
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
            error={{ type: "test" }}
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
        <FriendsPanel />
      </Column>
    </>
  );
};

export default HomePage;
