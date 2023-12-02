import { ActionBtn } from "../dynamic/Buttons";
import { Link } from "react-router-dom";


const DesktopHeader = () => {
     return (
          <header className="desktop-header">
               <h1><Link to='/'>click Rwanda</Link></h1>
               <ActionBtn title="Post you ad" />
               
          </header>
     )
}

export default DesktopHeader