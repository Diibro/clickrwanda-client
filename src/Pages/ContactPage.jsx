import { useNavigate } from "react-router-dom";
import { showMainNotification } from "../utils/AdminFunctions";

const ContactPage = () => {
     const navigate = useNavigate();
     const submitForm = (e) => {
          e.preventDefault();
          showMainNotification('pass', "Successfully submitted your message. Our team will be in contact soon. Thank you.", () => navigate("/"))
     }
     return (
          <div className="static-page">
               <h2>Contact Us:</h2>
               <p>Send our Technical support a suppor ticket by filling the form below:</p>
               <div className="contact-form-container">
                    <form onSubmit={(e) => submitForm(e)}>
                         <div className="group">
                              <label htmlFor="contact-email">Email Address: </label>
                              <input type="email" placeholder="johns@gmail.com..." id="contact-email" name="contact-email" required />
                         </div>
                         <div className="group">
                              <label htmlFor="contact-number">Phone Number:</label>
                              <input type="phone" placeholder="078000..." id="contact-phone" name="contact-phone" required />
                         </div>
                         <div className="group">
                              <label htmlFor="contact-message">Message: </label>
                              <textarea name="contact-message" id="contact-message" cols={10} rows={6} required></textarea>
                         </div>
                         <div className="group">
                              <input type="submit" value="Send Message" />
                         </div>
                    </form>
               </div>
               <h4>OR</h4>
               <p>Contact us directly via:</p>
               <ul>
                    <li>Call Us: <a href="tel:+250 727 559 173">+250 727 559 173</a>/<a href="tel:+250787260494">+250787260494</a></li>
                    <li>Email: <a href="mailto:clickrwandaltd@gmail.com">clickrwandaltd@gmail.com</a></li>
                    <li>Location: Kigali, Rwanda</li>
               </ul>
          </div>
     )
}

export default ContactPage