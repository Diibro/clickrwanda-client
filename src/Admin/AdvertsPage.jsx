import {useEffect, useState } from "react"
import AdminRow from "./components/AdminRow"
import DashTitle from "./components/DashTitle"
import AdvertsContainer from "./components/containers/AdvertsContainer"
import AdminSearchForm from "./components/forms/AdminSearchForm"
import { searchByKey } from "../utils/filterFunctions"
import { Link, Route, Routes, useLocation } from "react-router-dom"
import Loading from "../components/static/Loading"
import AdminService from '../services/Admin';

const AdvertsPage = () => {
     return (
     <>
          <AdminRow>
               <DashTitle><h2>Manage Adverts</h2></DashTitle>
          </AdminRow>
          <AdminAdvertsNavbar />
          <Routes>
               <Route path="/" index element={<ApprovedAds/>}/>
               <Route path="/pending" element={<PendingAds />} />
               <Route path="/approved-commission-ads" element={<ApprovedCommissionAds />}  />
               <Route path="/pending-commission-ads" element={<PendingCommissionAds />} />
               <Route path="/rejected-ads" element={<RejectedAds />} />
          </Routes>
          
     </>
     )
}

const AdminAdvertsNavbar = () =>{
     const location = useLocation();
     const [activePath,setActivePath] = useState('/');

     useEffect(() => {
          setActivePath(() => location.pathname.split("/")[3] || location.pathname.split("/")[2])
          console.log(activePath);
     }, [location.pathname])
     return (
          <div className="admin-agents-nav-bar">
               <Link to="/admin/adverts" className={activePath === "adverts" ? 'active' : ''}>Approved Ads</Link>
               <Link to="/admin/adverts/pending" className={activePath === "pending" ? 'active' : ''}>Pending ads</Link>
               <Link to="/admin/adverts/approved-commission-ads" className={activePath === "approved-commission-ads" ? 'active' : ''}>Approved Commision Ads</Link>
               <Link to="/admin/adverts/pending-commission-ads" className={activePath === "pending-commission-ads" ? 'active' : ''}>Pending Commision Ads</Link>
               <Link to="/admin/adverts/rejected-ads" className={activePath === "rejected-ads" ? 'active' : ''} >Rejected Ads</Link>
          </div>
     )
}

const PendingAds = () => {
     const [ads,setAds] = useState(null);
     const [displayAds, setDisplayAds] = useState([]);
     const [loading,setLoading] = useState(false);

     const handleSearch = (e) => {
          const searchValue = e.target.value;
          setDisplayAds(searchByKey(ads, "ad_name", searchValue));
     }
     
     const fetchAds = async() => {
          try {
               setLoading(true);
               const res = await AdminService.getAdverts('pending-ads');
               if(res) {
                    setAds(res.data);
                    setDisplayAds(res.data);
               }
          } catch (error) {
               console.log(error);
          }finally{
               setLoading(false);
          }
     }

     useEffect(() => {
          (async() => await fetchAds())();
     },[])

     return (
          <AdminRow>
               
               <AdminSearchForm searchHandler={handleSearch} searchMessage="Search Adverts" />
               {loading ? <Loading/> :  displayAds && displayAds.length ? <AdminRow><AdvertsContainer adverts={displayAds} /></AdminRow> : <AdminRow><p className="no-ads-found">No ads found</p></AdminRow> }
          </AdminRow>
     )
}

