import { useState } from "react";
import { baseBackendURL } from "../env";

const fetchApiJson = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
  });
  return await response.json();
};

const fetchLogin = async () => {
  //   const response = await fetch(`${baseBackendURL}/login`, {
  //     method: "GET",
  //     credentials: "include",
  //   });
  window.location.href = `${baseBackendURL}/login`;
};

const endpoints = [
  "/logout",
  "/protected",
  "/account",
  "/account-details",
  "/games",
  "/level",
  "/friends",
  "/items/:game",
  "/test",
];

const Test = () => {
  const [content, setContent] = useState("NO DATA FETCHED YET");

  const handleClick = async (endpoint: string) => {
    const data = await fetchApiJson(`${baseBackendURL}${endpoint}`);
    setContent(JSON.stringify(data));
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Test API endpoints:</h1>
        <div className="flex flex-col items-center">
          <button
            onClick={fetchLogin}
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
        <div className=" mt-7 flex flex-col items-center">
          <p>{content}</p>
        </div>
      </div>
    </>
  );
};

export default Test;
