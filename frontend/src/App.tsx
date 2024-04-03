// import ApiTest from "./components/ApiTest";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { AuthType } from "./types/authType";
import { fetchApiJson } from "./utils/fetchApi";
import { AuthContext } from "./context/AuthContext";
import { baseBackendURL } from "./env";
import React from "react";

const App = () => {
  const [auth, setAuth] = useState<AuthType>({
    isLogged: false,
    user: {},
  });
  // const [test, setTest] = useState<AuthType>({
  //   isAuthenticated: true,
  //   user: {
  //     _json: { avatarfull: "url_do_avataru" },
  //     displayName: "UserDisplayName",
  //   },
  // });

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
      <React.StrictMode>
        <AuthContext.Provider value={auth}>
          <Header />
        </AuthContext.Provider>
      </React.StrictMode>
    );
  }
};

export default App;
