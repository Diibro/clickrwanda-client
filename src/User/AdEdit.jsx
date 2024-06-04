import { useContext, useEffect, useState } from "react";
import { DashboardContainer } from "../components/dynamic/DashboardComponents";
import { useLocation } from "react-router-dom";
import Loading from "../components/static/Loading";
import server from "../config/Server";
import { getItemUrlId } from "../utils/urlFunctions";
import { SubmitButton } from "../components/dynamic/Buttons";
import AppData from "../Contexts/AppContext";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { Input } from "@mui/material";

const AdEdit = () => {
  const [adEdit, setAdEdit] = useState({});
  const [adChanges, setAdChanges] = useState({});
  const [found, setFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [,setData] = useContext(AppData);
  const ad_id = getItemUrlId(location.search);

  const fetchData = async() => {
    try {
      setLoading(true);
      const res = await server.searchUserAd({ad_id});
      if (res.status === 'pass'){
        setAdEdit(res.data);
        setFound(true);
      }
    } catch (error) {
      setFound(false);
    }finally{
      setLoading(false);
    }
  }

  const raiseAlert = (type, message, icon) => {
    setData((prev)=> ({
        ...prev,
        alertView:{
              on: true,
              content: {type, message, icon}
        }
    }));
}

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if(adChanges.ad_image){
        const formData = new FormData();
        formData.append('image', adChanges.ad_image);
        formData.append('deleteMainImage', adChanges.deleteMainImage);
        if(adChanges.ad_name) formData.append('ad_name', adChanges.ad_name);
        if(adChanges.contact) formData.append('contact', adChanges.contact);
        if(adChanges.ad_price) formData.append('ad_price', adChanges.ad_price);
        if(adChanges.ad_discount) formData.append('ad_discount', adChanges.ad_discount);
        if(adChanges.ad_type) formData.append('ad_type', adChanges.ad_type);
        if(adChanges.description) formData.append('description', adChanges.description);
        formData.append('ad_id', ad_id);
        const res = await server.updateUser(formData);
        if(res.status === "pass"){
          raiseAlert('success', `${res.message}`, <TiTick />);
        }else{
          return raiseAlert('fail', `${res.message} .Try again`, <ImCross />);
        }
      }else{
        if(Object.keys(adChanges).length > 0){
          const changes = {...adChanges, ad_id}
          const res = await server.updateUserAd(changes);
          if(res.status === "pass"){
            raiseAlert('success', `${res.message}`, <TiTick />);
            return window.location.reload();
          }else{
            return raiseAlert('fail', `${res.message} .Try again`, <ImCross />);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    (async () => await fetchData())();
  }, [location.search]);
  return (
    <div className="advert-edit-page">
      {
        !loading ? 
        <>
          {
            found ?
            <>
              <h3 className="edit-title">Edit Advert: {adEdit?.ad_name}</h3>
              <form className="edit-form" onSubmit={submitEdit}>
                <div className="group">
                  <label htmlFor="ad-title">Ad Title:</label>
                  <input type="text" name="ad-title" id="ad-title" placeholder={adEdit?.ad_name} defaultValue={adEdit.ad_name} onChange={(e) => setAdChanges(prev => ({...prev, ad_name: e.target.value}))} />
                </div>
                <div className="group">
                  <label htmlFor="ad-contact">Ad Contact:</label>
                  <input type="tel" name="ad-contact" id="ad-contact" placeholder={adEdit?.contact} defaultValue={adEdit.contact} onChange={(e) => setAdChanges(prev => ({...prev, contact: e.target.value}))} />
                </div>
                <div className="group">
                  <label htmlFor="ad-price">Ad Price (frw):</label>
                  <input type="number" name="ad-price" id="ad-price" placeholder={adEdit?.ad_price} defaultValue={adEdit.ad_price} onChange={(e) => setAdChanges(prev => ({...prev, ad_price: e.target.value}))} />
                </div>
                <div className="group">
                  <label htmlFor="ad-discount">Ad Discount (%):</label>
                  <input type="number" name="ad-discount" id="ad-discount" placeholder={adEdit?.ad_discount} defaultValue={adEdit.ad_discount} onChange={(e) => setAdChanges(prev => ({...prev, ad_discount: e.target.value}))} />
                </div>
                <div className="group">
                  <label htmlFor="ad-type">Ad Type:</label>
                  <select name="ad-type" id="ad-type" defaultValue={adEdit.ad_type} onChange={(e) => setAdChanges(prev => ({...prev, ad_type: e.target.value}))} >
                    <option value="servie">Service</option>
                    <option value="product">Product</option>
                  </select>
                </div>
                <div className="group">
                  <label htmlFor="ad-description">Ad Description:</label>
                  <textarea name="ad-description" id="ad-description" cols="20" rows="10" defaultValue={adEdit.description.desc} onChange={(e) => setAdChanges(prev => ({...prev, description: e.target.value}))}></textarea>
                </div>
                <div className="group full-width">
                  <label htmlFor="ad_image">Main Image:</label>
                  <div className="image-edit">
                    <img src={adChanges.ad_image ? URL.createObjectURL(adChanges.ad_image) :  adEdit.ad_image} alt="main image" />
                    <Input type="file" name="ad_image" onChange={(e) => setAdChanges(prev => ({...prev, ad_image: e.target.files[0], deleteMainImage:true}))} disabled  />
                  </div>
                </div>
                <div className="group full-width">
                  <SubmitButton content={{type: "submit", title: "Save Changes"}} />
                </div>
              </form>
            </>
            :
            <div>advert not found. Try again later.</div>
          }
        </>
        :
        <Loading />
      }
    </div>
  )
}



export default AdEdit;