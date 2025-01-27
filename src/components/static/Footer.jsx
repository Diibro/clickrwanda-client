import { Link} from "react-router-dom"
import { MdCall, MdEmail } from "react-icons/md";

import PropTypes from 'prop-types';
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
     // const [user] = useContext(UserContext);
     // const{loggedIn} = user;
     // const navigate = useNavigate();
     // const getStarted = () => {
     //      if(!loggedIn){
     //           return navigate("/forms")
     //      }
     // }
     // const viewPlans = () => {
     //      // return navigate('/');
     //      return navigate('/payment-plans');
     // }
     return (
          <footer className="w-full flex flex-col items-center justify-start gap-[10px] px-[2%] bg-main-blue-700">
               <div className='w-full  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-[10px]  gap-[10px] '>
                    <div className="flex flex-col items-start gap-[5px] ">
                         {/* <Title content={{color:textColors.white, size: titleSize.small, name: content.platforms.title}} /> */}
                         <h4 className="text-gray-200 text-[1.2rem] font-bold ">Our Platforms</h4>
                         <div className="w-full">
                              <FooterLink name="Visit My Venue" target="_blank" path="https://www.visitmyvenue.com" />
                    </div>
                    </div>
                    <div className="flex flex-col items-start gap-[10px] ">
                         {/* <Title content={{color:textColors.white, size: titleSize.small, name: content.address.title}} /> */}
                         <h4 className="w-full text-gray-200 text-[1.2rem] font-bold ">Contact Us</h4>
                         <div className="w-full flex items-start gap-[5px] flex-col ">
                              <div className="w-full flex items-center justify-start gap-[5px]"> 
                                   <i className="text-[18px] text-gray-500"><FaLocationDot /></i>
                                   <FooterLink name="Location" target="_blank" path="https://maps.app.goo.gl/ifkhZTGN9uGDWw3e9" />
                              </div>
                              <div className="w-full flex items-center justify-start gap-[5px]">
                                   <i className="text-[18px] text-green-800 "><MdCall /></i>
                                   <FooterLink name="Call Us" target="_blank" path="tel:+250 727 559 173" />
                              </div>
                              <div className="w-full flex items-center justify-start gap-[5px]">
                              <i className="text-[18px] text-gray-500 "><MdEmail /></i> 
                                   <FooterLink name="Email us" target="_blank" path="mailto:clickrwandaltd@gmail.com" />
                              </div>
                         </div>
                    </div>
                    <div className="flex flex-col items-start gap-[10px] ">
                         {/* <Title content={{color:textColors.white, size: titleSize.small, name: content.advertiseHere.title}} /> */}
                         <h4 className="text-gray-200 text-[1.2rem] font-bold ">Advertise</h4>
                         <div className="flex flex-col items-start gap-[5px]">
                              <FooterLink name="Get Started" path="/forms" />
                              <FooterLink name="Our Plans" path="/payment-plans" />
                         </div>
                    </div>
                    <div className="flex flex-col items-start gap-[10px] ">
                         {/* <Title content={{color:textColors.white, size: titleSize.small, name:content.supportLinks.title}} /> */}
                         <h4 className="text-gray-200 text-[1.2rem] font-bold ">Support Links</h4>
                         <div className="flex flex-col items-start gap-[5px]">
                              <FooterLink name="Help Center" path="/help-center" />
                              <FooterLink name="Contact Us" path="/contact-us" />
                              <FooterLink name="FAQS" path="/faqs" />
                              <FooterLink name="Become an Agent" path="/hiring" />
                         </div>
                    </div>
                    
               </div>
               <div className="w-full border-b-[1.5px] border-gray-500"></div>
               <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[10px] py-[10px]">
                    <div className="w-full flex items-center justify-start gap-[10px]">
                         <p className="text-gray-400 font-medium text-[0.9rem] ">All rights reserved &copy; 2025</p>
                    </div>
                    <div className="w-full flex items-center justify-start md:justify-end gap-[10px]">
                         <FooterLink name="Terms & Conditions" path="/terms"/>
                         <FooterLink name="Privacy Policy" path="/privacy-policy"/>
                    </div>
               </div>
          </footer>
     )
}

const FooterLink =({name,path, target}) => {
     return (
          <Link  to={path} target={target} className="text-gray-400 font-medium text-[0.9rem] hover:text-main-gold-500" >{name}</Link>
     )
}

FooterLink.propTypes = {
     name: PropTypes.string.isRequired,
     path: PropTypes.string.isRequired,
     target: PropTypes.string
}

export default Footer