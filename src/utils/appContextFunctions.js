import { useContext } from "react"
import AppData from "../Contexts/AppContext"

export const RaiseAlert = (type, message, icon) => {
     const [,setData] = useContext(AppData);
     return setData((prev) => ({
          ...prev,
          alertView:{
               on: true,
               content: {type, message, icon}
          }
     }))

}
