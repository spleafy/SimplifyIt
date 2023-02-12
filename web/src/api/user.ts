import { fetchAPI } from "../utils/api";

const prefix = "api/v1/user";

const sub = {
  auth: "/auth",
  validate: "/validate",
};

const fetch = async (id?: string) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchAPI(
    prefix + `/${id ? `?id=${encodeURIComponent(id)}` : ""}`,
    "GET",
    {},
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

const login = async (values: any) => {
  const response = await fetchAPI(prefix + sub.auth + "/login", "POST", values);

  return response;
};

const signup = async (values: any) => {
  const response = await fetchAPI(
    prefix + sub.auth + "/signup",
    "POST",
    values
  );

  return response;
};

const username = async (value: string) => {
  const response = await fetchAPI(
    prefix + sub.validate + `/username?username=${encodeURIComponent(value)}`
  );

  return response;
};

const email = async (value: string) => {
  const response = await fetchAPI(
    prefix + sub.validate + `/email?email=${encodeURIComponent(value)}`
  );

  return response;
};

const token = async () => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchAPI(
    prefix + sub.validate + "/token",
    "GET",
    {},
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

export default {
  fetch,
  auth: { login, signup },
  validate: { username, email, token },
};
