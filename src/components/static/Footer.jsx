import { Link } from "react-router-dom"
import Title from "../dynamic/TitleComponents";
import { textColors, titleSize } from "../styles";
import { MdCall, MdEmail } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { ActionBtn } from "../dynamic/Buttons";
import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";

const Footer = () => {
     const [user, setUser] = useContext(UserContext);
     const{loggedIn} = user;
     const getStarted = () => {
          if(!loggedIn){
               setUser((prev) => ({...prev, activeForm: 'signup'}))
          }
     }
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
                    <a href="tel:+250727559173" rel="noreferrer" target="_blank"><i className="icon call-icon"><MdCall /></i> Call us: +250 727 559 173 </a>
                    <p><i className="icon"><FaLocationArrow /> </i> Location: Kigali, Rwanda </p>
                    <a href="mailto:info@clickrwanda.com" rel="noreferrer" target="_blank"><i className="icon"><MdEmail /></i> Email: info@clickrwanda.com</a>
               </div>
          </div>
          <div className="footer-col">
               <Title content={{color:textColors.white, size: titleSize.small, name: "Advertise Here"}} />
               <div className="footer-content">
                    <p>Advertise your business with us</p>
                    <p>Send us a direct message via:</p>
                    <a href="https://wa.me/+250727559173" rel="noreferrer" target="_blank"><i className="icon whatsapp-icon"><FaWhatsapp /></i> Whatsapp: +250727559173 </a>
               </div>
               <ActionBtn title="Get Started" action={getStarted} />
          </div>
          <div className="footer-col">
               <Title content={{color:textColors.white, size: titleSize.small, name: "Support & Links"}} />
               <div className="footer-content">
                    <Link>Help Center</Link>
                    <Link>Contact Us</Link>
                    <Link>Privacy Policy</Link>
                    <Link>Terms & Conditions</Link>
                    <Link>About us</Link>
               </div>
          </div>
     </div>
     )
}

export default Footer