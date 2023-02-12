import prefix from "./prefix";
// Utils
import { fetchAPI } from "../../../../utils/api";

const username = async (value: string) => {
  const response = await fetchAPI(
    prefix + `/username?username=${encodeURIComponent(value)}`
  );

  return response;
};

const email = async (value: string) => {
  const response = await fetchAPI(
    prefix + `/email?email=${encodeURIComponent(value)}`
  );

  return response;
};

const token = async () => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchAPI(
    prefix + "/token",
    "GET",
    {},
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

const controller = {
  username,
  email,
  token,
};

export default controller;
