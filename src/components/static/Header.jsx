import { useContext, useEffect, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import { ActionBtn } from "../dynamic/Buttons";
import { Link, useNavigate } from "react-router-dom";
import DeviceView from "../../Contexts/ViewContext";
import AppData from "../../Contexts/AppContext";
const profileImage = 'https://res.cloudinary.com/dyjahjf1p/image/upload/v1700982042/clickrwanda/logos/account_msinv8.png';
import Logo from '../../assets/logo/clickrwanda.png';
import { useTranslation } from "react-i18next";
import LanguageChanger from "./LanguageChanger";

const DesktopHeader = () => {
     const [t] = useTranslation("global");
     const content = t("header", {returnObjects:true});
     const [user] = useContext(UserContext);
     const [,setData] = useContext(AppData);
     const {loggedIn, userInfo, role} = user;
     const [deviceView] = useContext(DeviceView);
     const {isTablet,isMobile} = deviceView;
     const [navOn, setNavOn] = useState(false);
     const navigate = useNavigate();
     const agentToken = sessionStorage.getItem("agentToken");
     const [showAddAd,setShowAddAd] = useState(true);

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

     useEffect(() => {
          if(!loggedIn || role === 'seller'){
               setShowAddAd(true);
          }else{
               setShowAddAd(false);
          }
     },[user]);

     return (
          <header className="desktop-header">
               <Link to='/'><img src={Logo} alt="clickrwanda" className="header-logo-image" /></Link>
               <div className="header-profile">
                    <LanguageChanger />
                    {!loggedIn && !agentToken ? <ActionBtn action={() => navigate('/forms')} title={content.buttons[0].name} /> : null}
                    {loggedIn || agentToken ? <Link onClick={showHeader} to={ userInfo?.user_type === 'seller' ? "/user-dashboard" : userInfo?.user_type === 'job-seeker' ? "/job-seeker" : agentToken ? "/agent" : "/admin"} className="header-profileImage"><img src={userInfo?.profile_image || profileImage} alt="" /></Link> : null}
                    {showAddAd ? <ActionBtn action={activateForm} title={isTablet || isMobile ? content.buttons[1].name : content.buttons[1].name } /> : null}
               </div>
               
          </header>
     )
}

export default DesktopHeader