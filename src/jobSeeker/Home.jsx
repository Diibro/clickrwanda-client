import { useContext} from "react"
import UserContext from "../Contexts/UserContext"
import { DashboardContainer, DashboardRow } from "./components/DashboardComponents";
import { DashHomeCard } from "./components/cards/Cards.dashboard";
import { ActionBtn } from "../components/dynamic/Buttons";
import { useNavigate } from "react-router-dom";
import UserPlansContainer from "./components/containers/UserPlansContainer";
import ParagraphCard from "./components/cards/ParagraphCard";
const Home = () => {
  const [user] = useContext(UserContext);
  const {userInfo, shopVisits, reviews, activePlan} = user;

  const navigate = useNavigate();
  return (
    <DashboardContainer>
      <DashboardRow>
        <h2>Welcome  {userInfo?.username}</h2>
        <div className="user-dash-content-container">
          <p>Currently subscribed in <i>{activePlan?.plan_name} plan</i>. Upgrade to increase your views on our platform.</p>
          <ActionBtn action={() => navigate("/job-seeker-dashboard/user-plans")} title="Upgrade" />
        </div>
      </DashboardRow>
      <DashboardRow>
        <h3>Shop Statistics</h3>
        <DashHomeCard content={{name:"Reviews", count:reviews?.length || 0, action: () => navigate("/job-seeker-dashboard/user-reviews")} } />
        <DashHomeCard content={{name:"Visits", count:shopVisits?.length || 0, action: () => navigate("/job-seeker-dashboard/statistics")}} />
      </DashboardRow>
      <DashboardRow>
        <h2>Membership Plans</h2>
        <ParagraphCard>
          <p>Boost the viewers of your profile by subscribing to our membership plans. With our membership plans, you get more shop views, product views form potential customers plus agent promotion of your shop and products.</p>
        </ParagraphCard>
      </DashboardRow>
      <UserPlansContainer />
    </DashboardContainer>
  )
}

export default Home