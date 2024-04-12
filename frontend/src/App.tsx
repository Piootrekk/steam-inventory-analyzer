import { useEffect, useState } from "react";
import { AuthType } from "./types/authType";
import { fetchApiJson } from "./utils/fetchApi";
import { AuthContext } from "./context/AuthContext";
import { baseBackendURL } from "./env";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";

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

  if (auth === undefined) {
    return <div>Loading...</div>;
  } else {
    return (
      <AuthContext.Provider value={{ auth, setAuth }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );
  }
};

export default App;
