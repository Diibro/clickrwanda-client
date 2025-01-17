import { Link, useNavigate } from "react-router-dom"
import { MdCall, MdEmail } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { ActionBtn } from "../dynamic/Buttons";
import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import { useTranslation } from "react-i18next";

const Footer = () => {
     const {t} = useTranslation("global");
     const content = t("footer",{returnObjects:true})
     const [user] = useContext(UserContext);
     const{loggedIn} = user;
     const navigate = useNavigate();
     const getStarted = () => {
          if(!loggedIn){
               return navigate("/forms")
          }
     }
     const viewPlans = () => {
          // return navigate('/');
          return navigate('/payment-plans');
     }
     return (
     <div className='w-full bg-main-blue-700 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-[10px] px-[5%] gap-[10px] '>
          <div className="flex flex-col items-start gap-[5px] ">
               {/* <Title content={{color:textColors.white, size: titleSize.small, name: content.platforms.title}} /> */}
               <h4 className="text-gray-200 text-[1.2rem] font-bold ">{content.platforms.title}</h4>
               <div className="w-full">
                    <Link className="text-gray-400 text-[0.9rem] " to="https://www.visitmyvenue.com/" target="_blank">Visit my Venue</Link>
               </div>
          </div>
          <div className="flex flex-col items-start gap-[10px] ">
               {/* <Title content={{color:textColors.white, size: titleSize.small, name: content.address.title}} /> */}
               <h4 className="w-full text-gray-200 text-[1.2rem] font-bold ">{content.address.title}</h4>
               <div className="w-full flex items-start gap-[5px] flex-col ">
                    <a className="text-gray-400 flex items-center gap-[2.5px] text-[0.8rem]  " href="tel:+250 727 559 173" rel="noreferrer" target="_blank"><i className="text-[18px] text-green-600 "><MdCall /></i> {content.address.callUs}: +250 727 559 173 </a>
                    <p className="text-gray-400 flex items-center gap-[2.5px] text-[0.8rem]  " ><i className="text-[18px] "><FaLocationArrow /> </i> {content.address.location}: Kigali, Rwanda </p>
                    <a className="text-gray-400 flex items-center gap-[2.5px] text-[0.8rem] text-wrap" href="mailto:clickrwandaltd@gmail.com" rel="noreferrer" target="_blank"><i className="text-[18px] text-main-gold-500 "><MdEmail /></i> {content.address.email}: clickrwandaltd@gmail.com</a>
               </div>
          </div>
          <div className="flex flex-col items-start gap-[10px] ">
               {/* <Title content={{color:textColors.white, size: titleSize.small, name: content.advertiseHere.title}} /> */}
               <h4 className="text-gray-200 text-[1.2rem] font-bold ">{content.advertiseHere.title}</h4>
               <div className="flex flex-col items-start gap-[5px] ">
                    <p className="text-gray-400 text-[0.8rem] " >{content.advertiseHere.message1}</p>
                    <p className="text-gray-400 text-[0.8rem]">{content.advertiseHere.message2}</p>
                    <a className="text-gray-400 text-[0.8rem]" href="https://wa.me/+250 727 559 173" rel="noreferrer" target="_blank"><i className="icon whatsapp-icon"><FaWhatsapp /></i> Whatsapp: +250 727 559 173 </a>
               </div>
               <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[5px]">
                    {!loggedIn ? <ActionBtn title={content.advertiseHere.getStarted.name} action={getStarted} /> : null } 
                    <ActionBtn title={content.advertiseHere.plansButton.name}  action={viewPlans}/>
               </div>
               
          </div>
          <div className="flex flex-col items-start gap-[10px] ">
               {/* <Title content={{color:textColors.white, size: titleSize.small, name:content.supportLinks.title}} /> */}
               <h4 className="text-gray-200 text-[1.2rem] font-bold ">{content.supportLinks.title}</h4>
               <div className="flex flex-col items-start gap-[5px]">
                    {content.supportLinks.links.map((item, index) => <Link className="text-[0.9rem] text-gray-400 hover:text-main-gold-600 " key={`footer-supportlinks-${index}`} to={item.link}>{item.title}</Link>)}
                    <Link to={content.supportLinks.agentLink.link} className="text-[0.9rem] text-main-gold-500 font-bold hover:text-main-gold-600 ">{content.supportLinks.agentLink.title}</Link>
               </div>
          </div>
          
     </div>
     )
}

export default Footer