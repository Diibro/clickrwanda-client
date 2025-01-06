import { useContext, useEffect, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import { ActionBtn } from "../dynamic/Buttons";
import { Link, useNavigate } from "react-router-dom";
import DeviceView from "../../Contexts/ViewContext";
// import AppData from "../../Contexts/AppContext";
const profileImage = 'https://res.cloudinary.com/dyjahjf1p/image/upload/v1700982042/clickrwanda/logos/account_msinv8.png';
import Logo from '../../assets/logo/clickrwanda.png';
import { useTranslation } from "react-i18next";
// import LanguageChanger from "./LanguageChanger";

const navLinks = [
     {name:"Jobs", subs: [], image:"", link: "/category/Jobs?=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7"},
     {name:"Cars", subs: [], image:"", link:"/category/Vehicles?=a0d3db43-94f4-47d0-bf3d-2dab7abcb128"},
     {name:"Real Estate", subs: [], image:"", link:"/category/Property?=2187ea54-acbe-4bad-872f-40c4f8d14a09"},
     {name:"Marketplace", subs: [], image:"", link:"/market"},
     {name:"Vacation Rentals", subs: [], image:"", link:"/"},
     {name:"Services", subs: [], image:"", link:"/category/Services?=213cf0e5-453b-4d61-aded-14adcec79f37"},
     {name: "Study and work abroad", image: "", link:'/'},
     {name: "Trainings & Scholarships", image: "", link: '/'},
     // {name:"Advertise", subs: [], image:"", link:"/payment-plans"}
]

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
                    navLinks.map((link, index) => 
                         <span onClick={() => navigate(link.link)} key={`desk-navbar-${index}`} className="text-[0.7rem] text-gray-300 font-medium cursor-pointer group py-[5px] px-[10px] hover:bg-gray-700 rounded-[5px] transition-all duration-200 " >{link.name}</span>
                    )
               }
          </nav>
     )
}
const DesktopView = () => {
     const [user] = useContext(UserContext);
     // const [,setData] = useContext(AppData);
     const {loggedIn, userInfo, role} = user;
     const [deviceView] = useContext(DeviceView);
     const {isTablet,isMobile} = deviceView;
     const [navOn, setNavOn] = useState(false);
     const navigate = useNavigate();
     const agentToken = sessionStorage.getItem("agentToken");
     const [showAddAd,setShowAddAd] = useState(true);

     // const activateForm = () =>{
     //      if(loggedIn){
     //           setData((prev) => ({...prev, fetchNow: true}));
     //           return navigate('/forms/add-advert')
     //      }else{
     //           return navigate('/forms/login')
     //      }
          
     // }

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
          <header className="sticky top-0 bg-main-blue-700 px-[0.5%] py-[5px]  hidden lg:flex items-center justify-between  rounded-[5px] my-[5px] z-50 ">
               <Link to='/'><img src={Logo} alt="clickrwanda" className="w-[100px] " /></Link>
               <DeskNavbar />
               <div className="flex items-center gap-[10px]">
                    {/* <LanguageChanger /> */}
                    {!loggedIn && !agentToken ? <ActionBtn action={() => navigate('/forms')} title={"Login"} /> : null}
                    {loggedIn || agentToken ? <Link onClick={showHeader} to={ userInfo?.user_type === 'seller' ? "/user-dashboard" : userInfo?.user_type === 'job-seeker' ? "/job-seeker" : agentToken ? "/agent" : "/admin"} className="w-[40px] aspect-square rounded-full p-[2px] border-[1px] border-blue-300 "><img className="w-full h-full rounded-full" src={userInfo?.profile_image || profileImage} alt="" /></Link> : null}
                    {showAddAd ? <ActionBtn action={() => navigate('/business')} title={isTablet || isMobile ? "Add Business": "Add Business" } /> : null}
               </div>
               
          </header>
     )
}

const MobileView = () => {
     const [t] = useTranslation("global");
     const content = t("header", {returnObjects:true});
     const [user] = useContext(UserContext);
     // const [,setData] = useContext(AppData);
     const {loggedIn, userInfo, role} = user;
     const [deviceView] = useContext(DeviceView);
     const {isTablet,isMobile} = deviceView;
     const [navOn, setNavOn] = useState(false);
     const navigate = useNavigate();
     const agentToken = sessionStorage.getItem("agentToken");
     const [showAddAd,setShowAddAd] = useState(true);

     // const activateForm = () =>{
     //      if(loggedIn){
     //           setData((prev) => ({...prev, fetchNow: true}));
     //           return navigate('/forms/add-advert')
     //      }else{
     //           return navigate('/forms/login')
     //      }
          
     // }

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
          <header className=" lg:hidden sticky top-0 bg-main-blue-700 px-[0.5%] py-[5px] flex items-center justify-between  rounded-[5px] my-[5px] z-50 ">
               <Link to='/'><img src={Logo} alt="clickrwanda" className="w-[100px] " /></Link>
               <div className="flex items-center gap-[10px]">
                    {/* <LanguageChanger /> */}
                    {!loggedIn && !agentToken ? <ActionBtn action={() => navigate('/forms')} title={content.buttons[0].name} /> : null}
                    {loggedIn || agentToken ? <Link onClick={showHeader} to={ userInfo?.user_type === 'seller' ? "/user-dashboard" : userInfo?.user_type === 'job-seeker' ? "/job-seeker" : agentToken ? "/agent" : "/admin"} className="w-[40px] aspect-square rounded-full p-[2px] border-[1px] border-blue-300 "><img className="w-full h-full rounded-full" src={userInfo?.profile_image || profileImage} alt="" /></Link> : null}
                    {showAddAd ? <ActionBtn action={() => navigate('/business')} title={isTablet || isMobile ? "Add Business": "Add Business" } /> : null}
               </div>
               
          </header>
     )
}

export default DesktopHeader