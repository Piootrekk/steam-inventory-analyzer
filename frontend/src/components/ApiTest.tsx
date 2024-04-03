import { useState } from "react";
import { baseBackendURL } from "../env";
import { fetchApiJson } from "../utils/fetchApi";

const redirectToLogin = async () => {
  window.location.href = `${baseBackendURL}/login-v2`;
};

const endpoints = [
  "/is-logged",
  "/logout",
  "/protected",
  "/account",
  "/account-details",
  "/games",
  "/level",
  "/friends",
  "/items/tf2",
  "/items/cs2",
  "/items/rust",
  "/test",
];

const Test = () => {
  const [content, setContent] = useState({ message: "No data fetched!" });

  const handleClick = async (endpoint: string) => {
    const data = await fetchApiJson(`${baseBackendURL}${endpoint}`);
    setContent(data);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Test API endpoints:</h1>
        <div className="flex flex-col items-center">
          <button
            onClick={redirectToLogin}
            className="my-2 bg-slate-500 p-2 rounded-md w-40 text-white font-bold hover:bg-slate-600 transition-all duration-300 ease-in-out"
          >
            Login
          </button>
          {endpoints.map((endpoint) => (
            <button
              key={endpoint}
              className="my-2 bg-slate-500 p-2 rounded-md w-40 text-white font-bold hover:bg-slate-600 transition-all duration-300 ease-in-out"
              onClick={() => handleClick(endpoint)}
            >
              {endpoint}
            </button>
          ))}
        </div>
        <div className="mx-5 mt-7 flex flex-col items-center">
          <pre>{JSON.stringify(content, null, 2)}</pre>
        </div>
      </div>
    </>
  );
};

export default Test;
