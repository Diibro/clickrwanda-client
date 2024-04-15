import { useContext, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import { ActionBtn } from "../dynamic/Buttons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DeviceView from "../../Contexts/ViewContext";
import AppData from "../../Contexts/AppContext";
const profileImage = 'https://res.cloudinary.com/dyjahjf1p/image/upload/v1700982042/clickrwanda/logos/account_msinv8.png';
import Logo from '../../assets/logo/click-rwanda-logo-flat.png';
// import { BiMenu } from "react-icons/bi";

const DesktopHeader = () => {
     const [user, setUser] = useContext(UserContext);
     const [,setData] = useContext(AppData);
     const {loggedIn, userInfo} = user;
     const [deviceView] = useContext(DeviceView);
     const {isTablet,isMobile} = deviceView;
     const [navOn, setNavOn] = useState(false);
     const location = useLocation();
     const navigate = useNavigate();

     const activateForm = () =>{
          if(loggedIn){
               setData((prev) => ({...prev, fetchNow: true}));
               return navigate('/forms/add-advert')
          }else{
               return navigate('/forms/login')
          }
          
     }

     const showHeader = () => {
          let navbar = document.getElementById("dashboard-nav-bar");
          if(loggedIn && (isMobile || isTablet)){
               if(navOn){
                    navbar.style.left = "-50%";
                    setNavOn(false);
               }else{
                    navbar.style.left = "0%";
                    setNavOn(true);
               }
          }
     }
     return (
          <header className="desktop-header">
               <Link to='/'><img src={Logo} alt="clickrwanda" className="header-logo-image" /></Link>
               
               {/* {!loggedIn ? <h1><Link to='/hiring'>We are Hiring/Akazi</Link></h1> : null} */}
               <div className="header-profile">
                    {!loggedIn ? <ActionBtn action={activateForm} title="Login" /> : null}
                    {loggedIn ? <Link onClick={showHeader} to={ location.pathname.includes("/user-dashboard") ? null : "/user-dashboard"} className="header-profileImage"><img src={userInfo.profile_image || profileImage} alt="" /></Link> : null}
                    {/* {loggedIn && (isMobile || isTablet) ? <i className="mobile-header-toggler"><BiMenu /></i> : null} */}
                    <ActionBtn action={activateForm} title={isTablet || isMobile ? "Post Free Ad" : 'Post Free Ad' } />
               </div>
               
          </header>
     )
}

export default DesktopHeader