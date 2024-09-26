import { useContext, useEffect} from "react"
import UserContext from "../Contexts/UserContext"
import { DashboardContainer, DashboardRow } from "./components/DashboardComponents";
import { DashHomeCard } from "./components/cards/Cards.dashboard";
import { ActionBtn } from "../components/dynamic/Buttons";
import { useNavigate } from "react-router-dom";
import UserPlansContainer from "./components/containers/UserPlansContainer";
import ParagraphCard from "./components/cards/ParagraphCard";
const Home = () => {
  const [user] = useContext(UserContext);
  const {userInfo, userAdverts, shopVisits, reviews, activePlan} = user;

  const navigate = useNavigate();

  useEffect(() => {
    console.log(userInfo);
  },[userInfo])
  return (
    <DashboardContainer>
      <DashboardRow>
        <h2>Welcome  {userInfo?.username}</h2>
        <div className="user-dash-content-container">
          <p>Advertise with Click Rwanda by posting your products. <ActionBtn action={() => navigate('/forms/add-advert')} title="Post New Ad" /></p>
        </div>
        <div className="user-dash-content-container">
          <p>At Click Rwanda we sell your products on your behalf. Click here to add commission products.</p>
          <ActionBtn title="Add product" action={() => navigate('/forms/add-advert?=commission')} />
        </div>
        <div className="user-dash-content-container">
          <p>Currently subscribed in <i>{activePlan?.plan_name} plan</i>. Upgrade to increase your sales.</p>
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
        <h2>Membership Plans</h2>
        <ParagraphCard>
          <p>Boost the viwers of your products by subscribing to our membership plans. With our membership plans, you get more shop views, product views form potential customers plus agent promotion of your shop and products.</p>
        </ParagraphCard>
      </DashboardRow>
      <UserPlansContainer />
    </DashboardContainer>
  )
}

export default Home