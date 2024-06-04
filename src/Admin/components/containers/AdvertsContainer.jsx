import PropTypes from "prop-types";
import DashAdvertCard from "../cards/DashAdvertCard";
import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const AdvertsContainer = ({adverts}) => {
     const [adsRendered, setAdsRendered] = useState(null);
     const [currentPage, setCurrentPage] = useState(1);

     const pageArr = [];
     let adsNo = 50;
     let pages = adverts && adverts.length / adsNo;
     if(adverts && adverts.length % adsNo !== 0 ) pages = Math.floor(pages + 1);
     
     for(let i = 1; i <= pages; i++){
          pageArr.push(i);
     }

     useEffect(() => {
          if(adverts) setAdsRendered(adverts.slice(0, 50));
     },[adverts]);
     
     const changePage = (num) => {
          if(num <= pages && num > 0){
               try {
                    let newAds = adverts.slice((num - 1) * adsNo, (num -1) * adsNo + adsNo);
                    const containerEle = document.getElementById("admin-adverts-container-id");
                    if(containerEle !== null ){
                         window.scrollTo({top: containerEle.offsetTop, behavior: "smooth"});
                    }
                    setAdsRendered(newAds);
                    setCurrentPage(num);
               } catch (error) {
                    console.log(error);
               }
          }
     }
     return (
     <div className="admin-adverts-container" id="admin-adverts-container-id">
          {
               !adverts || !adverts[0] ? 
               <p>No adverts found</p> :
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

               {adsRendered && adsRendered.map((advert) => <DashAdvertCard advert={advert} key={advert.ad_id} />)}

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

AdvertsContainer.propTypes = {
     adverts: PropTypes.array.isRequired
}
export default AdvertsContainer