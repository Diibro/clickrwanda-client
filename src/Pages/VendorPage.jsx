import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/static/Loading';
import server from '../config/Server';
import { getItemUrlId } from '../utils/urlFunctions';
import { dateFormatMonth } from '../utils/dateFunctions';
import UserRating from '../components/dynamic/Rating.component';
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { getData, saveData } from '../utils/storageFunctions';
import { Helmet } from 'react-helmet';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { GeneralAdsContainer } from '../components/containers/AdsContainer';

const VendorPage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [vendorAds, setVendorAds] = useState(null);
  const [vendorInfo, setVendorInfo] = useState(null);
  const userId = getItemUrlId(location.search);

  const fetchData =async () => {
    let check = 0;
    try {
      setLoading(true);
      const storedVendor = getData('vendorInfo');
      if(storedVendor){
        try {
          const info = storedVendor;
          if(getItemUrlId(location.search) === info.vendorInfo.user_id){
              setVendorAds(info.ads);
            setVendorInfo(info.vendorInfo);
            check = 1;
          }
        } catch (error) {
          console.log(error);
          check = 0;
        } 
      }

      if(check === 0 ) {
        const res = await server.searchAdverts('user', {userId});
        setVendorInfo(res.vendorInfo);
        setVendorAds(res.ads);
        saveData('vendorInfo', res, 30);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
    
  }

  useEffect(() => {
    fetchData();
  }, [location.search]);
  return (
    <>
      <Helmet>
        <meta name='description' content={`Products and services of ${vendorInfo?.full_name}. Contact: Phone -- ${vendorInfo?.user_phone}`} /> 
        <title>{`${vendorInfo?.full_name || 'Vendor'} | Click Rwanda `}</title>
      </Helmet>
      <div className="vendor-page">
      {loading ? <Loading/>
      :
      <>
        {vendorInfo ? <VendorHeader title={vendorInfo.username} image={vendorInfo?.profile_image} /> : null}
        <div className='w-full '>
          <div className="w-full">
            {vendorInfo ? 
              <>
                <div className='vendor-page-title'>
                  <h2>Welcome to the {vendorInfo.full_name} Shop</h2>
                </div>
                <div className="vendor-page-info">
                  <div className="col">
                    <div className="row">
                      <span>Business: </span>
                      <p>{vendorInfo.full_name}</p>
                    </div>
                    <div className="row">
                      <span>Email: </span>
                      <p>{vendorInfo.user_email}</p>
                    </div>
                    <div className="row">
                      <span>Phone: </span>
                      <p>{vendorInfo.user_phone}</p>
                    </div>
                    <div className="row">
                      <span>Joined Date:</span>
                      <p>{dateFormatMonth(vendorInfo.reg_date)}</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className='row'>
                      <span>Location:</span>
                      <p>{vendorInfo.user_location.location}</p>
                    </div>
                    <div className="row">
                      <span>Verification:</span>
                      {vendorInfo?.verified ? <p className='verified-ad-text'>Verified<i><VscVerifiedFilled /></i></p> : <p className='unverified-ad-text'>Unverified</p> }
                    </div>
                    <div className="row">
                      <span>Rating:</span>
                      <div className='contact'><UserRating rating={vendorInfo.rating}/></div>
                      
                    </div>
                    <div className='row'>
                      <span>Contact:</span>
                      <div className='contact'>
                        <a href={`tel:${vendorInfo.user_phone}`}><i><IoMdCall /></i></a>
                        <a href={`mailto:${vendorInfo.user_email}`}><i><MdEmail /></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            : null}

            {
              vendorAds && vendorAds !== "no data found" ? 
                <div className='page'>
                  <div className="vendor-page-title" id='vendor-page-title-id'>
                    <h3>Vendor Adverts ({`${vendorAds.length} ad${vendorAds.length > 1 ?'s': ''}`})</h3>
                  </div>
                  <div id="vendor-page-view-id"></div>
                  <GeneralAdsContainer ads={vendorAds} containerId={"vendor-page-view-id"} />
                </div>
              : 
              <div><p>No adverts found for this vendor</p></div>
            }
          </div>
        </div>

      </>
      

      }
    </div>
    </>
    
  )
}

const VendorHeader = ({image}) => {
  return(
    <div className="w-full rounded-[5px] flex items-center justify-center h-[80px] bg-cover bg-main-blue-700 mb-[50px] bg-no-repeat relative ">
      {/* <h1>{title}</h1> */}
      <img src={image} alt="vendor profile" className='absolute max-w-[80px] rounded-[10px] -bottom-[40px] max-h-[80px] w-auto h-auto border-[1.5px] border-main-gold-500  ' />
    </div>
  )
}

VendorHeader.propTypes = {
  image : PropTypes.any,
  title : PropTypes.any,
}

export default VendorPage