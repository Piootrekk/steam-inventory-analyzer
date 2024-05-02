import { AxiosError, AxiosResponse, AxiosStatic } from "axios";
import axios from "axios";

export type FetchError = {
  message: string;
  statusCode: number;
  code?: string;
};

export type FetchResponse<T> = {
  error?: FetchError;
  data?: T;
};

const catchErrorResponse = (axios: AxiosStatic, error: unknown): FetchError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    return {
      message: axiosError.message || "No message provided",
      statusCode: axiosError.response?.status || 500,
      code: axiosError.code || "Unknown",
    };
  } else {
    return {
      message: "Unknown unusual error",
      statusCode: 500,
    };
  }
};

export const fetchAxiosResponse = async <T>(
  url: string,
  method: "get" | "post" | "put" | "delete" = "get"
): Promise<Partial<FetchResponse<T>>> => {
  try {
    const response: AxiosResponse<T> = await axios({
      method: method,
      url: url,
      headers: {},
    });
    return {
      data: response.data,
    };
  } catch (error: unknown) {
    return { error: catchErrorResponse(axios, error) };
  }
};

export const fetchAxiosResponsePost = async (url: string, body: any) => {
  try {
    const response = await axios({
      method: "post",
      url: url,
      headers: {},
      data: body,
    });
    return response.data;
  } catch (error: unknown) {
    return catchErrorResponse(axios, error);
  }
};
