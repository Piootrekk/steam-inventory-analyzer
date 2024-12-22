import { AxiosError } from "axios";

const convertError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) return new Error(error.response.data.message);
    if (error.request) return new Error(error.request.message);
    else return new Error("Unknown axios Error");
  } else if (error instanceof Error) {
    return error;
  } else return new Error(`Unknown error ¯\_(ツ)_/¯`);
};

export default convertError;
