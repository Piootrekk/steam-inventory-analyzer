import { AuthType } from "./types/authType";
import { AuthContext } from "./context/AuthContext";
import { baseBackendURL } from "./env";
import { RouterProvider } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import router from "./router/router";
import { useState, useEffect } from "react";
import FullLoadingView from "./views/FullLoadingView";
import ErrorView from "./views/ErrorView";

const App = () => {
  const [auth, setAuth] = useState<AuthType>({
    isLogged: undefined,
    user: {},
  });

  const { data, isLoading, error } = useFetch<AuthType>({
    url: `${baseBackendURL}/is-logged`,
  });

  useEffect(() => {
    if (data) {
      setAuth(data);
    }
  }, [data]);

  if (isLoading) {
    return <FullLoadingView />;
  }
  if (error) {
    return <ErrorView error={error} />;
  }
  if (data) {
    return (
      <AuthContext.Provider value={{ auth, setAuth }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );
  }
};

export default App;
