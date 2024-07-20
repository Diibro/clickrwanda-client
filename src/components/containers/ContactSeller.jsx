import { useContext, useState } from "react"
import AppData from "../../Contexts/AppContext"
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { showMainNotification } from "../../utils/AdminFunctions";
import server from "../../config/Server";

const ContactSeller = () => {
     const [data,setData]  = useContext(AppData);
     const {contactAd} = data;
     const [showNumber,setShowNumber] = useState(false)
     const [message, setMessage] = useState(null);

     const closeForm = () => {
          setShowNumber(false)
          setData(prev => ({...prev, contactAd: null}));
     }

     const submitMessage = async(e) => {
          e.preventDefault();
          const data = {
               name: message.phone,
               message: message.message,
               user_id: contactAd.user_id,
               ad_id: contactAd.ad_id,
               review_type: "message"
          }

          const info = await server.reviews.addAdReview(data);
          if(info.status === 'pass'){
               showMainNotification("pass", "Successfully sent the message", closeForm);
          }else{
               showMainNotification("fail", "Some error occurred. Try again later", () => {});
          }
          
     } 

     return ( 
          <>
               {
                    contactAd ? 
                         <div className="contact-seller-view">
                              <div onClick={closeForm} className="contact-seller-close-icon"><i><ImCross /></i></div>
                              <div className="contact-seller-container">
                                   <div className="seller-profile">
                                        <img src={contactAd.profile_image} alt={`${contactAd.username}-user-image`} />
                                        <div className="profile">
                                             <b>{contactAd.username}</b>
                                             {
                                                  !showNumber ? <span onClick={() => setShowNumber(true)}>Show number</span> : <a href={`tel:${contactAd?.contact || contactAd?.user_phone || '+250 780 795 232'}`}>{contactAd?.contact || contactAd?.user_phone || '+250 780 795 232'}(Call)</a>
                                             }
                                        </div>
                                   </div>
                                   <form className="contact-form" onSubmit={async (e) => await submitMessage(e)}>
                                        <div className="group">
                                             <label htmlFor="contact-name">Name:</label>
                                             <input type="text" name="contact-name" id="contact-name" onChange={(e) => setMessage(prev => ({...prev, name: e.target.value}))}/>
                                        </div>
                                        <div className="group">
                                             <label htmlFor="contact-phone">Phone Number:</label>
                                             <input type="tel" name="contact-phone" id="contact-phone" onChange={(e) => setMessage(prev => ({...prev, phone: e.target.value}))} required />
                                        </div>
                                        <div className="group">
                                             <label htmlFor="message">Message:</label>
                                             <textarea name="message" id="message" cols={10} rows={5} required onChange={(e) => setMessage(prev => ({...prev, message: e.target.value}))}></textarea>
                                        </div>
                                        <div className="group">
                                             <input type="submit" value="Contact Seller" />
                                        </div>
                                   </form>
                                   <div className="agreement-row">
                                             
                                             <p><input type="checkbox" name="agreement-checkbox" id="agreement-checkbox" checked /> By clicking the above button, you agree on our <Link href=""> Terms and condtions</Link></p>
                                        </div>
                              </div>
                         </div>
                    : null
               }
          </>
     )
}

export default ContactSeller