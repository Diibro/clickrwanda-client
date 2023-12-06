
import {MdEmail} from "react-icons/md";
import {ImPhone} from "react-icons/im";
import {BsTwitter, BsLinkedin, BsFacebook} from "react-icons/bs";
import Instagram from '../../assets/instagram.svg';

const ContactBar = () => {
  return (
    <div className="contact-bar">
     <div className='contact-info'>
          <div>
               <a href="tel:+250727559173"><i><ImPhone/></i></a>
               <p>+250727559173</p>
          </div>
          <div>
               <a href="#"><i><MdEmail /></i></a>
               <p>contact@clickrwanda.com</p>
          </div>
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><i><BsFacebook /></i></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer"><i><BsTwitter /></i></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><i><BsLinkedin /></i></a>
          <a href="http://instagram.com" target="_blank" rel="noreferrer"><img src={Instagram} alt="" /></a>
     </div>
    </div>
  )
}

export default ContactBar;