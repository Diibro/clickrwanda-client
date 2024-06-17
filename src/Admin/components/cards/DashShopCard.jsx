import PropTypes from "prop-types";
import { formatTimeAgo, isNewToday } from "../../../utils/dateFunctions";
import { DeleteButton, EditButton, VerifyButton } from "../buttons/ActionButtons";
import { useContext, useEffect, useState } from "react";
import { DashAdvertCardLoad } from "./DashAdvertCard";
import { AdminContext } from "../../AdminLayout";
import Server from "../../../config/Server";
import { showNotification } from "../../../utils/AdminFunctions";

const DashShopCard = ({shop}) => {
     const [, setAdminData ] = useContext(AdminContext);
     const [isNew, setIsNew] = useState(false);
     const [loading, setLoading] = useState(false);
     const [loadMessage, setLoadMessage] = useState('loading');

     const changeStatus = async(status) => {
          try {
               setLoadMessage(status ? 'activating...' : 'Disactivating...')
               setLoading(true);
               shop.active = status;
               const formData = new FormData();
               for(const [key, value] of Object.entries(shop)){
                    if(key === "user_location"){
                         formData.append(key, JSON.stringify(value));
                    }else{
                         formData.append(key, value);
                    }
               }
               
               const res = await Server.updateUser(formData);
               if(res){
                    if(res.status === "pass"){
                         setAdminData((prev) => ({
                              ...prev, 
                              notification: {
                                   type: 'pass',
                                   message: res.message
                              }
                         }));
                    }else{
                         setAdminData((prev) => ({
                              ...prev,
                              notification: {
                                   type: "fail",
                                   message: res.message
                              }
                         }));
                    }
               }else{
                    setAdminData((prev ) => ({
                         ...prev, 
                         notification: {
                              type: "fail",
                              message: "network error"
                         }
                    }));
               }
               

          } catch (error) {
               console.log(error);
               setAdminData((prev) => ({
                    ...prev, 
                    notification: {
                         type: "fail",
                         message: "System error"
                    }
               }));

          }finally{
               setLoading(false);
               showNotification();
          }
     }

     const changeVerification = async(status) => {
          try {
               setLoadMessage(status ? 'activating...' : 'Disactivating...')
               setLoading(true);
               shop.verified = status;
               const formData = new FormData();
               for(const [key, value] of Object.entries(shop)){
                    if(key === "user_location"){
                         formData.append(key, JSON.stringify(value));
                    }else{
                         formData.append(key, value);
                    }
               }
               
               const res = await Server.updateUser(formData);
               if(res){
                    if(res.status === "pass"){
                         setAdminData((prev) => ({
                              ...prev, 
                              notification: {
                                   type: 'pass',
                                   message: res.message
                              }
                         }));
                    }else{
                         setAdminData((prev) => ({
                              ...prev,
                              notification: {
                                   type: "fail",
                                   message: res.message
                              }
                         }));
                    }
               }else{
                    setAdminData((prev ) => ({
                         ...prev, 
                         notification: {
                              type: "fail",
                              message: "network error"
                         }
                    }));
               }
               

          } catch (error) {
               console.log(error);
               setAdminData((prev) => ({
                    ...prev, 
                    notification: {
                         type: "fail",
                         message: "System error"
                    }
               }));

          }finally{
               setLoading(false);
               showNotification();
          }
     }
     useEffect(()=>{
          if(shop && isNewToday(shop.reg_date)){
               setIsNew(true);
          }
     },[])
     return (
     <div className="dash-shop-card">
          {isNew ? <span className="new-ad-tag">New</span>: null}
          <div className="row">
               <span>Shop Name: </span>
               <b>{shop.username}</b>
          </div>
          <div className="row">
               <span>Phone: </span>
               <b>{shop.user_phone}</b>
          </div>
          <div className="row">
               <span>Joined: </span>
               <b>{formatTimeAgo(shop.reg_date)}</b>
          </div>
          <div className="row">
               <EditButton title="Update" />
               {
                    shop.verified ? 
                    <EditButton title="UnVerifiy" action={async() => await changeVerification(0) }  />
                    : <VerifyButton title="Verify" action={async() => await changeVerification(1)} />
               }
               {
                    shop.active ? 
                    <DeleteButton title="Deactivate" action={async() => await changeStatus(0)} /> 
                    : <EditButton title={"Activate"} action={async() => await changeStatus(1)} />

               }
               
          </div>
          <DashAdvertCardLoad loading={loading} message={loadMessage} />
     </div>
     )
}

DashShopCard.propTypes = {
     shop: PropTypes.object
}
export default DashShopCard