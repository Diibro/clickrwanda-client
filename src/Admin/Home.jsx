import { FaHouseUser, FaUserSecret } from "react-icons/fa6"
import AdminRow from "./components/AdminRow"
import DashTitle from "./components/DashTitle"
import Notifier from "./components/Notifier"
import NotifierContainer from "./components/NotifierContainer"
import { RiAdvertisementFill } from "react-icons/ri"
import DashCardInfo from "./components/DashCardInfo"
import { useContext } from "react"
import { AdminContext } from "./AdminLayout"
import { getNewToday } from "../utils/dateFunctions"

const Home = () => {
  const [adminData] = useContext(AdminContext);
  const {categories,agents,shops,adverts} = adminData;
  return (
    <>
      <AdminRow>
        <DashTitle>
          <h2>Welcome to Management Dashboard</h2>
        </DashTitle>
        <NotifierContainer>
          <Notifier count={shops ? getNewToday(shops, "reg_date") :null} icon={<FaHouseUser />} url="/admin/shops" />
          <Notifier count={agents ? getNewToday(agents, "registration_date") : null} icon={<FaUserSecret />} url="/admin/agents" />
          <Notifier count={adverts ? getNewToday(adverts, "ad_date") : null} icon={<RiAdvertisementFill />} url="/admin/adverts"/>
        </NotifierContainer>
      </AdminRow>
      <AdminRow>
        <DashCardInfo count={(adverts && adverts.length) || 0} title="Adverts" newAdded={adverts ? getNewToday(adverts, "ad_date") : null} />
        <DashCardInfo count={(shops && shops.length) || 0} title="Shops" newAdded={shops ? getNewToday(shops, "reg_date") :null}/>
        <DashCardInfo count={(agents && agents.length) || 0} title="Agents" newAdded={agents ? getNewToday(agents, "registration_date") : null} />
        <DashCardInfo count={(categories && categories.length) || 0} title="Categories" />
      </AdminRow>
    </>
  )
}

export default Home