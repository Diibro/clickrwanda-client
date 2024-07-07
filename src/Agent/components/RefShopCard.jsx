import PropTypes from "prop-types";
import { extractDateOnly } from "../../utils/dateFunctions";

export const RefShopCard = ({shop}) => {
     
     return (
          <div className="agent-ref-shop-card">
               <div className="row">
                    <span>Shop Name:</span>
                    <b>{shop.username}</b>
               </div>
               <div className="row">
                    <span>Email Address:</span>
                    <b>{shop.user_email}</b>
               </div>
               <div className="row">
                    <span>Date:</span>
                    <b>{extractDateOnly(shop.reg_date)}</b>
               </div>
               <div className="row">
                    <span>Total Ads: </span>
                    <b>{shop.total_ads}</b>
               </div>
               <>
                    {
                         shop.total_ads > 0 ?
                         <>
                         <div className="row">
                              <span>Amounted Earned:</span>
                              <b>Rwf 20</b>
                         </div>
                         </>
                         :
                         <div className="row">
                              <p className="red-paragrap">Not yet Approved to be a shop</p>
                         </div>
                    }
               </>
               
          </div>
     )
}

RefShopCard.propTypes = {
     shop: PropTypes.object
}

export default RefShopCard;