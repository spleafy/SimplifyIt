import prefix from "./prefix";
// Utils
import { fetchAPI } from "../../../utils/api";

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

const controller = {
  fetch,
};

export default controller;
