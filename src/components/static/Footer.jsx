import { Link } from "react-router-dom"
import Title from "../dynamic/TitleComponents";
import { textColors, titleSize } from "../styles";

const Footer = () => {
     return (
     <div className='footer'>
          <div className="footer-col">
               <Title content={{color:textColors.white, size: titleSize.small, name: "Our platforms"}} />
               <div className="footer-content">
                    <Link to="https://www.visitmyvenue.com/">visit my venue</Link>
               </div>
          </div>
          <div className="footer-col"></div>
          <div className="footer-col"></div>
          <div className="footer-col"></div>
     </div>
     )
}

export default Footer