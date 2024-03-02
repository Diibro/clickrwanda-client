import { Link, useNavigate } from "react-router-dom"
import Title from "../dynamic/TitleComponents";
import { textColors, titleSize } from "../styles";
import { MdCall, MdEmail } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { ActionBtn } from "../dynamic/Buttons";
import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";

const Footer = () => {
     const [user] = useContext(UserContext);
     const{loggedIn} = user;
     const navigate = useNavigate();
     const getStarted = () => {
          if(!loggedIn){
               return navigate("/forms/signup")
          }
     }
     // const viewPlans = () => {
     //      // return navigate('/');
     //      return navigate('/payment-plans');
     // }
     return (
     <div className='footer'>
          <div className="footer-col">
               <Title content={{color:textColors.white, size: titleSize.small, name: "Our platforms"}} />
               <div className="footer-content">
                    <Link to="https://www.visitmyvenue.com/" target="_blank">Visit my Venue</Link>
               </div>
          </div>
          <div className="footer-col">
               <Title content={{color:textColors.white, size: titleSize.small, name: "Our Address"}} />
               <div className="footer-content">
                    <a href="tel:+250 787260494" rel="noreferrer" target="_blank"><i className="icon call-icon"><MdCall /></i> Call us: +250787260494 </a>
                    <p><i className="icon"><FaLocationArrow /> </i> Location: Kigali, Rwanda </p>
                    <a href="mailto:info@clickrwanda.com" rel="noreferrer" target="_blank"><i className="icon"><MdEmail /></i> Email: info@clickrwanda.com</a>
               </div>
          </div>
          <div className="footer-col">
               <Title content={{color:textColors.white, size: titleSize.small, name: "Advertise Here"}} />
               <div className="footer-content">
                    <p>Advertise your business with us</p>
                    <p>Send us a direct message via:</p>
                    <a href="https://wa.me/+250 787260494" rel="noreferrer" target="_blank"><i className="icon whatsapp-icon"><FaWhatsapp /></i> Whatsapp: +250787260494 </a>
               </div>
               {!loggedIn ? <ActionBtn title="Get Started" action={getStarted} /> : null } 
               {/* <ActionBtn title="Our Plans"  action={viewPlans}/> */}
          </div>
          <div className="footer-col">
               <Title content={{color:textColors.white, size: titleSize.small, name: "Support & Links"}} />
               <div className="footer-content">
                    <Link to="/">Help Center</Link>
                    <Link to="/">Contact Us</Link>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to='/terms-&-conditions'>Terms & Conditions</Link>
                    <Link to="/">About us</Link>
                    <Link to="/hiring">Become an Agent</Link>
               </div>
          </div>
     </div>
     )
}

export default Footer