import { useNavigate } from "react-router-dom";
import {
  Form,
  TextField,
  Button,
  Animated,
  validators as V,
  hooks as H,
} from "@prismane/core";
// Components
import SitPage from "../../layouts/SitPage";
import SitLink from "../../components/navigation/SitLink";
// Services
import api from "../../api";

const SignUpPage = () => {
  const { alternate, setAlternate, duration } = H.useAnimation("short");

  /**
   * Navigate method
   * @description Creating a navigate method from the useNavigate hook, so we can navigate through the app
   */
  const navigate = useNavigate();

  /**
   * Submit method
   * @description Creating a submit method for the onSubmit form event
   */
  const submit = async (values: any, options: any) => {
    console.log(values);

    const response = await api.user.auth.signup(values);

    if (response.status === "SUCCESS") {
      localStorage.setItem("X-Auth-Token", response.data.token);
      navigate("/app");
      return;
    }

    if (response.status === "EXISTS") {
      options.setError("email", {
        type: "manual",
        message: "User with this email already exists!",
      });
      return;
    }
  };

  return (
    <SitPage
      className="flex flex-row !p-0"
      animationIn="animate-fade-in"
      title="Sign Up"
    >
      <Animated
        className="flex flex-col justify-center grow py-36 px-16"
        animationIn="animate-slide-in-top"
        animationOut="animate-slide-out-bottom"
        alternate={alternate}
      >
        <h1 className="uppercase text-2xl mb-16">SimplifyIt</h1>
        <h1 className="text-3xl mb-2">Sign Up</h1>
        <span className="text-base-400 mb-10">Fill the fields to sign up.</span>
        <Form submit={submit} className="max-w-3xl grow">
          <TextField
            name="fullname"
            placeholder="John Doe"
            label="Enter full name:"
            validators={{
              required: (v: string) => V.required(v),
            }}
          />
          <TextField
            name="username"
            placeholder="johnny"
            label="Enter username:"
            validators={{
              required: (v: string) => V.required(v),
              min: (v: string) => V.min(v, 4, "Username"),
              regex: (v: string) => V.username(v),
              // backend: async (v: string) =>
              //   await validateUsernameBackend(v, false),
            }}
          />
          <TextField
            name="email"
            placeholder="test@domain.com"
            label="Enter email:"
            validators={{
              required: (v: string) => V.required(v),
              regex: (v: string) => V.email(v),
              // backend: async (v: string) =>
              //   await validateEmailBackend(v, false),
            }}
          />
          <TextField
            name="password"
            placeholder="*********"
            label="Enter password:"
            type="password"
            validators={{
              required: (v: string) => V.required(v),
              min: (v: string) => V.min(v, 8, "Password"),
            }}
          />
          <Button variant="primary" className="mb-5" submit full shadow>
            Sign Up
          </Button>
          <span className="text-sm">
            Already a member?{" "}
            <SitLink
              to="/auth/login"
              before={() => {
                return new Promise((resolve, reject) => {
                  setAlternate(true);
                  setTimeout(() => {
                    resolve(true);
                  }, duration - 50);
                });
              }}
            >
              Login
            </SitLink>
          </span>
        </Form>
      </Animated>
      <Animated
        className="w-2/3 h-full flex flex-col bg-gradient-to-tr from-primary-500 to-pink-500 py-36 px-36 overflow-hidden"
        animationIn="animate-slide-in-bottom"
        animationOut="animate-slide-out-top"
        alternate={alternate}
      >
        <h1
          className={`uppercase text-white text-9xl font-bold tracking-wide mb-5 drop-shadow-md`}
        >
          Start your journey with us.
        </h1>
        <span className={`text-lg text-base-200/90`}>
          Discover the best productivity app.
        </span>
      </Animated>
    </SitPage>
  );
};

export default SignUpPage;
