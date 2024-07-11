import { FaHouseUser, FaUserSecret } from "react-icons/fa6"
import AdminRow from "./components/AdminRow"
import DashTitle from "./components/DashTitle"
import Notifier from "./components/Notifier"
import NotifierContainer from "./components/NotifierContainer"
import { RiAdvertisementFill } from "react-icons/ri"
import DashCardInfo from "./components/DashCardInfo"
import { useContext } from "react"
import { AdminContext } from "./AdminLayout"
import { getAddedThisMonth, getAddedThisWeek, getAddedThisYear, getAddedToday, getNewToday } from "../utils/dateFunctions"
import WebVisitCard from "./components/cards/WebVisitCard"
import WebVisitsLineChart from "./components/containers/WebVisitsLineChart"
import { useNavigate } from "react-router-dom"
import AppData from "../Contexts/AppContext"

const Home = () => {
  const [adminData] = useContext(AdminContext);
  const [data] = useContext(AppData);
  const {onlineUsers} = data;
  const {categories,agents,shops,adverts, webVisits} = adminData;
  const navigate = useNavigate();
  return (
    <>
      <AdminRow>
        <DashTitle>
          <h2>Welcome to Management Dashboard</h2>
          <NotifierContainer>
            <Notifier count={shops ? getNewToday(shops, "reg_date") :null} icon={<FaHouseUser />} url="/admin/shops" />
            <Notifier count={agents ? getNewToday(agents, "registration_date") : null} icon={<FaUserSecret />} url="/admin/agents" />
            <Notifier count={adverts ? getNewToday(adverts, "ad_date") : null} icon={<RiAdvertisementFill />} url="/admin/adverts"/>
          </NotifierContainer>
        </DashTitle>
      </AdminRow>
      <AdminRow>
        <DashCardInfo count={(adverts && adverts.length) || 0} title="Adverts" newAdded={adverts ? getNewToday(adverts, "ad_date") : null} action={() => navigate("/admin/adverts") } />
        <DashCardInfo count={(shops && shops.length) || 0} title="Shops" newAdded={shops ? getNewToday(shops, "reg_date") :null} action={() => navigate("/admin/shops")}/>
        <DashCardInfo count={(agents && agents.length) || 0} title="Agents" newAdded={agents ? getNewToday(agents, "registration_date") : null} action={() => navigate("/admin/agents")} />
        <DashCardInfo count={(categories && categories.length) || 0} title="Categories" action={() => navigate("/")} />
        <DashCardInfo count={(webVisits && webVisits.length) || 0} title={"Web Visits"} newAdded={getNewToday(webVisits, "v_date")} action={() => {}} />
          <DashCardInfo count={onlineUsers} title={"Online Users"} newAdded={0} action={() => {}} />
      </AdminRow>
      <AdminRow>
        <DashTitle><h3>Website Visits</h3></DashTitle>
        <WebVisitCard content={{title:"Today", count: getAddedToday(webVisits, "v_date")?.length || 0}} />
        <WebVisitCard content={{title: "This Week", count: getAddedThisWeek(webVisits, "v_date")?.length || 0}} />
        <WebVisitCard content={{title: "This Month", count: getAddedThisMonth(webVisits, "v_date")?.length || 0}} />
        <WebVisitCard content={{title: "This Year", count: getAddedThisYear(webVisits, "v_date")?.length + 45000 || 0}} />
      </AdminRow>
      <AdminRow>
        <DashTitle><h3>Web Usage Summary</h3></DashTitle>
        {webVisits && webVisits[0]  ? <WebVisitsLineChart visits={webVisits} /> : <p>Chart showing data</p>}
      </AdminRow>
    </>
  )
}

export default Home