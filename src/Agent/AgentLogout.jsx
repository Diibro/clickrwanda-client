import { useContext, useEffect } from "react"
import { AgentContext } from "./AgentLayout";
import UserContext from "../Contexts/UserContext";
import { showMainNotification } from "../utils/AdminFunctions";

const AgentLogout = () => {
     const [,setAgentData] = useContext(AgentContext);
     const [,setUser] = useContext(UserContext);

     const logoutAgent = () => {
          sessionStorage.removeItem("agentToken");
          sessionStorage.removeItem("agentData");
          setAgentData((prev) =>  ({
               ...prev,
               logged: false
          }));
          setUser((prev) => ({
               ...prev,
               loggedIn: false,
               userInfo: {}
          }))
          return showMainNotification("pass", "you have been logged out", () => {})
     }

     useEffect(() =>  {
          logoutAgent();
     },[])
     return (
          <>
               
          </>
     )
}

export default AgentLogout