// import ApiTest from "./components/ApiTest";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import { AuthType } from "./types/authType";
import { fetchApiJson } from "./utils/fetchApi";
import { AuthContext } from "./context/AuthContext";
import { baseBackendURL } from "./env";
import React from "react";

const App = () => {
  const [auth, setAuth] = useState<AuthType>({
    isLogged: undefined,
    user: {},
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userData = await fetchApiJson(`${baseBackendURL}/is-logged`);
      setAuth(userData);
      console.log(userData);
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  if (auth === null) {
    return <div>Loading...</div>;
  } else {
    return (
      <AuthContext.Provider value={{ auth, setAuth }}>
        <React.StrictMode>
          <Header />
        </React.StrictMode>
      </AuthContext.Provider>
    );
  }
};

export default App;
