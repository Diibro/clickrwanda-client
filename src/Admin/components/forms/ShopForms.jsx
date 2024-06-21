import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../AdminLayout";
import Loading from "../../../components/static/Loading";
import { showMainNotification, toggleForms } from "../../../utils/AdminFunctions";
import DashTitle from "../DashTitle";
import { MdAddCall } from "react-icons/md";
import { extractDateOnly } from "../../../utils/dateFunctions";
import { parseString } from "../../../utils/jsonFunctions";
import { DeleteButton, EditButton, VerifyButton } from "../buttons/ActionButtons";
import server from "../../../config/Server"
import { sortByAny } from "../../../utils/filterFunctions";

const ShopForms = () => {
     const [adminData] = useContext(AdminContext);
     const {activeForm} = adminData;
     return (
          <>
               {
                    activeForm.type === "shop" ?
                    <div className="admin-shop-form-container">
                         {activeForm.formName === "view shop" ? <ViewShopForm /> : null}
                    </div> 
                    : null
               }
          </>
     )
}

const ViewShopForm = () => {

     const [adminData,setAdminData] = useContext(AdminContext);
     const {activeForm,locations,shops} = adminData;
     const [loading,setLoading] = useState(false);
     const [activeShop, setActiveShop] = useState(null);
     const navigate = (url) => {
          window.open(url, "_blank");
     };

     const closeFormsContainer = () => {
          toggleForms(false);
          setAdminData((prev) => ({
               ...prev,
               activeForm: {
                    type: "default",
                    formName: ""
               }

          }))
     }

     const updateShop = async () => {
          try {
               setLoading(true);
               const res = await server.updateUser(activeShop);
               if(res.status === "pass"){
                    const newShops = sortByAny([...(shops.filter(shop => shop.user_id !== activeShop?.user_id)), activeShop], "reg_date")
                    setAdminData((prev) => ({
                         ...prev,
                         shops:[...newShops]
                    }))
                    showMainNotification("pass", res.message, () => closeFormsContainer());
               }else{
                    showMainNotification("fail", res.message, () => {})
               }
          } catch (error) {
               console.log(error);
               showMainNotification("fail", "An error occurred while updating the shop. Try again later")
          }finally{
               setLoading(false);
          }
     }

     useEffect(() => {
          setActiveShop(activeForm.objFocus);
          console.log(activeForm.objFocus);
     },[])
     
     return (
          loading ? <Loading />: 
          <>
               <DashTitle><h2>Shop: {activeShop?.username}</h2></DashTitle>
               <div className="admin-shop-view-form">
                    <div className="group">
                         <b>Owner Name:</b>
                         <span>{activeShop?.full_name}</span>
                         <p>Change Name: <input type="text" onChange={(e) => setActiveShop(prev => ({...prev, full_name: e.target.value})) } /></p>
                    </div>
                    <div className="group">
                         <b>Shop Name: </b>
                         <span>{activeShop?.username}</span>
                         <p>Change Username: <input type="text" onChange={(e) => setActiveShop(prev => ({...prev, username: e.target.value})) }  /></p>
                    </div>
                    <div className="group">
                         <b>Email: </b>
                         <span>{activeShop?.user_email}</span>
                         <p>Change Email: <input type="email" onChange={(e) => setActiveShop(prev => ({...prev, user_email: e.target.value})) }  /></p>
                    </div>
                    <div className="group">
                         <b>Phone:</b>
                         <span>{activeShop?.user_phone} <i className="call-icon" onClick={() => navigate(`tel:${activeShop?.user_phone}`)}><MdAddCall /></i> </span>
                         <p>Change phone: <input type="phone" onChange={(e) => setActiveShop(prev => ({...prev, user_phone: e.target.value})) }  /></p>
                    </div>
                    <div className="group">
                         <b>Location: </b>
                         <span>{parseString(activeShop?.user_location)?.location || "Rwanda"}</span>
                         <p>Change Location: 
                         <select name="location" id="location" onChange={(e) => setActiveShop(prev => ({...prev, user_location: JSON.stringify({location: e.target.value}) }))}>
                                   <option value="Rwanda">Change location..</option>
                                   {locations && locations.map(location => <option key={`location-${location}`} value={location}>{location}</option>)}
                              </select>
                         </p>
                    </div>
                    <div className="group">
                         <b>Website:</b>
                         {activeShop?.website && activeShop?.website !== "null" ? <p><b>Link</b>:{activeShop?.website}<EditButton title={"Visit"} action={() => navigate(activeShop?.website)}/></p> : <p>No website added</p>}
                         <p>Change Website: <input type="url" onChange={(e) => setActiveShop(prev => ({...prev, website: e.target.value})) }  /></p>
                    </div> 
                    <div className="group">
                         <b>Registered on:</b>
                         <span>{extractDateOnly(activeShop?.reg_date)}</span>
                    </div>
                    <div className="group">
                         <b>Reffered by: </b>
                         {
                              activeShop?.r_id && activeShop?.r_id.startsWith("agent_") ? <span>{activeShop?.r_id}</span> : <p>No referral</p>
                         }
                    </div>
                    <div className="group">
                         <b>Status: </b>
                         <span>{activeShop?.active ? "Active" : "Inactive"}</span>
                         <p>Change Status: {activeShop?.active ? <DeleteButton title={"Deactivate"} action={() => setActiveShop(prev => ({...prev, active: 0})) }  /> : <EditButton title={"Activate"} action={() => setActiveShop(prev => ({...prev, active: 1})) } />}</p>
                    </div>
                    <div className="group">
                         <b>Status: </b>
                         <span>{activeShop?.verified ? "Verified" : "Unverified"}</span>
                         <p>Change Status: {activeShop?.verified ? <DeleteButton title={"Unverify"} action={() => setActiveShop(prev => ({...prev, verified: 0})) } /> : <VerifyButton title={"Verify"} action={() => setActiveShop(prev => ({...prev, verified: 1})) } />}</p>
                    </div>
                    <EditButton title={"Save Changes"} action={async() => await updateShop()} />
               </div>
          </>
          
     )
}

export default ShopForms
