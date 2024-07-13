import { Link, useNavigate } from "react-router-dom"
import Title from "../dynamic/TitleComponents";
import { textColors, titleSize } from "../styles";
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
     <div className='footer'>
          <div className="footer-col">
               <Title content={{color:textColors.white, size: titleSize.small, name: content.platforms.title}} />
               <div className="footer-content">
                    <Link to="https://www.visitmyvenue.com/" target="_blank">Visit my Venue</Link>
               </div>
          </div>
          <div className="footer-col">
               <Title content={{color:textColors.white, size: titleSize.small, name: content.address.title}} />
               <div className="footer-content">
                    <a href="tel:+250 727 559 173" rel="noreferrer" target="_blank"><i className="icon call-icon"><MdCall /></i> {content.address.callUs}: +250 727 559 173 </a>
                    <p><i className="icon"><FaLocationArrow /> </i> {content.address.location}: Kigali, Rwanda </p>
                    <a href="mailto:clickrwandaltd@gmail.com" rel="noreferrer" target="_blank"><i className="icon"><MdEmail /></i> {content.address.email}: clickrwandaltd@gmail.com</a>
               </div>
          </div>
          <div className="footer-col">
               <Title content={{color:textColors.white, size: titleSize.small, name: content.advertiseHere.title}} />
               <div className="footer-content">
                    <p>{content.advertiseHere.message1}</p>
                    <p>{content.advertiseHere.message2}</p>
                    <a href="https://wa.me/+250 727 559 173" rel="noreferrer" target="_blank"><i className="icon whatsapp-icon"><FaWhatsapp /></i> Whatsapp: +250 727 559 173 </a>
               </div>
               {!loggedIn ? <ActionBtn title={content.advertiseHere.getStarted.name} action={getStarted} /> : null } 
               <ActionBtn title={content.advertiseHere.plansButton.name}  action={viewPlans}/>
          </div>
          <div className="footer-col">
               <Title content={{color:textColors.white, size: titleSize.small, name:content.supportLinks.title}} />
               <div className="footer-content">
                    {content.supportLinks.links.map((item, index) => <Link key={`footer-supportlinks-${index}`} to={item.link}>{item.title}</Link>)}
                    <Link to={content.supportLinks.agentLink.link} className="highlighted-text">{content.supportLinks.agentLink.title}</Link>
               </div>
          </div>
          
     </div>
     )
}

export default Footer