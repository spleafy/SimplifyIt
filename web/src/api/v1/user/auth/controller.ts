import prefix from "./prefix";
// Utils
import { fetchAPI } from "../../../../utils/api";

const login = async (values: any) => {
  const response = await fetchAPI(prefix + "/login", "POST", values);

  return response;
};

const signup = async (values: any) => {
  const response = await fetchAPI(prefix + "/signup", "POST", values);

  return response;
};

const controller = {
  login,
  signup,
};

export default controller;
