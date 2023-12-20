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

const MyAdverts = () => {
  const [loading, setLoading] = useState(false);
  const [adverts, setAdverts] = useState([]);
  const [,setUser] = useContext(UserContext)

  const fetchAdverts = async() => {
    try {
      setLoading(true);
      const res = await server.getUserAdverts();
      if(res.status === "pass") {
        sessionStorage.setItem('userAds', JSON.stringify(res.data));
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
    fetchAdverts();
    if(sessionStorage.getItem('userAds')){
      setAdverts(JSON.parse(sessionStorage.getItem('userAds')));
    }else{
      fetchAdverts();
    }
  }, [])
  return (
    <>
      <DashboardContainer>
        <DashboardRow>
          <h2>My Adverts</h2>
        </DashboardRow>
        <DashboardRow>
          {adverts != "no data found" ? <AllAdverts content={adverts} />  :"No adverts found"}
        </DashboardRow>
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
      {
        view > 768 ?
        <div className="dash-advert-title">
        <span className="ad-title">Ad Title</span>
        <span className="price">Ad Price</span>
        <span className="date">Added on</span>
        <span className="status">Status</span>
        <span className="icons">View</span>
        <span className="icons">Edit</span>
      </div> :
      null
      }
      {content.map((item) => view > 768 ? <DashAdvert key={item.ad_id} item={item} /> : <AdvertRenderer key={item.ad_id} item={item} />)}
    </>
  )
}

const DashAdvert = ({item}) => {
  return(
    <div className="dash-advert-row">
      <span className="ad-title">{item.ad_name}</span>
      <span className="price">Rwf {item.ad_price}</span>
      <span className="date">{dateFormatMonth(item.ad_date)}</span>
      <span className="status">{item?.status}</span>
      <span className="icons"><MdVisibility /></span>
      <span className="icons"><FaEdit /></span>
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