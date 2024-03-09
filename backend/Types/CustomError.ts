export type CustomErrorFetch = Error & {
    response?: Response | "Unknown error occurred.";
    code?: string | "N/A";
    statusCode?: string | "N/A";
  };