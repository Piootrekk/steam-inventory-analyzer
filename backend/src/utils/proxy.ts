import { FetchResponse, fetchAxiosResponse } from "./fetchResponse";

export const proxyLinksGET = [
  "https://proxy-express.azurewebsites.net/get/",
  "https://express-proxy-jnve.onrender.com/get/",
  "https://thingproxy.freeboard.io/fetch/",
];

export const initProxyRandom = (url: string) => {
  return proxyLinksGET[Math.floor(Math.random() * proxyLinksGET.length)] + url;
};

export const initProxy = (url: string) => {
  return proxyLinksGET[0] + url;
};

const fetchAxiosResponseProxy = async <T>(
  url: string
): Promise<Partial<FetchResponse<T>>> => {
  try {
    const encodedUrl = initProxy(encodeURIComponent(url));
    const response = await fetchAxiosResponse<T>(encodedUrl);
    return {
      data: response.data,
    };
  } catch (error: unknown) {
    throw error;
  }
};

export default fetchAxiosResponseProxy;
