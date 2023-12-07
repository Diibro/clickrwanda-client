import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import { ActionBtn } from "../dynamic/Buttons";
import { Link } from "react-router-dom";
import DeviceView from "../../Contexts/ViewContext";
const profileImage = 'https://res.cloudinary.com/dyjahjf1p/image/upload/v1700982042/clickrwanda/logos/account_msinv8.png'


const DesktopHeader = () => {
     const [user] = useContext(UserContext);
     const {loggedIn, userInfo} = user;
     const [deviceView] = useContext(DeviceView);
     const {isMobile} = deviceView;

     return (
          <header className="desktop-header">
               <h1><Link to='/'>click Rwanda</Link></h1>
               <div className="header-profile">
                    {loggedIn ? <Link to="/user-dashboard" className="header-profileImage"><img src={userInfo.profile_image || profileImage} alt="" /></Link> : null}
                    <ActionBtn title={!isMobile ? "Post you ad" : 'Post' } />
               </div>
               
          </header>
     )
}

export default DesktopHeader