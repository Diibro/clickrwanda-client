import { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import AppData from "../../Contexts/AppContext";
import Loading from "../static/Loading";
import AdvertService from "../../services/Advert";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import AdsContainer from "./AdsContainer";

const FreeAdsSection = () => {
     const [loading, setLoading] = useState(false);
     const [ads,setAds] = useState([]);
     const [data] = useContext(AppData);
     const {freeAdsCount, adverts} = data;

     let adsNo = 12;
     let eleId = "home-free-ads-section";
     let pages = freeAdsCount / adsNo;
     if (freeAdsCount % adsNo !== 0) pages = Math.floor(pages + 1);
     const [currentPage, setCurrentPage] = useState(1);

     const pageArr = [];
     for (let i = 1; i <= pages; i++) {
          pageArr.push(i);
     }

     const changePage = async(num) => {
          if (num <= pages && num > 0) {
               try {
               setLoading(true);
               const {data:allAdverts} = await AdvertService.getAllApproved({freeAds: {limit: adsNo, offset: adsNo * num}})
               let newAds = allAdverts.freeAds;
               if (JSON.stringify(newAds) !== JSON.stringify(adverts)) {
                    if(eleId){
                    const ele = document.getElementById(eleId);
                    window.scrollTo({top: ele.offsetTop, behavior:'smooth'});
                    }
                    setAds(newAds);
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

     useEffect(() => {
          setAds(adverts);
     },[adverts])
     return (
          <div className="ads-container" id={eleId}>
               {
                    loading ? <Loading /> :
                    <>
                         {ads && ads.length  ? <AdsContainer adverts={ads} /> : null}
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
               }
          </div>
     )
}

FreeAdsSection.propTypes = {
     adverts: PropTypes.array
}

export default FreeAdsSection