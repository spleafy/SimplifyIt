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
import SitLink from "../../components/basic/SitLink";
// Utils
import { validateUsernameBackend } from "../../utils/validators";
// Services
import api from "../../api";

const LoginPage = () => {
  const navigate = useNavigate();

  const { alternate, setAlternate, duration } = H.useAnimation("short");

  const submit = async (values: any, options: any) => {
    const response = await api.v1.user.auth.controller.login(values);

    if (response.status === "SUCCESS") {
      localStorage.setItem("X-Auth-Token", response.data.token);
      setAlternate(true);
      setTimeout(() => {
        navigate("/app");
      }, 300);
    }

    if (response.status === "UNAUTHORIZED") {
      options.setError("password", {
        type: "manual",
        message: "This password is invalid for this email!",
      });
    }

    if (response.status === "NOT_FOUND") {
      options.setError("username", {
        type: "manual",
        message: "There is no user registered with this username!",
      });
    }
  };

  return (
    <SitPage
      className="flex flex-row !p-0"
      animationIn="animate-fade-in"
      title="Login"
    >
      <Animated
        className="flex flex-col justify-center grow py-36 px-16"
        animationIn="animate-slide-in-top"
        animationOut="animate-slide-out-bottom"
        alternate={alternate}
      >
        <h1 className="uppercase text-2xl mb-16">SimplifyIt</h1>
        <h1 className="text-3xl mb-2">Login</h1>
        <span className="text-base-400 mb-10">
          Enter your credentials to access your account.
        </span>
        <Form submit={submit} className="max-w-3xl grow">
          <TextField
            name="username"
            placeholder="johnny"
            label="Enter username:"
            validators={{
              required: (v: string) => V.required(v),
              min: (v: string) => V.min(v, 4, "Username"),
              regex: (v: string) => V.username(v),
              backend: async (v: string) =>
                await validateUsernameBackend(v, true),
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
            Login
          </Button>
          <span className="text-sm">
            Not a member?{" "}
            <SitLink
              to="/auth/signup"
              before={() => {
                return new Promise((resolve) => {
                  setAlternate(true);
                  setTimeout(() => {
                    resolve(true);
                  }, duration - 50);
                });
              }}
            >
              Sign Up
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
          Welcome back!
        </h1>
        <span className={`text-lg text-base-200/90`}>
          Your tasks await you.
        </span>
      </Animated>
    </SitPage>
  );
};

export default LoginPage;
