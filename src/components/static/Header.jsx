import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import { ActionBtn } from "../dynamic/Buttons";
import { Link } from "react-router-dom";
import DeviceView from "../../Contexts/ViewContext";
const profileImage = 'https://res.cloudinary.com/dyjahjf1p/image/upload/v1700982042/clickrwanda/logos/account_msinv8.png'


const DesktopHeader = () => {
     const [user, setUser] = useContext(UserContext);
     const {loggedIn, userInfo} = user;
     const [deviceView] = useContext(DeviceView);
     const {isMobile} = deviceView;

     const activateForm = () =>{
          if(loggedIn){
               return setUser((prev) => ({
                    ...prev, 
                    activeForm: 'add-advert'
               }))
          }else{
               return setUser((prev) => ({
                    ...prev, 
                    activeForm: 'login'
               }))
          }
          
     }
     return (
          <header className="desktop-header">
               <h1><Link to='/'>click Rwanda</Link></h1>
               <div className="header-profile">
                    {loggedIn ? <Link to="/user-dashboard" className="header-profileImage"><img src={userInfo.profile_image || profileImage} alt="" /></Link> : null}
                    <ActionBtn action={activateForm} title={!isMobile ? "Post your ad" : 'Post' } />
               </div>
               
          </header>
     )
}

export default DesktopHeader