import { useContext, useEffect } from "react"
import UserContext from "../Contexts/UserContext"
import { DashboardContainer, DashboardRow } from "./components/DashboardComponents";
import { DashHomeCard } from "./components/cards/Cards.dashboard";
import { ActionBtn } from "../components/dynamic/Buttons";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [user] = useContext(UserContext);
  const {userInfo, userAdverts, shopVisits, reviews} = user;

  const navigate = useNavigate();
useEffect(() => {
  console.log(user);
  console.log(userAdverts);
}, [])
  return (
    <DashboardContainer>
      <DashboardRow>
        <h2>Welcome  {userInfo?.username}</h2>
        <div className="user-dash-content-container">
          <p>Advertise with Click Rwanda by posting your products. <ActionBtn action={() => navigate('/forms/add-advert')} title="Post New Ad" /></p>
        </div>
        <div className="user-dash-content-container">
          <p>Maximise your ad views and shop visits by upgrading to our VIP membership plans. Click the button below:</p>
          <ActionBtn action={() => navigate("/user-dashboard/user-plans")} title="Upgrade" />
        </div>
      </DashboardRow>
      <DashboardRow>
        <h3>Shop Statistics</h3>
        <DashHomeCard content={{name:"Total Ads", count: userAdverts?.length || 0, action: () => navigate("/user-dashboard/user-adverts")}} />
        <DashHomeCard content={{name:"Reviews", count:reviews?.length || 0, action: () => navigate("/user-dashboard/user-reviews")} } />
        <DashHomeCard content={{name:"Visits", count:shopVisits?.length || 0, action: () => navigate("/user-dashboard/statistics")}} />
        <DashHomeCard content={{name:"Rejected Ads", count:0, classname:"reported"}} />
      </DashboardRow>
      <DashboardRow>

      </DashboardRow>
    </DashboardContainer>
  )
}

export default Home