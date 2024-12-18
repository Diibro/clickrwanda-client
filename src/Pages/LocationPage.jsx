import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { getLocations } from "../utils/locations";
import AdvertService from '../services/Advert';
import AdsContainer, { GeneralAdsContainer } from "../components/containers/AdsContainer";
import Loading from "../components/static/Loading";
import { formatPrice } from "../utils/otherFunctions";
import { VerticalAds } from "../components/dynamic/Adverts.component";
const  SampleImage = "https://s3.eu-north-1.amazonaws.com/clickrwanda.s3.com/temp/kigali-img.jpg";


const LocationPage = () => {
  const location = useLocation();
  const [locality, setLocality] = useState('Rwanda');
  const [locations, setLocations] = useState(null);
  const navigate = useNavigate();
  const [ads,setAds] = useState([]);
  const [loading,setLoading] = useState(false);
  const [totalAds,setTotalAds] = useState(0);

  const fetchAds = async(ops) => {
    try {
      setLoading(true);
      const res = await AdvertService.getByLocation(ops);
      const data = res.data;
      setTotalAds(res.count || 0);
      setAds(data);
      return;
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
    
  }

  useEffect(() => {
    
    if(location.search){
      const arr = location.search.split('?=');
      setLocality(arr[1]);
      (async() => {
            const {districts} = getLocations();
            setLocations(districts);
            await fetchAds({location: arr[1], limit: 48, offset: 0});
      })();
    }

  }, [location.search]);
  return (
    <>
      <Helmet>
        <meta name="description" content='Discover ads posted in your area' />
        <meta name='keyword' content='ads per district, sector and village' />
        <title>Locations | Click Rwanda</title>
      </Helmet>
      <div className="page">
        <Header content={{location: locality, count: totalAds}} />
        <div className="location-main-page">
          <div className="navigation">
            <span className={`${locality === 'Kigali' ? 'active' : ''}`} onClick={() => navigate(`/location?=Kigali`)}>Kigali</span>
            {
              locations ? locations.map((location,index) => <span key={`location-page-${location}-${index}`} className={`${locality === location ? 'active' : ''}`} onClick={() => navigate(`/location?=${location}`)}>{location}</span>) : null
            }
          </div>
          <div className="page-content">
            {
              loading ? <Loading /> 
              : ads && ads.length ? 
              <>
                {/* <AdsContainer adverts={ads} /> */}
                <GeneralAdsContainer ads={ads} containerId={"Location-page-ads"} />
              </>
              : <p className="no-ads-found">No ads found in {locality}</p>
            }
          </div>
        </div>
      </div>
    </>
  )
}


const Header = ({content}) => {

  return (
    <div className="location-page-header" style={{backgroundImage: `url(${SampleImage})`}}>
      <div className="content">
        <p> <span>{formatPrice(content?.count) || ''}</span> Ads from {content?.location || 'Rwanda'}</p>
      </div>
    </div>
  )
}

Header.propTypes = {
  content: PropTypes.object
}

export default LocationPage;