const ApprovedAds = () => {
     const [ads,setAds] = useState(null);
     const [displayAds, setDisplayAds] = useState([]);
     const [loading,setLoading] = useState(false);

     const handleSearch = (e) => {
          const searchValue = e.target.value;
          setDisplayAds(searchByKey(ads, "ad_name", searchValue));
     }

     const fetchAds = async() => {
          try {
               setLoading(true);
               const res = await AdminService.getAdverts('approved-ads');
               if(res) {
                    setAds(res.data);
                    setDisplayAds(res.data);
               }
          } catch (error) {
               console.log(error);
          }finally{
               setLoading(false);
          }
     }

     useEffect(() => {
          (async() => await fetchAds())();
     },[])
     return (
          <AdminRow>
               <AdminSearchForm searchHandler={handleSearch} searchMessage="Search Adverts" />
               {loading ? <Loading/> :  displayAds && displayAds.length ? <AdminRow><AdvertsContainer adverts={displayAds} /></AdminRow> : <AdminRow><p className="no-ads-found">No ads found</p></AdminRow> }
          </AdminRow>
     )
}

const PendingCommissionAds = () => {
     const [ads,setAds] = useState(null);
     const [displayAds, setDisplayAds] = useState([]);
     const [loading,setLoading] = useState(false);

     const handleSearch = (e) => {
          const searchValue = e.target.value;
          setDisplayAds(searchByKey(ads, "ad_name", searchValue));
     }
     const fetchAds = async() => {
          try {
               setLoading(true);
               const res = await AdminService.getAdverts('pending-commission-ads');
               if(res) {
                    setAds(res.data);
                    setDisplayAds(res.data);
               }
          } catch (error) {
               console.log(error);
          }finally{
               setLoading(false);
          }
     }

     useEffect(() => {
          (async() => await fetchAds())();
     },[])
     return (
          <AdminRow>
               <AdminSearchForm searchHandler={handleSearch} searchMessage="Search Adverts" />
               {loading ? <Loading/> :  displayAds && displayAds.length ? <AdminRow><AdvertsContainer adverts={displayAds} /></AdminRow> : <AdminRow><p className="no-ads-found">No ads found</p></AdminRow> }
          </AdminRow>
     )
}

const ApprovedCommissionAds = () => {
     const [ads,setAds] = useState(null);
     const [displayAds, setDisplayAds] = useState([]);
     const [loading,setLoading] = useState(false);

     const handleSearch = (e) => {
          const searchValue = e.target.value;
          setDisplayAds(searchByKey(ads, "ad_name", searchValue));
     }

     const fetchAds = async() => {
          try {
               setLoading(true);
               const res = await AdminService.getAdverts('approved-commission-ads');
               if(res) {
                    setAds(res.data);
                    setDisplayAds(res.data);
               }
          } catch (error) {
               console.log(error);
          }finally{
               setLoading(false);
          }
     }

     useEffect(() => {
          (async() => await fetchAds())();
     },[])
     return (
          <AdminRow>
               <AdminSearchForm searchHandler={handleSearch} searchMessage="Search Adverts" />
               {loading ? <Loading/> :  displayAds && displayAds.length ? <AdminRow><AdvertsContainer adverts={displayAds} /></AdminRow> : <AdminRow><p className="no-ads-found">No ads found</p></AdminRow> }
          </AdminRow>
     )
}

const RejectedAds = () => {
     const [ads,setAds] = useState(null);
     const [displayAds, setDisplayAds] = useState([]);
     const [loading,setLoading] = useState(false);

     const handleSearch = (e) => {
          const searchValue = e.target.value;
          setDisplayAds(searchByKey(ads, "ad_name", searchValue));
     }

     const fetchAds = async() => {
          try {
               setLoading(true);
               const res = await AdminService.getAdverts('rejected-ads');
               if(res) {
                    setAds(res.data);
                    setDisplayAds(res.data);
               }
          } catch (error) {
               console.log(error);
          }finally{
               setLoading(false);
          }
     }

     useEffect(() => {
          (async() => await fetchAds())();
     },[])
     return (
          <AdminRow>
               <AdminSearchForm searchHandler={handleSearch} searchMessage="Search Adverts" />
               {loading ? <Loading/> :  displayAds && displayAds.length ? <AdminRow><AdvertsContainer adverts={displayAds} /></AdminRow> : <AdminRow><p className="no-ads-found">No ads found</p></AdminRow> }
          </AdminRow>
     )
}

export default AdvertsPage
