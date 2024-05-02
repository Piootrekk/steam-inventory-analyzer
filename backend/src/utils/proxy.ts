import { FetchResponse, fetchAxiosResponse } from "./fetchResponse";

export const proxyLinksGET = [
  "https://express-proxy.azurewebsites.net/get/",
  "https://thingproxy.freeboard.io/fetch/",
  "https://express-proxy-jnve.onrender.com/get/",
];

export const initProxyRandom = (url: string) => {
  return proxyLinksGET[Math.floor(Math.random() * proxyLinksGET.length)] + url;
};

export const initProxy = (url: string) => {
  return proxyLinksGET[2] + url;
};

const fetchAxiosResponseProxy = async <T>(
  url: string
): Promise<Partial<FetchResponse<T>>> => {
  try {
    const encodedUrl = encodeURI(url);
    const response = await fetchAxiosResponse<T>(initProxy(encodedUrl));
    return {
      data: response.data,
    };
  } catch (error: unknown) {
    throw error;
  } finally {
    console.log(`Proxying: ${initProxy(url)}`);
  }
};

export default fetchAxiosResponseProxy;
