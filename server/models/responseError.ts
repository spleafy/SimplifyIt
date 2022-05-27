export default class ResponseError {
  code?: number;
  message?: string;

  constructor(code?: number, message?: string) {
    this.code = code;
    this.message = message;
  }

  public static unauthorized() {
    return new ResponseError(403, "Unauthorized!");
  }

  public static params() {
    return new ResponseError(403, "Invalid request params!");
  }

  public static token() {
    return new ResponseError(401, "No X-Auth-Token provided!");
  }

  public static notFound() {
    return new ResponseError(404, "Resource not found!");
  }
}
