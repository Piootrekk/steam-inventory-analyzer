import { AxiosError, AxiosStatic } from "axios";
import axios from "axios";

const catchErrorResponse = (axios: AxiosStatic, error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    return {
      message: axiosError.message || "No message provided",
      statusCode: axiosError.response?.status || "Unknown",
      code: axiosError.code || "Unknown",
    };
  } else return { message: "Error not specified." };
};

export const fetchAxiosResponse = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: unknown) {
    return catchErrorResponse(axios, error);
  }
};

