import { useContext, useEffect, useState } from "react";
import { getData } from "../../utils/storageFunctions";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import AppData from "../../Contexts/AppContext";
import server from "../../config/Server";

export const AdvertsPagination = () => {
     const [,setData] = useContext(AppData)
     const totalAds = getData('totalAds');
     const [currentPage, setCurrentPage] = useState(1);
     let pages = totalAds / 50;
     if(totalAds % 50 !== 0) pages = Math.floor(pages + 1);
     const pageArr = [];
     for(let i = 1; i <= pages; i++){
          pageArr.push(i);
     }

     const changePage = async (num) =>{
          if(num <= pages && num > 0){
               try {
                    const ele = document.getElementById("home-new-ads");
                    window.scrollTo({top: ele.offsetTop, behavior:'smooth'});
                    setData((prev) => ({...prev, changingPage: true}));
                    const {generalAds:newAds} = await server.get('adverts', {page: num});
                    setData((prev) => ({...prev, adverts:newAds}));
                    setCurrentPage(num);
               } catch (error) {
                    console.log(error);
               }finally{
                    setData((prev) => ({...prev, changingPage: false}));
               }
          }else{
               return;
          }
          
     } 

     return (
          <div className="pagination">
               <i onClick={ async() =>await changePage(currentPage - 1)} className="nav"><GrFormPrevious /></i>
               {pageArr.map((item) => item < 7 ? <span onClick={async() => await changePage(item)} className={`${currentPage === item ? 'active-page' : ''}`} key={item}>{item}</span> : null )}
               <p>.. {currentPage >= 7 && currentPage < pages ? <span className="active-page">{currentPage}</span> : null } .</p>
               <span className={`${currentPage === pages ? 'active-page' : ''}`} onClick={async() => await changePage(pages)}>{pages }</span>
               <i onClick={async() => await changePage(currentPage + 1)} ><GrFormNext /></i>
          </div>
     )
}