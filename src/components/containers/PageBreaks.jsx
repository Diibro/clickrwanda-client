import { useNavigate } from "react-router-dom"
import { ActionBtn } from "../dynamic/Buttons"

export const BecomeSeller = () => {
     const navigate = useNavigate();
     return (
          <div className="become-seller-section">
               <div className="title">
                    <h4>Become a seller on ClickRwanda</h4>
               </div>
               <div className="content">
                    <p>Selling on ClickRwanda is a simple and fast process. Simply click on the <b>Get Started</b> button below and follow onscreen instructions and make your business known to thousands of people visiting ClickRwanda daily. </p>
                    <p>Click Here to start selling on ClickRwanda. <ActionBtn title="Get Started" action={() => navigate('/forms/signup')} /></p>
               </div>
          </div>
     )
}