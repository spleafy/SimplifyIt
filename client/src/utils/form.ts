import { fetchBackendAsync } from "./api";
import { addError } from "./utils";

/**
 * createFormData
 * @param {any} obj The value/s with which the form data is created
 * @returns {Object}
 */
export const createFormData = (obj: any) => {
  const formData = new FormData();
  Object.keys(obj).forEach((key) => {
    formData.append(key, obj[key]);
  });
  return formData;
};

/**
 *
 * @param {any} values The values of the form
 * @param {string} path The path to which the form will be submitted
 * @param {string | null=} token The browser x-auth-token token
 * @returns
 */
export const submitForm = async (
  values: any,
  path: string,
  token?: string | null,
  method?: string
) => {
  try {
    const data = await fetchBackendAsync(
      `api/v1/${path}`,
      method ? method : "POST",
      token ? { "X-Auth-Token": token } : {},
      values
    );

    return data;
  } catch (err: any) {
    addError(err.toString());
  }
};
