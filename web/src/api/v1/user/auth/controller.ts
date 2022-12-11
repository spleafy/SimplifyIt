import prefix from "./prefix";
// Utils
import { fetchBackendAsync } from "../../../../utils/api";

const login = async (values: any) => {
  const response = await fetchBackendAsync(
    prefix + "/login",
    "POST",
    {},
    values
  );

  return response;
};

const signup = async (values: any) => {
  const response = await fetchBackendAsync(
    prefix + "/signup",
    "POST",
    {},
    values
  );

  return response;
};

const controller = {
  login,
  signup,
};

export default controller;
