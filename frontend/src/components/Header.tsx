import steam_login from "../assets/steam_login.png";
import { useAuthContext } from "../context/AuthContext";
import { baseBackendURL } from "../env";

const handleLogin = async () => {
  window.location.href = `${baseBackendURL}/login-v2`;
};

const Header = () => {
  const auth = useAuthContext();
  if (auth.isLogged) {
    return (
      <header className="flex justify-center mt-24">
        <img src={auth.user._json.avatarfull} alt="Steam avatar" />
        <div className="flex flex-col items-center ml-4">
          <p>{auth.user.displayName}</p>
          <button>Logout</button>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="flex justify-center mt-24">
        <button onClick={handleLogin}>
          <img src={steam_login} alt="Login with Steam" />
        </button>
      </header>
    </>
  );
};

export default Header;
