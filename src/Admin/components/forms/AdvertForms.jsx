import { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../AdminLayout';
import DashTitle from '../DashTitle';
import { nameLookerExact } from '../../../utils/otherFunctions';
import AdvertService from "../../../services/Advert"
import { showMainNotification, showNotification, toggleForms } from '../../../utils/AdminFunctions';
import { sortByAny } from '../../../utils/filterFunctions';
import { parseString } from '../../../utils/jsonFunctions';
import uploadFile from '../../../utils/aws-upload-functions';
import { s3Folders } from '../../../config/s3Config';

const AdvertForms = () => {
     const [adminData] = useContext(AdminContext);
     const {activeForm} = adminData;
     return (
          <div className='admin-advert-form-container hide-scroll'>
               {
                    activeForm.type === "advert" ? 
                         <div className='admin-advert-form-container'>
                              {activeForm.formName === "update" ? <UpdateAdvertForm /> : null }
                         </div>
                    : null
               }
          </div>
     )
}

const UpdateAdvertForm = () => {
     const [adminData,setAdminData] = useContext(AdminContext);
     const {activeForm,categories, subCategories,paymentPlans, adverts } = adminData;
     const [activeCategory, setActiveCategory] = useState(null)
     const [ad, setAd] = useState(null);

     const updateAd = (value, field) => {
          setAd((prev) => ({
               ...prev,
               [field]: value
          }) )
     }

     useEffect(() => {
          if(activeForm.type === "advert" && activeForm.objFocus){
               setAd(activeForm.objFocus);
          }
     }, [activeForm, activeCategory]);

     const closeFormsContainer = () => {
          toggleForms(false);
          setAdminData((prev) => ({
               ...prev,
               activeForm: "Admin Form"
          }))
     }

     const submitUpdate = async(e) => {
          e.preventDefault();
          try {
               if(ad){
                    const newAdInfo = {};

                    Object.entries(ad).forEach(([key,value]) => {
                         newAdInfo[key] = value;
                    })

                    if(ad.ad_new_image){
                         const newimageUrl = await uploadFile(ad.ad_new_image, s3Folders.adverts);
                         newAdInfo.ad_image = newimageUrl;
                    }
                    const res = await AdvertService.updateAd(newAdInfo);
                    if(res){
                         if(res.status === "success"){
                              const newAds = sortByAny([...(adverts.filter((item) => item.ad_id !== ad.ad_id)), res.data], "ad_date")
                              setAdminData((prev) => 
                                   ({
                                        ...prev, 
                                        notification: {type:"pass", message: res.message},
                                        adverts: [...newAds]
                                   })
                              );
                              showNotification();
                              document.getElementById("admin-ad-update-form").reset();
                              closeFormsContainer();
                         }else{
                              setAdminData((prev) => 
                                   ({
                                        ...prev, 
                                        notification: {type:"fail", message: res.message}
                                   })
                              );
                              showNotification();
                         }
                    }else{
                         setAdminData((prev) => ({
                              ...prev,
                              notification: {type: "fail", message: "unable to connect to server"}
                         }))
                         showNotification();
                    }
               }else{
                    setAdminData((prev) => ({
                         ...prev,
                         notification: {type: "fail", message: "system error."}
                    }))
                    showNotification();
               }
          } catch (error) {
               console.log(error);
               showMainNotification("fail", "Error updating advert", () => {});
          }
          
     }

     return (
          <>
               {
                    ad ? 
                    <>
                         <DashTitle>
                              <h2>Edit Advert: </h2>
                              <h4>{ad.ad_name}</h4>
                         </DashTitle>
                         <form className="admin-advert-update-form" id='admin-ad-update-form' onSubmit={async (e) =>await submitUpdate(e)}>
                              <div className="group">
                                   <label htmlFor="ad_name_01">Title: </label>
                                   <input type="text" name='ad_name' id='ad_name_01' defaultValue={ad.ad_name} onChange={(e) => updateAd(e.target.value, "ad_name")} />
                              </div>
                              <div className="group">
                                   <label htmlFor="ad_price_01">Price:</label>
                                   <input type="number" name="ad_price" id="ad_price_01" defaultValue={ad.ad_price} onChange={(e) => updateAd(e.target.value, "ad_price")} />
                              </div>
                              <div className="group">
                                   <label htmlFor="ad_type_01">Type:</label>
                                   <select name="ad_type" id="ad_type" onChange={(e) => updateAd(e.target.value, "ad_type")}>
                                        <option value="service" selected={ad.ad_type === "service" ? true : false}>Service</option>
                                        <option value="product" selected={ad.ad_type === "product" ? true : false}>Product</option>
                                   </select>
                              </div>
                              <div className="group">
                                   <label htmlFor="status_01">Status: </label>
                                   <select name="status" id="status-01" onChange={(e) => updateAd(e.target.value, "status")} >
                                        <option value="Approved" selected={ad.status === "Approved"}>Approved</option>
                                        <option value="pending" selected={ad.status === "pending"}>pending</option>
                                        <option value="Rejected" selected={ad.status === "Rejected"}>Rejected</option>
                                   </select>
                              </div>
                              <div className="group">
                                   <label htmlFor="category_01">Category: </label>
                                   <select name="category_id" id="category_01" onChange={(e) => setActiveCategory(e.target.value)}>
                                        <option value={null}>Select category...</option>
                                        {
                                             categories ? 
                                             categories.map((item) => <option key={`admin-cat-ad-${item.category_id}`} value={item.category_id}>{item.category_name}</option>)
                                             :null
                                        }
                                   </select>
                              </div>
                              <div className="group">
                                   <label htmlFor="sub_cat_01">Sub Category: <span>{nameLookerExact(subCategories, "sub_id", "sub_name", ad.sub_category_id)}</span></label>
                                   <select name="sub_category_id" id="sub_cat_01" disabled={activeCategory ? false : true} onChange={(e) => updateAd(e.target.value, "sub_category_id")}>
                                        <option>Select sub category...</option>
                                        {
                                             subCategories.map(item => item.category_id === activeCategory ? <option key={item.sub_id} value={item.sub_id}>{item.sub_name}</option> : null)
                                        }
                                   </select>
                              </div>
                              <div className="group">
                                   <label htmlFor="contact_01">Contact: </label>
                                   <input type="text" name='contact' id='contact_01' defaultValue={ad.contact} onChange={(e) => updateAd(e.target.value, "contact")} />
                              </div>
                              <div className="group">
                                   <label htmlFor="ad_discount_01">Discount: </label>
                                   <input type="number" name="ad_discount" id="ad_discount_01" defaultValue={ad.ad_discount || 0} onChange={(e) => updateAd(e.target.value, "ad_discount")} />
                              </div>
                              <div className="group">
                                   <label htmlFor="pay_plan_01">Advert plan: <span>{nameLookerExact(paymentPlans, "plan_id", "plan_name", ad.ad_plan_id)}</span></label>
                                   <select name='ad_plan_id' id="pay_plan_01" onChange={(e) => updateAd(e.target.value, "ad_plan_id")} >
                                        <option value={null}>Select plan...</option>
                                        {
                                             paymentPlans ? paymentPlans.map(item => <option key={item.plan_id} value={item.plan_id}>{item.plan_name}</option>) : null
                                        }
                                   </select>
                              </div>
                              <div className="group">
                                   <label htmlFor="ad_website_01">Website: {ad.ad_website || ""}</label>
                                   <input type="url" name='ad_website' id='ad_website_01'  onChange={(e) => updateAd(e.target.value, "ad_website")} />
                              </div>
                              <div className="group">
                                   <label htmlFor="ad_image_01">Image:</label>
                                   <div className="image-row">
                                        <div className="img"><img src={ad.ad_image} alt={ad.ad_name} width={150} /></div>
                                        {ad.ad_new_image && ad.ad_new_image instanceof File ? <div className="img"><img src={URL.createObjectURL(ad?.ad_new_image)} alt="new Image" width={150} /></div>: null}
                                   </div>
                                   <input type="file" name="ad_image" id="ad_image_01" onChange={(e) => updateAd(e.target.files[0], "ad_new_image")} />
                              </div>
                              <div className="group">
                                   <label htmlFor="description_ad">Description:</label>
                                   <textarea name="description" id="description_ad" cols={10} rows={5} defaultValue={parseString(ad.description).desc.value || parseString(ad.description).desc} onChange={(e) => updateAd({desc: {value:e.target.value, type: "textarea"}}, "description")}>
                                   </textarea>
                              </div>
                              
                              <div className="group">
                                   <input type="submit" value="Update Advert" />
                              </div>
                         </form>
                    </>

                    : <p>No ad selected</p>
               }
          </>
     )
} 

export default AdvertForms