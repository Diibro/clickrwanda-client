import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/static/Loading";
import { DashboardContainer, DashboardRow } from "../components/dynamic/DashboardComponents";
import server from "../config/Server";
import PropTypes from 'prop-types';
import { MdVisibility } from "react-icons/md";
import { dateFormatMonth } from "../utils/dateFunctions";
import { FaEdit } from "react-icons/fa";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdPreview from "./AdPreview";
import AdEdit from "./AdEdit";
import { getItemUrl } from "../utils/urlFunctions";
import { getData, saveData } from "../utils/storageFunctions";
import { MdDelete } from "react-icons/md";
import AppData from "../Contexts/AppContext";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { LoadingAd } from "../components/dynamic/LoadinComponents";

const MyAdverts = () => {
  const [loading, setLoading] = useState(false);
  const [adverts, setAdverts] = useState([]);
  const navigate = useNavigate();

  const fetchAdverts = async() => {
    try {
      setLoading(true);
      console.log("loading set here");
      const res = await server.getUserAdverts();
      console.log(res);
      if(res.status === "pass") {
        saveData('userAds',res.data, 180);
        setAdverts(res.data);
        setLoading(false);
      }else{
        if(res.message === "No Authentication Token" || res.message === 'Authentication Error') navigate("/forms/login");
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
        setLoading(false);
      }else{
        (async() => await fetchAdverts())();
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
          <Route path="/"  element={<DashboardRow>{adverts != "no adverts found" ? <AllAdverts content={{adverts, loading}} />  : <p>No adverts found</p>}</DashboardRow>}/>
          <Route path="/preview/:params" element={<AdPreview />} />
          <Route path="/edit/:params" element={<AdEdit />} />
        </Routes>
        
      </DashboardContainer>
    </>
  )
}

const AllAdverts = ({content}) => {
  const {loading, adverts} = content;
  console.log(adverts);
  return(
    <>
      {!loading && adverts && adverts[0] ? 
      <DashVerticalAds ads={adverts} adsNo={20} eleId={"user-dashboard-adverts"} />
      :<Loading /> 
      }
      
    </>
  )
}


const DashVerticalAds = ({ ads, adsNo, eleId }) => {
  const [adsViewed, setAdsViewed] = useState([...ads.slice(0,adsNo)]);
  const [loading, setLoading] = useState(false);

  let pages = ads.length / adsNo;
  if (ads.length % adsNo !== 0) pages = Math.floor(pages + 1);
  const [currentPage, setCurrentPage] = useState(1);

  const pageArr = [];
  for (let i = 1; i <= pages; i++) {
    pageArr.push(i);
  }

  const changePage = (num) => {
    console.log("am clicked to change the page but am not worrking!!");
    if (num <= pages && num > 0) {
      try {
        setLoading(true);
        let newAds = ads.slice((num - 1) * adsNo, (num - 1) * adsNo + adsNo);
        if (JSON.stringify(newAds) !== JSON.stringify(adsViewed)) {
          if(eleId){
            const ele = document.getElementById(eleId);
            window.scrollTo({top: ele.offsetTop, behavior:'smooth'});
          }
          setAdsViewed(newAds);
          setCurrentPage(num);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      return;
    }
  };

  return (
    <div className="ads-container" id={eleId}>
      {adsViewed && adsViewed[0] && !loading ? (
        <>
          <div className="pagination">
            <i onClick={() => changePage(currentPage - 1)} className="nav">
              <GrFormPrevious />
            </i>
            {pageArr.map((item) => item < 7 ? <span onClick={() => changePage(item)} className={`${currentPage === item ? 'active-page disabled-page' : ''}`} key={item}>{item}</span> : null)}
            <p>.. {currentPage >= 7 && currentPage < pages ? <span className="active-page">{currentPage}</span> : null} .</p>
            <span className={`${currentPage === pages ? 'active-page disabled-page' : ''}`} onClick={() => changePage(pages)}>{pages}</span>
            <i onClick={() => changePage(currentPage + 1)} ><GrFormNext /></i>
          </div>
          {adsViewed.map(item => (
            <React.Suspense key={item.ad_id} fallback={<LoadingAd />}>
              <DashAdvert item={item} />
            </React.Suspense>
          ))}
          <div className="pagination">
            <i onClick={() => changePage(currentPage - 1)} className="nav">
              <GrFormPrevious />
            </i>
            {pageArr.map((item) => item < 7 ? <span onClick={() => changePage(item)} className={`${currentPage === item ? 'active-page disabled-page' : ''}`} key={item}>{item}</span> : null)}
            <p>.. {currentPage >= 7 && currentPage < pages ? <span className="active-page">{currentPage}</span> : null} .</p>
            <span className={`${currentPage === pages ? 'active-page disabled-page' : ''}`} onClick={() => changePage(pages)}>{pages}</span>
            <i onClick={() => changePage(currentPage + 1)} ><GrFormNext /></i>
          </div>
        </>
      ) : <Loading />}
    </div>
  );
};

const DashAdvert = ({item}) => {
  const navigate = useNavigate();
  const [,setData] = useContext(AppData);
  const raiseAlert = (type, message, icon) => {
    setData((prev)=> ({
         ...prev,
         alertView:{
              on: true,
              content: {type, message, icon}
         }
    }));
}
  const deleteAd = async () => {
    const check =  window.confirm("Are you sure you want to delete the advert");
    if(check) {
      if(window.confirm("Your advert will deleted permanently")){
        const res = await server.deleteUserAd({ad_id:item.ad_id});
        console.log(res);
        if(res){
          if(res.status === "pass"){
            raiseAlert('success', `${res.message}`, <TiTick />)
            sessionStorage.removeItem('userAds');
            navigate('/user-dashboard/user-adverts');
            return window.location.reload();

          }else{
            return raiseAlert('fail', `${res.message} .Try again`, <ImCross />);
          }
        }else{
          return raiseAlert('fail', "Network Error. Try again", <ImCross />);
        }
        
      }
    }else{
      return;
    }
  }
  return(
    <div className="dash-advert-row">
      <div className="image-container">
        <img src={item.ad_image} alt={"ad_image"} />
      </div>
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
        <span onClick={async () => await deleteAd()} className="delete-ad-icon"><MdDelete /></span>
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

DashVerticalAds.propTypes = {
  ads: PropTypes.any,
  adsNo: PropTypes.number,
  eleId: PropTypes.any
}