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
 * fetchBackendAsync
 * @param {string} path The path of the api that you want to fetch
 * @param {string=} method The method of the request e.g. POST, GET, PUT
 * @param {Object=} headers The headers object of the request
 * @param {any=} body The request body
 * @returns Promise<any>
 * @description Method to fetch the backend
 */
export const fetchBackendAsync = async (
  path: string,
  method?: string,
  headers?: HeadersInit | undefined,
  body?: Object
): Promise<any> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_PROTOCOL}://${
        import.meta.env.VITE_APP_BACKEND_URL
      }:${import.meta.env.VITE_APP_BACKEND_PORT}/${path}`,
      {
        method: method ? method.toUpperCase() : "GET",
        headers: headers ? headers : {},
        body: body ? createFormData(body) : undefined,
      }
    );

    const data = await response.json();

    return data;
  } catch (err: any) {
    // addError(err.toString());
  }
};
