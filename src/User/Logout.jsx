import { SubmitButton } from "../components/dynamic/Buttons";
import { Loadingv2 } from "../components/static/Loading";
import { useContext, useState } from "react";
import server from "../config/Server";
import UserContext from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { showMainNotification } from "../utils/AdminFunctions";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const [,setUser] = useContext(UserContext);
  const navigate = useNavigate();
  
  const logOut = async () => {
    try {
      setLoading(true);
      const res = await server.logout();
      if(res.status === "success"){
        sessionStorage.removeItem('userData');
        sessionStorage.removeItem('userAds');
        document.cookie = "user-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser((prev) => ({
          ...prev,
          userInfo: null,
          loggedIn: false,
        }));
        showMainNotification('pass', 'You have been logged out', () => navigate('/'))
      }else{
        showMainNotification('fail', 'Server error. please try again', () => {});
      }
    } catch (error) {
      showMainNotification('fail', 'Failed to log out. Refresh Page', () => {});
    }finally{
      setLoading(false);
    }
  } 
  return (
    <div>
      <SubmitButton content={{action: logOut, title: "Log out"}} />
      {loading ? <Loadingv2 /> : null}
    </div>
  )
}

export default Logout;