import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../components/static/Loading';
import server from '../config/Server';
import { getItemUrlId } from '../utils/urlFunctions';
// import { dateFormatMonth } from '../utils/dateFunctions';
// import UserRating from '../components/dynamic/Rating.component';
import { MdCall, MdEmail } from "react-icons/md";
import { getData, saveData } from '../utils/storageFunctions';
import { Helmet } from 'react-helmet';
import { GeneralAdsContainer } from '../components/containers/AdsContainer';
import { FaLocationDot } from 'react-icons/fa6';
import { standardizePhoneNumber } from '../utils/stringfunctions';

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
      <div className="w-full flex flex-col items-center gap-[10px] justify-start bg-white rounded-[5px] py-[10px] px-[1%]">
      {loading ? <Loading/>
      :
      <>
        {vendorInfo ? <VendorHeader vendorInfo={vendorInfo} title={vendorInfo.username} image={vendorInfo?.profile_image} /> : null}
        <div className="w-full">
          {
            vendorAds && vendorAds !== "no data found" ? 
              <div className='w-full flex flex-col items-center justify-start gap-[5px] '>
                <div className="w-full" id='vendor-page-title-id'>
                  <h3 className='text-[1.2rem] font-bold text-gray-800 w-full text-center'>Our Ads ({`${vendorAds.length} ad${vendorAds.length > 1 ?'s': ''}`})</h3>
                </div>
                <div id="vendor-page-view-id"></div>
                <GeneralAdsContainer ads={vendorAds} containerId={"vendor-page-view-id"} />
              </div>
            : 
            <div><p>No adverts found for this vendor</p></div>
          }
        </div>

      </>
      

      }
    </div>
    </>
    
  )
}

const VendorHeader = ({image, vendorInfo}) => {
  return(
    <div className="w-full rounded-[5px] flex items-center justify-between flex-wrap p-[10px] bg-cover bg-gray-100 bg-no-repeat relative ">
      <div className='w-auto max-w-full flex items-start justify-start gap-[10px]'>
        <img src={image} alt="vendor profile" className='w-[60px] aspect-square object-fill rounded-full max-h-[80px] h-auto border-[1.5px] border-green-600  ' />
        {
          vendorInfo ? 
          <div className='w-auto flex flex-col items-start justify-start gap-[2.5px]'>
            <h3 className='text-[1rem] font-bold text-main-blue-700 '>{vendorInfo?.full_name}</h3>
            <p className='text-[0.8rem] font-semibold text-gray-600 flex items-center justify-start gap-[2.5px]'><i><FaLocationDot /></i> {vendorInfo.user_location.location} </p>
            <div className='w-auto flex items-center justify-start gap-[10px]'>
              <Link className='text-[0.8rem] font-semibold p-[2.5px] border border-gray-400 rounded-[5px] hover:bg-white px-[10px] text-gray-600 flex items-center justify-start gap-[2.5px]' to={`tel:${standardizePhoneNumber(vendorInfo.user_phone)}`} target='_blank'><i><MdCall /></i> Call Us </Link>
              <Link className='text-[0.8rem] font-semibold p-[2.5px] border border-gray-400 rounded-[5px] hover:bg-white px-[10px] text-gray-600 flex items-center justify-start gap-[2.5px]' to={`mailto:${vendorInfo.user_email}`} target='_blank'><i><MdEmail /></i>Email Us </Link>
            </div>
          </div>
          : null 
        }
        
      </div>
    </div>
  )
}

VendorHeader.propTypes = {
  image : PropTypes.any,
  title : PropTypes.any,
  vendorInfo: PropTypes.object
}

export default VendorPage