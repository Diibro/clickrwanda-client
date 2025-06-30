import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import { ActionBtn } from "../dynamic/Buttons";
import { Link, useNavigate } from "react-router-dom";
import DeviceView from "../../Contexts/ViewContext";
// import AppData from "../../Contexts/AppContext";
const profileImage = 'https://res.cloudinary.com/dyjahjf1p/image/upload/v1700982042/clickrwanda/logos/account_msinv8.png';
import Logo from '../../assets/logo/clickrwanda.png';

import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { NavLinks } from "../../data/navlinks";
import GoogleTranslate from "../GoogleTranslate";
// import LanguageChanger from "./LanguageChanger";

const DesktopHeader = () => {
     return (
          <>
               <DesktopView />
               <MobileView />
          </>
     )
}

const DeskNavbar = () => {
     const navigate = useNavigate();
     return (
          <nav className="w-auto flex items-center justify-between gap-[10px]">
               {
                    NavLinks.map((link, index) =>
                         link.link.startsWith('https://')? 
                         <a key={`desk-navbar-${index}`} rel="noreferrer" target="_blank" className="text-sm text-gray-300 font-medium cursor-pointer group py-[5px] px-[10px] hover:bg-gray-700 rounded-[5px] transition-all duration-200" href={link.link}>{link.name}</a>     : 
                         <span onClick={() => navigate(link.link)} key={`desk-navbar-${index}`} className="text-sm text-gray-300 font-medium cursor-pointer group py-[5px] px-[10px] hover:bg-gray-700 rounded-[5px] transition-all duration-200 " >{link.name}</span>
                    )
               }
          </nav>
     )
}
const DesktopView = () => {
     const [user] = useContext(UserContext);
     const {loggedIn, userInfo} = user;
     const [deviceView] = useContext(DeviceView);
     const {isTablet,isMobile} = deviceView;
     const [navOn, setNavOn] = useState(false);
     const navigate = useNavigate();
     const agentToken = sessionStorage.getItem("agentToken");

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
          <header className="sticky top-0 bg-main-blue-700 px-[0.5%] py-[5px]  hidden lg:flex items-center justify-between  rounded-[5px] my-[5px] z-50 ">
               <Link to='/'><img src={Logo} alt="clickrwanda" className="w-[100px] " /></Link>
               <DeskNavbar />
               <div className="flex items-center gap-[10px]">
                    <div id="google_translate_element" className="rounded-full cursor-pointer border border-gray-200 overflow-hidden flex items-center justify-center aspect-square bg-gray-100 p-1"></div>
                    <GoogleTranslate />
                    {/* <LanguageChanger /> */}
                    {!loggedIn && !agentToken ? <ActionBtn action={() => navigate('/forms')} title={"Login"} /> : null}
                    {loggedIn || agentToken ? <Link onClick={showHeader} to={ userInfo?.user_type === 'seller' ? "/user-dashboard" : userInfo?.user_type === 'job-seeker' ? "/job-seeker" : agentToken ? "/agent" : "/admin"} className="w-[40px] aspect-square rounded-full p-[2px] border-[1px] border-blue-300 "><img className="w-full h-full rounded-full" src={userInfo?.profile_image || profileImage} alt="" /></Link> : null}
                    
               </div>
               
          </header>
     )
}

const MobileView = () => {
  const [user] = useContext(UserContext);
  const { loggedIn, userInfo } = user || {};
//   const [deviceView] = useContext(DeviceView);
//   const { isTablet, isMobile } = deviceView || {};
  const navigate = useNavigate();
  const agentToken = sessionStorage.getItem("agentToken");
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef(null);

  // Close on click outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowNav(false);
      }
    };

    if (showNav) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNav]);

  return (
    <header className="lg:hidden sticky top-0 bg-main-blue-700 px-2 py-2 flex items-center justify-between rounded-md my-1 z-50">
      <Link to="/">
        <img src={Logo} alt="clickrwanda" className="w-[100px]" />
      </Link>

      <div className="flex items-center gap-2">
        <GoogleTranslate />
        <i
          className="text-white text-[30px] cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        >
          {showNav ? <IoClose /> : <LuMenu />}
        </i>
        {(loggedIn || agentToken) && (
          <Link
            to={
              userInfo?.user_type === "seller"
                ? "/user-dashboard"
                : userInfo?.user_type === "job-seeker"
                ? "/job-seeker"
                : agentToken
                ? "/agent"
                : "/admin"
            }
            className="w-10 h-10 rounded-full border border-blue-300 overflow-hidden"
          >
            <img
              className="w-full h-full object-cover"
              src={userInfo?.profile_image || profileImage}
              alt="profile"
            />
          </Link>
        )}
      </div>

      {/* Full-screen overlay with side nav */}
      {showNav && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div
            ref={navRef}
            className="absolute top-0 left-0 w-3/4 max-w-[300px] h-full bg-white p-4 flex flex-col gap-4 transition-transform duration-300"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
              <button onClick={() => setShowNav(false)} className="text-gray-800 text-xl">
                <IoClose />
              </button>
            </div>

            {NavLinks.map((link, index) => (
              <span
                key={`mobile-nav-${index}`}
                onClick={() => {
                  navigate(link.link);
                  setShowNav(false);
                }}
                className="text-sm font-medium text-gray-700 py-2 px-3 hover:bg-gray-200 rounded-md cursor-pointer"
              >
                {link.name}
              </span>
            ))}

            {!loggedIn && !agentToken && (
              <ActionBtn
                action={() => {
                  navigate("/forms");
                  setShowNav(false);
                }}
                title="Login"
              />
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default DesktopHeader