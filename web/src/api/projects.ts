import { fetchAPI } from "../utils/api";

const prefix = "api/v1/projects";

const fetch = async (id?: string) => {
  const token = localStorage.getItem("X-Auth-Token");

  if (!id) {
    const response = await fetchAPI(
      prefix + "/",
      "GET",
      {},
      token ? { "X-Auth-Token": token } : {}
    );

    return response;
  }

  const response = await fetchAPI(
    prefix + `/?id=${encodeURIComponent(id)}`,
    "GET",
    {},
    token ? { "X-Auth-Token": token } : {}
  );

  console.log(response);

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

export default { fetch, create };
