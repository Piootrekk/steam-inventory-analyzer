import { AxiosError, AxiosStatic } from "axios";

export const catchErrorResponse = (axios: AxiosStatic, error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    return {
      message: axiosError.message || "No message provided",
      statusCode: axiosError.response?.status || "Unknown",
      code: axiosError.code || "Unknown",
    };
  } else return { message: "Error not specified." };
};
