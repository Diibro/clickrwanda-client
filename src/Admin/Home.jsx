import { FaHouseUser, FaUserSecret } from "react-icons/fa6"
import AdminRow from "./components/AdminRow"
import DashTitle from "./components/DashTitle"
import Notifier from "./components/Notifier"
import NotifierContainer from "./components/NotifierContainer"
import { RiAdvertisementFill } from "react-icons/ri"
import DashCardInfo from "./components/DashCardInfo"
import { useContext, useEffect, useState } from "react"
import { AdminContext } from "./AdminLayout"
import { getAddedThisMonth, getAddedThisWeek, getAddedThisYear, getAddedToday, getNewToday } from "../utils/dateFunctions"
import WebVisitCard from "./components/cards/WebVisitCard"
import WebVisitsLineChart from "./components/containers/WebVisitsLineChart"
import { useNavigate } from "react-router-dom"
import adminService from "../services/Admin";

const Home = () => {
  const [adminData] = useContext(AdminContext);
  const [counts,setCounts] = useState({
    totalAds: 0, newAds:0,
    totalShops: 0, newShops:0,
    totalJobSeekers:0, newJobSeekers: 0,
    totalCategories: 0,
    totalAgents: 0, newAgents: 0,
    totalInfluencers: 0, newInfluencers:0,

  });
  const {agents,shops,adverts, webVisits} = adminData;
  const navigate = useNavigate();
  const fetchCounts = async() => {
    const res = await adminService.countAll();
    console.log(res);
    if(res){
      const {
        totalAds, newAds,
        totalShops, newShops,
        totalJobSeekers, newJobSeekers,
        totalCategories,
        totalAgents, newAgents,
        totalInfluencers, newInfluencers,
        totalCommissionAds,newCommissionAds,
        totalCommissionAdsClients, newCommissionAdsClients
      } = res.data;
      setCounts((prev) => ({
        ...prev,
        totalAds, newAds,
        totalShops, newShops,
        totalJobSeekers, newJobSeekers,
        totalCategories,
        totalAgents, newAgents,
        totalInfluencers, newInfluencers,
        totalCommissionAds,newCommissionAds,
        totalCommissionAdsClients, newCommissionAdsClients
      }) )
    }
  }

  useEffect(() => {
    (async() => await fetchCounts())();
  },[])
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
        <DashCardInfo count={counts.totalAds} title="Adverts" newAdded={counts.newAds || null} action={() => navigate("/admin/adverts") } />
        <DashCardInfo count={counts.totalShops} title="Shops" newAdded={counts.newShops || null} action={() => navigate("/admin/shops")}/>
        <DashCardInfo count={counts.totalJobSeekers} title="Job Seekers" newAdded={counts.newJobSeekers || null} action={() => navigate("/admin")}/>
        <DashCardInfo count={counts.totalAgents} title="Agents" newAdded={agents ? getNewToday(agents, "registration_date") : null} action={() => navigate("/admin/agents")} />
        <DashCardInfo count={counts.totalInfluencers} title="Influencers" newAdded={counts.newInfluencers} action={() => navigate("/admin/agents/influencers")} />
        <DashCardInfo count={counts.totalCategories} title="Categories" action={() => navigate("/admin/categories")} />
        <DashCardInfo count={(webVisits && webVisits.length) + 45000 || 0} title={"Web Visits"} newAdded={getNewToday(webVisits, "v_date")} action={() => {}} />
        <DashCardInfo count={counts.totalCommissionAds} title={"Commission Ads"} newAdded={counts.newCommissionAds} action={() => navigate('/admin/adverts/approved-commission-ads')} />
        <DashCardInfo count={counts.totalCommissionAdsClients} title={"Commission Ads Clients"} newAdded={counts.newCommissionAdsClients} action={() => navigate('/admin/messages')} />
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