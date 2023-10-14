import {
  HTTP_MESSAGE_CONFLICT,
  HTTP_MESSAGE_INTERNAL_SERVER_ERROR,
  HTTP_MESSAGE_UNAUTHORIZED,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_UNAUTHORIZED
} from "./constants";

export default function authErrorHandler(status, errorMessage) {
  switch (status) {
    case HTTP_STATUS_CONFLICT:
      return HTTP_MESSAGE_CONFLICT;
    case HTTP_STATUS_UNAUTHORIZED:
      return HTTP_MESSAGE_UNAUTHORIZED;
    case HTTP_STATUS_INTERNAL_SERVER_ERROR:
      return HTTP_MESSAGE_INTERNAL_SERVER_ERROR;
    default:
      return errorMessage;
  }
};