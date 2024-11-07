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
        <h2 className="w-full text-[1.4rem] text-main-blue-700 font-bold px-[10px] ">Welcome  {userInfo?.username}</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] px-[10px] ">
          <div className="w-full flex flex-col p-[20px] rounded-[5px] bg-main-blue-700 items-center gap-[10px] ">
            <p className="text-[0.9rem] text-center text-white flex flex-wrap w-full ">Advertise with Click Rwanda by posting your products.</p>
              <ActionBtn action={() => navigate('/forms/add-advert')} title="Post New Ad" />
          </div>
          <div className="w-full flex flex-col p-[20px] rounded-[5px] bg-main-blue-700 items-center gap-[10px] ">
            <p className="text-[0.9rem] text-center text-white flex flex-wrap w-full ">At Click Rwanda we sell your products on your behalf. Click here to add commission products.</p>
            <ActionBtn title="Add product" action={() => navigate('/forms/add-advert?=commission')} />
          </div>
          <div className="w-full flex flex-col p-[20px] rounded-[5px] bg-main-blue-700 items-center gap-[10px] ">
            <p className="text-[0.9rem] text-center text-white flex flex-wrap w-full ">Currently subscribed in <i> {activePlan?.plan_name} plan</i>. Upgrade to increase your sales.</p>
            <ActionBtn action={() => navigate("/user-dashboard/user-plans")} title="Upgrade" />
          </div>
        </div>
        
      </DashboardRow>
      <DashboardRow>
        <h3 className="w-full text-[1.2rem] font-bold text-gray-800 px-[10px] ">Shop Statistics</h3>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px] p-[10px]">
          <DashHomeCard content={{name:"Total Ads", count: userAdverts?.length || 0, action: () => navigate("/user-dashboard/user-adverts")}} />
          <DashHomeCard content={{name:"Reviews", count:reviews?.length || 0, action: () => navigate("/user-dashboard/user-reviews")} } />
          <DashHomeCard content={{name:"Visits", count:shopVisits?.length || 0, action: () => navigate("/user-dashboard/statistics")}} />
          <DashHomeCard content={{name:"Rejected Ads", count:0, classname:"reported"}} />
        </div>
        
      </DashboardRow>
      <DashboardRow>
        <h2 className="w-full text-[1.2rem] font-bold text-gray-800 px-[10px] ">Membership Plans</h2>
        <ParagraphCard>
          <p>Boost the viwers of your products by subscribing to our membership plans. With our membership plans, you get more shop views, product views form potential customers plus agent promotion of your shop and products.</p>
        </ParagraphCard>
      </DashboardRow>
      <UserPlansContainer />
    </DashboardContainer>
  )
}

export default Home