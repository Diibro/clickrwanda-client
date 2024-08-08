import PropTypes from "prop-types";
import { formatTimeAgo, isNewToday } from "../../../utils/dateFunctions";
import { capitalizeString, formatPrice } from "../../../utils/otherFunctions";
import { DeleteButton, EditButton } from "../buttons/ActionButtons";
import server from "../../../config/Server"
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../AdminLayout";
import { showNotification, toggleForms } from "../../../utils/AdminFunctions";
import { AnyImage } from "../../../components/static/Image";

const DashAdvertCard = ({advert}) => {
     const [,setAdminData ] = useContext(AdminContext);
     const [loading, setLoading] = useState(false);
     const [loadingMessage, setLoadingMessage] = useState("loading");
     const [isNew, setIsNew] = useState(false);

     const deleteAd = async() => {
          try {
               setLoadingMessage("deleting");
               setLoading(true);
               const res = await server.deleteUserAd(advert);
               if(res.status === "pass") {
                    setAdminData(prev => ({
                         ...prev,
                         notification: {
                              type: "pass",
                              message: res.message
                         }
                    }));
                    window.location.reload();
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
          } catch (error) {
               console.log(error);
          }finally{
               setLoading(false);
               setLoadingMessage("loading")
          }
          
     }

     const updateAd = async() => {
          setAdminData((prev) => ({
               ...prev, 
               activeForm: {
                    type: "advert",
                    formName: "update",
                    objFocus: advert
               }
          }))
          toggleForms(true);
     }

     useEffect(() => {
          if(advert && isNewToday(advert.ad_date)){
               setIsNew(true);
          }
     }, []);
     return (
     <div className="admin-advert-card">
          {isNew ? <span className="new-ad-tag">New</span>: null}
          <div className="image-container">
               {/* <img src={advert.ad_image} alt={advert.ad_name} width={200} /> */}
               <AnyImage image={{src: advert.ad_image, alt: advert.ad_name}} width={200} />
          </div>
          <div className="description">
               <div className="row">
                    <h4>{capitalizeString(advert.ad_name)}</h4>
                    <span>Price: Rwf {formatPrice(advert.ad_price)}</span>
                    {advert.commission ? <span>Commission: {advert.commission}%</span> : null}
                    {advert.contact ? <span>Owner: {advert.contact}</span> : null }
               </div>
               <div className="row">
                    <p>Added {formatTimeAgo(advert.ad_date)}</p>
                    <p>Status: {advert.status}</p>
               </div>
               <div className="actions">
                    <EditButton title={"Update"} action={updateAd} />
                    <DeleteButton title="Delete" action={deleteAd} />
               </div>
          </div>
          <DashAdvertCardLoad loading={loading} message={loadingMessage} />
     </div>
     )
}

export const DashAdvertCardLoad  = ({loading, message}) => {
     return (
          loading ? 
               <div className="admin-advert-card-load">
                    <span>{message}...</span>
               </div> 
          : null
     )
}

DashAdvertCardLoad.propTypes = {
     loading: PropTypes.bool,
     message: PropTypes.string
}

DashAdvertCard.propTypes = {
     advert: PropTypes.object.isRequired,
     cb: PropTypes.func
}
export default DashAdvertCard