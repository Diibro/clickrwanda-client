import {  useEffect, useState } from "react"
import DashShopCard from "../cards/DashShopCard";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import PropTypes from "prop-types";

const ShopsContainer = ({shops}) => {
     const [currentPage, setCurrentPage] = useState(1);
     const [shopsRendered, setShopRendered] = useState(null);

     const pageArr = [];
     let shopNo = 20;
     let pages = shops && shops.length / shopNo;

     if(shops && shops.length % shopNo !== 0) pages = Math.floor(pages + 1);

     for(let i = 1; i <= pages; i++){
          pageArr.push(i);
     }

     const changePage = (num) => {
          if(num <= pages && num > 0 ){
               try {
                    let newShops = shops.slice((num - 1) * shopNo, (num -1) * shopNo + shopNo); 
                    const containerEle = document.getElementById("admin-shops-container");
                    if(containerEle !== null){
                         window.scrollTo({top: containerEle.offsetTop, behavior: "smooth"})
                    }
                    setShopRendered(newShops);
                    setCurrentPage(num);
               } catch (error) {
                    console.log(error);
               }
          }
     }

     useEffect(() => {
          if(shops) setShopRendered(shops.slice(0, 20));
     },[shops])

     return (
          <div className="admin-shops-container" id="admin-shops-container">
               {
                    shopsRendered && shopsRendered[0] ? shopsRendered.map(shop => shop.user_type !== 'admin' ? <DashShopCard key={shop.user_id} shop={shop} /> : null) : <p>No shops Found</p>
               }
               <div className="pagination">
                    <i onClick={() => changePage(currentPage - 1)} className="nav">
                    <GrFormPrevious />
                    </i>
                    {pageArr.map((item) => item < 7 ? <span onClick={() => changePage(item)} className={`${currentPage === item ? 'active-page disabled-page' : ''}`} key={item}>{item}</span> : null)}
                    <p>.. {currentPage >= 7 && currentPage < pages ? <span className="active-page">{currentPage}</span> : null} .</p>
                    <span className={`${currentPage === pages ? 'active-page disabled-page' : ''}`} onClick={() => changePage(pages)}>{pages}</span>
                    <i onClick={() => changePage(currentPage + 1)} ><GrFormNext /></i>
               </div>
          </div>
     )
}

ShopsContainer.propTypes = {
     shops: PropTypes.array
}

export default ShopsContainer