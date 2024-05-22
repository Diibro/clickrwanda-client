import { useContext, useEffect } from "react"
import UserContext from "../Contexts/UserContext"
import { DashboardContainer, DashboardRow } from "../components/dynamic/DashboardComponents";
import { DashHomeCard } from "../components/dynamic/Cards.dashboard";
const Home = () => {
  const [user] = useContext(UserContext);
  const {userInfo} = user;
useEffect(() => {
  console.log(user);
}, [])
  return (
    <DashboardContainer>
      <DashboardRow>
        <h2>welcome  {userInfo.name}</h2>
      </DashboardRow>
      <DashboardRow>
        <DashHomeCard content={{name:"Total Ads", count:3}} />
        <DashHomeCard content={{name:"Views", count:3}} />
        <DashHomeCard content={{name:"Messages", count:3}} />
        <DashHomeCard content={{name:"Reviews", count:3}} />
        <DashHomeCard content={{name:"Shop Visits", count:3}} />
        <DashHomeCard content={{name:"Ads Reported", count:3, classname:"reported"}} />
      </DashboardRow>
      <DashboardRow>

      </DashboardRow>
    </DashboardContainer>
  )
}

export default Home