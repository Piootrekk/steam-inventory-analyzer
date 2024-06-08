import { FetchType } from "../types/fetchType";

export const fetchApiJson = async ({ url, type = "GET" }: FetchType) => {
  try {
    const response = await fetch(url, {
      method: type,
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
