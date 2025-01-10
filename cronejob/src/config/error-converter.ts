import { AxiosError } from "axios";

type TCustomError = {
  message: string;
  status?: number;
  options?: ErrorOptions;
};

class CustomError extends Error {
  private codeStatus?: number;

  public constructor(error: TCustomError | unknown) {
    let message = "An unknown error occurred ¯\\_(ツ)_/¯";
    let codeStatus: number | undefined;

    if (CustomError.isCustomErrorType(error)) {
      message = error.message;
      codeStatus = error.status;
    } else if (error instanceof AxiosError && error.request) {
      message = error.request.message;
      codeStatus = 500;
    } else if (error instanceof AxiosError && error.response) {
      message =
        error.response.data?.message ||
        "An error occurred during the response.";
      codeStatus = error.response.status;
    } else if (error instanceof Error) {
      message = error.message;
    }
    super(message);
    this.codeStatus = codeStatus;
    this.name = "CustomError";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }

  public get getStatus() {
    return this.codeStatus;
  }

  public get getMessage() {
    return this.message;
  }

  private static isCustomErrorType = (
    error: unknown
  ): error is TCustomError => {
    return (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as TCustomError).message === "string"
    );
  };

  public logError = (info?: string) => {
    return `${info && info} Message: ${this.message} ${
      this.codeStatus && `, Status: ${this.codeStatus}`
    } Type: ${this.name} `;
  };
}

export default CustomError;
