
import {MdEmail} from "react-icons/md";
import {ImPhone} from "react-icons/im";
import {BsTwitter, BsLinkedin, BsFacebook} from "react-icons/bs";
import Instagram from '../../assets/instagram.svg';

const ContactBar = () => {
  return (
    <div className="w-full flex justify-center py-[2.5px]">
     <div className='w-auto px-[5px] py-[4px] bg-main-gold-100 flex items-center gap-[20px] rounded-[10px] '>
          <div className="flex items-center gap-[3px] ">
               <a className="text-main-blue-600 text-[18px] " href="tel:+250 727 559 173"><i><ImPhone/></i></a>
               <p className="hidden lg:inline-flex text-[0.8rem] text-main-blue-700 ">+250 727 559 173</p>
          </div>
          <div className="flex items-center gap-[3px]">
               <a className="text-main-blue-600 text-[20px] " href="mailto:clickrwandaltd@gmail.com"><i><MdEmail /></i></a>
               <p className="hidden lg:inline-flex text-[0.8rem] text-main-blue-700 ">clickrwandaltd@gmail.com</p>
          </div>
          <a href="https://facebook.com" className="text-main-blue-500 text-[18px] " target="_blank" rel="noreferrer"><i><BsFacebook /></i></a>
          <a href="https://twitter.com" className="text-main-blue-600 text-[18px] " target="_blank" rel="noreferrer"><i><BsTwitter /></i></a>
          <a href="https://linkedin.com" className="text-main-blue-700 text-[18px]" target="_blank" rel="noreferrer"><i><BsLinkedin /></i></a>
          <a href="http://instagram.com" className="text-[14px]" target="_blank" rel="noreferrer"><img src={Instagram} alt="" /></a>
     </div>
    </div>
  )
}

export default ContactBar;