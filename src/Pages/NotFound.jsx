import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import AppData from "../Contexts/AppContext";
import { ImCross } from "react-icons/im";

const NotFound = () => {
  const navigate = useNavigate();
  const [,setData] = useContext(AppData);

  const raiseAlert = (type, message, icon) => {
    setData((prev)=> ({
         ...prev,
         alertView:{
              on: true,
              content: {type, message, icon}
         }
    }));
  }
  useEffect(() => {
    raiseAlert('fail', "The Page does not exist. Try Again!" ,<ImCross />);
    navigate('/');
  }, [] );
  return (
    <div>Page not found</div>
  )
}

export default NotFound