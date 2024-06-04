import PropTypes from "prop-types";
import { formatTimeAgo } from "../../../utils/dateFunctions";
import { capitalizeString, formatPrice } from "../../../utils/otherFunctions";
import { DeleteButton, EditButton } from "../buttons/ActionButtons";
import server from "../../../config/Server"
import { useContext } from "react";
import { AdminContext } from "../../AdminLayout";
import { showNotification } from "../../../utils/AdminFunctions";

const DashAdvertCard = ({advert}) => {
     const [adminData, setAdminData ] = useContext(AdminContext);
     const {adverts } = adminData;

     const deleteAd = async() => {
          const res = await server.deleteUserAd(advert);
          if(res.status === "pass") {
               setAdminData(prev => ({
                    ...prev,
                    adverts:adverts.filter(ad => ad.ad_id !== advert.ad_id),
                    notification: {
                         type: "pass",
                         message: res.message
                    }
               })) 
          }else {
               setAdminData(prev => ({
                    ...prev,
                    notification: {
                         type:"fail",
                         message: res.message
                    }
               }));
          }
          showNotification();
     }
     return (
     <div className="admin-advert-card">
          <div className="image-container">
               <img src={advert.ad_image} alt={advert.ad_name} width={200} />
          </div>
          <div className="description">
               <div className="row">
                    <h4>{capitalizeString(advert.ad_name)}</h4>
                    <span>Price: Rwf {formatPrice(advert.ad_price)}</span>
               </div>
               <div className="row">
                    <p>Added {formatTimeAgo(advert.ad_date)}</p>
                    <p>Status: {advert.status}</p>
               </div>
               <div className="actions">
                    <EditButton title={"Update"} action={() => console.log("trying update")} />
                    <DeleteButton title="Delete" action={deleteAd} />
               </div>
          </div>
     </div>
     )
}

DashAdvertCard.propTypes = {
     advert: PropTypes.object.isRequired
}
export default DashAdvertCard