// Utils
import { fetchBackendAsync } from "./api";
import { addError } from "./utils";
// Lodash
import _ from "lodash";

/**
 * validateRequired
 * @param {string} value The string value that should be validated
 * @returns {string | undefined}
 * @description Method that validates if a value is empty or not
 */
export const validateRequired = (value: string): string | undefined => {
  if (!value) {
    return "This field is required!";
  }
};

/**
 * validateMin
 * @param {string} value The value that should be validated
 * @param {number} length The minimal length that the value has to be
 * @param {string} fieldName The field name is needed, so that the validator return a more sensible message
 * @returns {string | undefined}
 * @description Method that validates if a value is shorter than a minimal length
 */
export const validateMin = (
  value: string,
  length: number,
  fieldName: string
): string | undefined => {
  if (value && value.length <= length) {
    return `${fieldName} has to be longer than ${length} characters!`;
  }
};

/**
 * validateMax
 * @param {string} value The value that should be validated
 * @param {number} length The maximum length that the value has to be
 * @param {string} fieldName The field name is needed, so that the validator return a more sensible message
 * @returns {string | undefined}
 * @description Method that validates if a value is longer than a minimal length
 */
export const validateMax = (
  value: string,
  length: number,
  fieldName: string
): string | undefined => {
  if (value && value.length > length) {
    return `${fieldName} has to be shorther than ${length} characters`;
  }
};

/**
 * validateMatchBoth
 * @param {string | number} value The value that should be validated
 * @param {string | number} revalue The other value that should be matched to the first value
 * @param {string} fieldName The field name is needed, so that the validator return a more sensible message
 * @returns {string | undefined}
 * @description Method that checks if two values are the same
 */
export const validateMatchBoth = (
  value: string | number,
  revalue: string | number,
  fieldName: string
): string | undefined => {
  if (value !== revalue) {
    return `${fieldName} must match!`;
  }
};

/**
 * validateURLRegex
 * @param {string} value The value that should be validated
 * @returns {string | undefined}
 * @description Method that check if a value is a valid url
 */
export const validateURLRegex = (value: string): string | undefined => {
  if (value.length > 0 && !/^(ftp|http|https):\/\/[^ "]+$/.test(value)) {
    return "This is not a valid URL!";
  }
};

/**
 * validateEmailRegex
 * @param {string} value The value that should be validated
 * @returns {string | undefined}
 * @description Method that checks if a value is a valid email
 */
export const validateEmailRegex = (value: string): string | undefined => {
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)) {
    return "This is not a valid email!";
  }
};

/**
 * validateEmailBackend
 * @param {string | undefined} value The value that should be checkec
 * @param {bolean} checkRegistered The boolean to check if the email is registered or the opposite
 * @returns {string | undefined}
 * @description Method that validates an email from the backend to check if it was registered
 */
export const validateEmailBackend = _.debounce(
  async (value: string | undefined, checkRegistered: boolean) => {
    if (
      value &&
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
    ) {
      try {
        const data = await fetchBackendAsync(
          `api/v1/user/validate/email?email=${encodeURIComponent(value)}`
        );

        if (!data.data.registered && checkRegistered) {
          return "This email is not registered!";
        } else if (data.data.registered && !checkRegistered) {
          return "This email is already registered!";
        }
      } catch (err: any) {
        addError(err.toString());
      }
    }
  },
  150
);

/**
 * validateUsernameRegex
 * @param {string} value The value that should be validated
 * @returns {string | undefined}
 * @description Method that checks if a value is a valid username
 */
export const validateUsernameRegex = (value: string) => {
  if (!/^[a-z0-9_-]{4,255}$/.test(value)) {
    return "This si not a valid username";
  }
};

/**
 * validateUsernameBackend
 * @param {string | undefined} value The value that should be checkec
 * @param {bolean} checkRegistered The boolean to check if the username is registered or the opposite
 * @returns {string | undefined}
 * @description Method that validates an username from the backend to check if it was registered
 */
export const validateUsernameBackend = _.debounce(
  async (value: string | undefined, checkRegistered: boolean) => {
    if (value && value.length > 4 && /^[a-z0-9_-]{4,255}$/.test(value)) {
      try {
        const data = await fetchBackendAsync(
          `api/v1/user/validate/username?username=${encodeURIComponent(value)}`
        );

        if (!data.data.registered && checkRegistered) {
          return "This username is not registered!";
        } else if (data.data.registered && !checkRegistered) {
          return "This username is already registered!";
        }
      } catch (err: any) {
        addError(err.toString());
      }
    }
  },
  150
);
