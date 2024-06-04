import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import server from "../config/Server";
import { getItemUrlId } from "../utils/urlFunctions";
import Loading from "../components/static/Loading";
import {  formatTimeAgo } from "../utils/dateFunctions";

const AdPreview = () => {
  const [adView, setAdView] = useState({});
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(false);
  const location = useLocation();
  const ad_id = getItemUrlId(location.search);

  const fetchData = async() => {
    try {
      setLoading(true);
      const res = await server.searchUserAd({ad_id});
      if (res.status === 'pass'){
        setAdView(res.data);
        console.log(res.data);
        setFound(true);
      }
    } catch (error) {
      setFound(false);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    (async() => await fetchData())();
  },[])
  return (
    <div className="dash-advert-view-page">
      {
        loading ? <Loading /> :
        <>{
          !found ? <p>Nothing found. <b>Click Here</b> to refresh</p> :
          <>
            <div className="row">
              <img src={adView.ad_image} alt={adView.ad_name} className="main-img" />
              <div className="other-images">
                {!adView.ad_images && !adView.ad_images[0] ? null :
                  adView.ad_images.map((image,index) => <img key={index} src={image} /> )
                }
              </div>
            </div>
            <div className="row">
              <div className="group">
                <h4>Title: </h4>
                <b>{adView.ad_name}</b>
              </div>
              <div className="group">
                <h4>Contact: </h4>
                <b>{adView.contact || 'not added'}</b>
              </div>
            </div>
            <div className="row">
              <div className="group">
                <h4>Price: </h4>
                <b>{adView.ad_price} Frw</b>
              </div>
              <div className="group">
                <h4>Discount: </h4>
                <b>{adView.ad_discount}%</b>
              </div>
            </div>
            <div className="row">
              <div className="group">
                <h4>Type: </h4>
                <b>{adView.ad_type}</b>
              </div>
              <div className="group">
                <h4>Views: </h4>
                <b>{adView.ad_views}</b>
              </div>
            </div>
            <div className="row">
              <div className="group">
                <h4>Added: </h4>
                <b>{formatTimeAgo(adView.ad_date)}</b>
              </div>
              <div className="group">
                <h4>Status: </h4>
                <b>{adView.status}</b>
              </div>
            </div>
            <div className="row">
              <h4>Description:</h4>
              <p>{adView.description.desc}</p>
            </div>
          </>
        }
        </> 
      }
    </div>
  )
}

export default AdPreview;