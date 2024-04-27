import { CiLogout, CiSettings } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { baseBackendURL } from "../../env";
import { useEffect } from "react";
import { DropMenuContentProps } from "../../types/menuTypes";

const DropContentHeader = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();
  const { promiseInfo, activateFetch } = useFetch({
    url: `${baseBackendURL}/logout`,
  });

  const MenuItems: DropMenuContentProps[] = [
    {
      icon: VscAccount,
      text: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      icon: CiSettings,
      text: "Settings",
      onClick: () => {
        console.log("Settings");
      },
    },
    {
      icon: CiLogout,
      text: "Logout",
      onClick: () => {
        activateFetch();
      },
    },
  ];

  useEffect(() => {
    if (promiseInfo) {
      setAuth({ isLogged: false, user: {} });
      navigate("/");
    }
  }, [promiseInfo]);

  return (
    <>
      {MenuItems.map((element, index) => (
        <li key={index}>
          <div className="flex flex-row ml-6 mr-10 pb-3 px-3 items-center border-b border-gray-600 space-x-3 cursor-pointer">
            {element.icon && <element.icon size={25} />}
            <span onClick={element.onClick}>{element.text}</span>
          </div>
        </li>
      ))}
    </>
  );
};

export default DropContentHeader;
