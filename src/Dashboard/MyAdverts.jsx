import { useContext, useEffect, useState } from "react";
import { Loadingv2 } from "../components/static/Loading";
import { DashboardContainer, DashboardRow } from "../components/dynamic/DashboardComponents";
import server from "../config/Server";
import UserContext from "../Contexts/UserContext";
import PropTypes from 'prop-types';
import { MdVisibility } from "react-icons/md";
import { dateFormatMonth } from "../utils/dateFunctions";
import { FaEdit } from "react-icons/fa";
import { AdvertRenderer } from "../components/dynamic/Advert.componet";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdPreview from "./AdPreview";
import AdEdit from "./AdEdit";
import { getItemUrl } from "../utils/urlFunctions";
import { getData, saveData } from "../utils/storageFunctions";
import { MdDelete } from "react-icons/md";

const MyAdverts = () => {
  const [loading, setLoading] = useState(false);
  const [adverts, setAdverts] = useState([]);
  const [,setUser] = useContext(UserContext)

  const fetchAdverts = async() => {
    try {
      setLoading(true);
      const res = await server.getUserAdverts();
      console.log(res);
      if(res.status === "pass") {
        saveData('userAds',res.data, 180);
        setAdverts(res.data);
      }else{
        if(res.message === "No Authentication Token" || res.message === 'Authentication Error') setUser((prev) => ({...prev, activeForm:'login'}));
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() =>{
    try {
      if(getData('userAds')){
        setAdverts(getData('userAds'));
      }else{
        fetchAdverts();
      }
    } catch (error) {
      console.log(error);
    }
  }, [])
  return (
    <>
      <DashboardContainer>
        <DashboardRow>
          <h2>My Adverts</h2>
        </DashboardRow>
        <Routes>
          <Route path="/"  element={<DashboardRow>{adverts != "no adverts found" ? <AllAdverts content={adverts} />  : <p>No adverts found</p>}</DashboardRow>}/>
          <Route path="/preview/:params" element={<AdPreview />} />
          <Route path="/edit/:params" element={<AdEdit />} />
        </Routes>
        
      </DashboardContainer>
      {loading ? <Loadingv2 /> : null}
    </>
  )
}

const AllAdverts = ({content}) => {
  const [view, setView] = useState(window.innerWidth);
  useEffect(() => {
    setView(window.innerWidth);
  }, [window.innerWidth]);

  return(
    <>
      {content.map((item) => view > 768 ? <DashAdvert key={item.ad_id} item={item} /> : <AdvertRenderer key={item.ad_id} item={item} />)}
    </>
  )
}

const DashAdvert = ({item}) => {
  const navigate = useNavigate();
  const deleteAd = async () => {
    const check =  window.confirm("Are you sure you want to delete the advert");
    if(check) {
      window.alert("Your advert will deleted permanently");
    }else{
      return;
    }
  }
  return(
    <div className="dash-advert-row">
      <img src={item.ad_image} alt={"ad_image"} />
      <div className="row">
      <span className="ad-title">{item.ad_name}</span>
      </div>
      <div className="row">
        <span>Price:</span>
        <p>Rwf {item.ad_price}</p>
      </div>
      <div className="row">
        <span>Added on:</span>
        <p className="date">{dateFormatMonth(item.ad_date)}</p>
      </div>
      <div className="row">
        <span>status:</span> 
        <p className="status">{item?.status}</p>
      </div>
      <div className="icons">
        <span onClick={() => navigate(`/user-dashboard/user-adverts/preview/${getItemUrl(item.ad_name, item.ad_id)}`)} ><MdVisibility /></span>
        <span onClick={() => navigate(`/user-dashboard/user-adverts/edit/${getItemUrl(item.ad_name, item.ad_id)}`)}><FaEdit /></span>
        <span onClick={async () => await deleteAd()}><MdDelete /></span>
      </div>
      
    </div>
  )
}

export default MyAdverts;

AllAdverts.propTypes = {
  content: PropTypes.any
}

AllAdverts.propTypes = {
  content: PropTypes.any
}

DashAdvert.propTypes = {
  item: PropTypes.any
}