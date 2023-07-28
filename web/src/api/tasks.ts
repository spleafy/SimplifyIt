import { fetchAPI } from "../utils/api";

const prefix = "api/v1/tasks";

const fetch = async (id: string) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchAPI(
    prefix + `/?id=${encodeURIComponent(id)}`,
    "GET",
    {},
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

const fetchAll = async () => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchAPI(
    prefix + `/all`,
    "GET",
    {},
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

const create = async (values: string) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchAPI(
    prefix + "/",
    "POST",
    values,
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

const update = async (values: string, id: string) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchAPI(
    prefix + `/?id=${encodeURIComponent(id)}`,
    "PUT",
    values,
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

export default { fetch, fetchAll, create, update };
