import _ from "lodash";
// Services
import api from "../api";

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
        const data = await api.user.validate.email(value);

        if (!data.data.registered && checkRegistered) {
          return "This email is not registered!";
        } else if (data.data.registered && !checkRegistered) {
          return "This email is already registered!";
        }
      } catch (err: any) {
        // addError(err.toString());
      }
    }
  },
  150
);

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
        const data = await api.user.validate.username(value);

        if (!data.data.registered && checkRegistered) {
          return "This username is not registered!";
        } else if (data.data.registered && !checkRegistered) {
          return "This username is already registered!";
        }
      } catch (err: any) {
        // addError(err.toString());
      }
    }
  },
  150
);
