import { ImCross } from "react-icons/im";
import { SubmitButton } from "../components/dynamic/Buttons";
import { Loadingv2 } from "../components/static/Loading";
import { useContext, useState } from "react";
import AppData from "../Contexts/AppContext";
import server from "../config/Server";
import UserContext from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const [,setData] = useContext(AppData);
  const [,setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const raiseAlert = (type, message, icon) => {
    setData((prev)=> ({
         ...prev,
         alertView:{
              on: true,
              content: {type, message, icon}
         }
    }));
}
  const logOut = async () => {
    try {
      setLoading(true);
      const res = await server.logout();
      if(res.status === "success"){
        sessionStorage.removeItem('userData');

        setUser((prev) => ({
          ...prev,
          userInfo: null,
          loggedIn: false,
        }));
        raiseAlert('success', 'You have been logged out', <TiTick />)
        navigate('/');
      }else{
        raiseAlert('fail', 'Server error. please try again', <ImCross />);
      }
    } catch (error) {
      raiseAlert('fail', 'Failed to log out. Refresh Page', <ImCross />);
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