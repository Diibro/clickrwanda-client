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

export const MakeMoneySection = () => {
     const navigate = useNavigate();

     return (
          <div className="make-money-section">
               <div className="title"><h3>Make money on ClickRwanda.</h3></div>
               <div className="content">
                    <div className="col">
                         <p>Sign up for agent Account and work as a ClickRwanda agent.</p>
                         <p>Click here to get started. <ActionBtn title="Become Agent" action={() => navigate('/forms/agent-signup')} /></p>
                    </div>
                    <div className="col">
                         <p>Sign up for influencer account on ClickRwanda and start earning from your followers on Social Medias.</p>
                         <p>Click here to sign up <ActionBtn title="Influencer Signup" action={() => navigate('/forms/influencer-signup')} /></p>
                    </div>
               </div>
          </div>
     )
}