import { useContext, useEffect } from "react"
import UserContext from "../Contexts/UserContext"
import { DashboardContainer, DashboardRow } from "../components/dynamic/DashboardComponents";
const Home = () => {
  const [user] = useContext(UserContext);
  const {userInfo} = user;
useEffect(() => {
  console.log(userInfo);
}, [])
  return (
    <DashboardContainer>
      <DashboardRow>
        <h2>welcome back  {userInfo.name}</h2>
      </DashboardRow>
      <DashboardRow>

      </DashboardRow>
    </DashboardContainer>
  )
}

export default Home