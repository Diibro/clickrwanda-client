import { Container, } from "@mui/material";
import { InnerSection } from "./InnerSectionContainer";
import AppData from "../../Contexts/AppContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import AdvertRenderer, { AdvertRow} from "./Advert.componet";
import { ActionBtn, SelectFileBtn, SubmitButton } from "./Buttons";
import server from "../../config/Server";
import { AdvertsPagination } from "./Pagination";
import Loading from "../static/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import DeviceView from "../../Contexts/ViewContext";
import { LoadingAd } from "./LoadinComponents";
import { getArrayOfNums } from "../../utils/otherFunctions";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import { getRwandaTime } from "../../utils/dateFunctions";
// import Banner728x90 from "../../AdSterra/Banner728x90";
import { parseString} from "../../utils/jsonFunctions";
import { showMainNotification } from "../../utils/AdminFunctions";
import UserContext from "../../Contexts/UserContext";
import FreeAdsSection from "../containers/FreeAdsSection";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import ImageUploader from "../containers/ImageUploader";
import TextEditor from "../containers/TextEditor";
import { GeneralAdsContainer, SlideAdsContainers } from "../containers/AdsContainer";

export const Adverts = ({eleId,limit}) => {
      const {t} = useTranslation("global");
      const content = t("homePage.newAdsSection", {returnObjects:true});
      const [data] = useContext(AppData);
      const {adverts, changingPage} = data;

      if(limit != 0 && adverts && adverts[0] && adverts != "no data found") {
        return(
          <>
          <InnerSection type="title" eleId={"home-new-ads"} >
            {content.title}
          </InnerSection>
            {changingPage ? <Loading /> : 
            <InnerSection eleId={eleId} type="content">
              {
                adverts.map((item, index) => ( index <= limit ? (
                  <>
                    <AdvertRenderer key={`home_new_ads-${eleId + item.ad_id}`} item={item}/>
                  </>
                  
                ) : null))
              }
            </InnerSection>
            }
            <AdvertsPagination/>
          </>
        )
      }else if(limit === 0 && adverts && adverts[0] && adverts != "no data found" ){
        return(
            <>
              <InnerSection type="content">
                {
                  adverts.map((item) => (
                    <React.Suspense key={item.ad_id}  fallback={<LoadingAd />}>
                      <AdvertRenderer item={item} />
                    </React.Suspense>
                  ))
                }
              </InnerSection>
              <AdvertsPagination/>
            </>
            
        )
      }else{
        return(
          <Container>
            <InnerSection>
              {getArrayOfNums(10).map(item => <LoadingAd key={item} />)}
            </InnerSection>
          </Container>
        )
      }
    
}

export const AdvertsContainer = ({content}) => {
  const {title, containerId} =  content;
  return (
    <div className="w-full flex flex-col items-center gap-[10px] pt-[5px] pb-[10px] px-[1%] rounded-[5px] bg-white ">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-main-blue-700 text-[1.6rem] font-extrabold " id={containerId}>{title}</h2>
      </div>
      <FreeAdsSection  />
    </div>
  )
}

export const SimilarAds = ({limit, adverts}) => {
  if(limit != 0 && adverts && adverts[0] && adverts != "no data found") {
    return(
      <div className="container" id="others-ads-container-id">
        <VerticalAds ads={adverts} adsNo={limit} eleId={"others-ads-container-id"}/>
      </div>
    )
  }else if(limit === 0 && adverts && adverts[0] && adverts != "no data found" ){
    return(
        <InnerSection type="content">
          {
            adverts.map((item) => (
              <AdvertRenderer key={item.ad_id} item={item}/>
            ))
          }
        </InnerSection>
    )
  }else{
    return(
      <Container>
      </Container>
    )
  }
}

export const AddAdvertForm = () => {
  const navigate  = useNavigate();
  const [data, setData] = useContext(AppData);
  const [adInfo, setAdInfo] = useState({});
  const [adDescription, setAdDescription] = useState({});
  const [loading, setLoading] = useState(false);
  const {categories, subCategories} = data; 
  const [descFields,setDescFields] = useState(null); 
  const [user] = useContext(UserContext);
  const {userInfo, activePlan, userAdverts} = user;
  const [isOffPlan, setIsOffPlan] = useState(false);
  const [commission, setCommission] = useState(null);
  const location = useLocation();
  const commissionPercents = [3];
  const [uploadContent, setUploadContent] = useState(
    {show: false}
  );

  for(let i = 10; i <= 50;){
    commissionPercents.push(i);
    i +=5;
  }
  const checkCommission = () => {
    const searchArr = location.search.split('?=');
    if(searchArr.length && searchArr[1]){
      setCommission({commission:true, r_id: searchArr[2] || null});
    }
    
  }
  const submitForm =async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      if(!adInfo.contact || adInfo.contact.length != 10){
        return showMainNotification('fail', 'invalid contact number. must be 10 digits', () => {});
      }
      const newAd = {
        ad_name: adInfo.ad_name,
        description: adDescription,
        ad_type: adInfo.ad_type,
        ad_price: adInfo.ad_price,
        contact: adInfo.contact,
        ad_image: adInfo.ad_image,
        ad_images: [],
        registrationDate: getRwandaTime(),
        sub_category_id: adInfo.subCategory_id,
        commission: adInfo.commission,
        r_id: commission?.r_id || null
      }
      
      const res = await server.addAdvert(newAd);
      if(res.status === "pass"){
        return showMainNotification('pass', `${res.message} as ${adInfo.ad_name}`, () => navigate("/user-dashboard/user-adverts"));
      }else{
        if(res.message === "No Authentication Token" || res.message === 'Authentication Error') navigate("/forms/login");
        return showMainNotification('fail', `${res.message} .Try again`, () => {});
      }
    } catch (error) {
      console.log(error);
      return showMainNotification('fail', 'An error occurred. Try again later', () => {});
    }finally{
      setLoading(false);
    }
    
  } 

  useEffect(() => {
    checkCommission();
    if(!categories || !categories[0]){
      setData(prev => ({...prev, fetchNow: true}));
    }
  },[])

  // useEffect(() => {
  //   console.log(subCategories);
  // },[subCategories])

  useEffect(() => {
    if(adInfo.subCategory_id){
      setDescFields(parseString(subCategories.filter(item => item.sub_id === adInfo.subCategory_id)[0])?.fields || null);
      console.log(parseString(subCategories.filter(item => item.sub_id === adInfo.subCategory_id)[0]));
    }else{
      setDescFields(null);
    }
  }, [adInfo]);

  useEffect(() => {
    if(userAdverts?.length < activePlan?.description?.adsAllowed){
      setIsOffPlan(false);
    }else{
      setIsOffPlan(true);
    }
  },[user]);

  return(
    <div className="advert-form-container">
      {
        loading ? <Loading /> :
        <form onSubmit={submitForm}>
        <div className="row">
          <h2>Add New Ad</h2>
        </div>
        <div className="row">
          <div className="group">
            <label htmlFor="ad-input-category">Category:</label>
            <select name="ad-input-category" id="ad-input-category" onChange={(e) => setAdInfo(prev => ({...prev, category_id:e.target.value}))} required>
              <option value="">Select Category...</option>
              {
                categories && categories[0] ?
                categories.map((category) =>  <option key={`ad-input-category-${category.category_id}`} value={category.category_id}>{category.category_name}</option>)
                : null
              }
            </select>
          </div>
          <div className="group">
            <label htmlFor="ad-input-sub-category">Sub Category:</label>
            <select name="ad-input-sub-category" id="ad-input-sub-category" disabled={!adInfo.category_id} onChange={(e) => setAdInfo(prev => ({...prev, subCategory_id:e.target.value}))} required>
              <option value="">Select sub category...</option>
              {
                subCategories && subCategories[0] ? 
                subCategories.map(item => item.category_id === adInfo.category_id && <option key={`ad-input-${item.sub_id}`} value={item.sub_id} >{item.sub_name}</option> )
                : null
              }
            </select>
          </div>
        </div>
        <div className="row">
          <div className="group">
            <label htmlFor="ad-input-name">Title:</label>
            <input type="text" name="ad-input-name" id="ad-input-name" onChange={(e) => setAdInfo((prev) => ({...prev, ad_name: e.target.value}))} required placeholder="ex: Samsung phone" />
          </div>
          <div className="group">
            <label htmlFor="ad-input-type">Type:</label>
            <select name="ad-input-type" id="ad-input-type" onChange={(e) => setAdInfo((prev) => ({...prev, ad_type: e.target.value}))} required>
              <option value="">Select type...</option>
              <option value="service">Service</option>
              <option value="product">Product</option>
            </select>
          </div>
        </div>
        
        <div className="row">
          <div className="group">
            <label htmlFor="ad-input-price">Amount -- Rwf:</label>
            <input type="text" name="ad-input-price" id="ad-input-price" inputMode="numeric" onChange={(e) => setAdInfo((prev) => ({...prev, ad_price: e.target.value}))} required placeholder="ex: 120000" />
          </div>
          {
            commission ? 
            <div className="group">
              <label htmlFor="ad-input-commission">Commission: </label>
              <select name="ad-input-commission" id="ad-input-commission" required onChange={e => setAdInfo(prev => ({...prev, commission: e.target.value}))} >
                <option value="" disabled selected>Select commission percent...</option>
                {
                  commissionPercents.map((number) => <option value={number} key={`commission-percent-${number}`}>{number}%</option>)
                }
              </select>
            </div>
            : null
          }
          <div className="group">
              <label htmlFor="ad-input-contact">Contact Phone:</label>
              <input type="tel" name="ad-input-contact" id="ad-input-contact" onChange={e => setAdInfo(prev => ({...prev, contact: e.target.value}))} required placeholder="ex: +25078..."/>
            </div>
        </div>
        {descFields ? 
          <div className="row">
              {Object.entries(descFields).map(([key, value], index) => 
                <div className="group" key={`ad-input-${key}-${index}`}>
                  <label htmlFor={`ad-input-${key}`}>{key}:</label>
                  { value.type === "textarea" 
                    ? <textarea cols={10} rows={4} aria-multiline placeholder={value.placeholder} onChange={(e) => setAdDescription(prev => ({...prev, [key]: {value:e.target.value, type:value.type, rank: value.rank || 0, abbr: value.abbreviation || ""}}))} required={value.required}></textarea>
                    : 
                    value.type === 'file' 
                    ?<SelectFileBtn 
                        title={`Select ${key}`} 
                        action={() => setUploadContent({show: true, options: {allowed: value.allowedFiles, cb: (res) => {
                          setAdDescription(prev => ({...prev, [key]:{value:res, type: value.type, fileType: value.allowedFiles, rank: value.rank || 0, abbr: value.abbreviation || ""}}));
                          setUploadContent({show:false})
                        }}})} 
                      />
                    :value.type === 'select'?
                      <select onChange={e => setAdDescription(prev => ({...prev, [key]: {value: e.target.value, type: value.type, rank: value.rank || 0, abbr: value.abbreviation || ""}}))}>
                        <option value="">Select...</option>
                        {
                          value.selectValues.split(',').map((item, index) => <option key={`select-value-${index}`}>{item}</option>)
                        }
                      </select>
                    :value.type === 'htmlValue'? 
                    <TextEditor cb={(res) => setAdDescription(prev=> ({...prev, [key]: {value:res, type: value.type, rank: value.rank, abbr: value.abbreviation || ""}}))} />
                    :<input type={value.type === 'number' ? 'text' : value.type} required={value.required} onChange={(e) => setAdDescription(prev => ({...prev, [key]: {value:e.target.value, type: value.type, rank: value.rank, abbr: value.abbreviation || ""}}))} placeholder={value.placeholder} inputMode={value.type === 'number' ? 'numeric':'text'} />
                  }
            </div>)}
        </div>
        : null}
        <div className="row">
          <div className="group">
            <label htmlFor="ad-input-image">Main Image: </label>
            {/* <input type="file" name="ad-input-image" id="ad-input-image" onChange={(e) => setAdInfo((prev) => ({...prev, ad_image: e.target.files[0]}))} required  /> */}
            <SelectFileBtn 
              title="select file" 
              action={() => setUploadContent({show:true, options: {allowed: 'image/*', cb: (res) => {
                if(res) setAdInfo(prev => ({...prev, ad_image: res}));
                setUploadContent({show:false});
              }}})} 
            /> 
          </div>
          <div className="col">
            {adInfo.ad_image ? <img src={adInfo.ad_image} alt="" style={{width: 'clamp(50px, 95%, 100px)', borderRadius: "10px"}} /> : null}
          </div>
        </div>
        <div className="row">
            {
            !commission && 
            <div className="plan-exceed-alert">
              <ActionBtn title="Boost"  action={() => navigate("/user-dashboard/user-plans")} />
              <p>To maximise your ad views with our packages</p>
              
            </div>
            }
            <SubmitButton content={{title: "Submit Ad", type:"submit"}} />
        </div>
      </form>
      }
      {uploadContent.show && uploadContent.options ? <ImageUploader content={uploadContent.options} /> : null}
    </div>
  )
  
}

export const CategoryAdverts = ({adverts}) => {
  return (
    <div className="category-adverts" id="category_Ads-container-001">
      <VerticalAds ads={adverts} adsNo={30} eleId={"category_Ads-container-001"}/>
    </div>
  )
}

export const BoostedAds = ({params}) => {
  const {t} = useTranslation("global");
  const content = t("homePage.premiumAdsSection", {returnObjects:true})
  const [data] = useContext(AppData);
  const {boosted} = data;
  const ads  = params?.ads || boosted;

  return(
    <section className="w-full pt-[5px] pb-[10px] px-[1%] rounded-[5px] bg-white">
      { ads && Array.isArray(ads) && ads.length > 0 && <SlideAdsContainers ads={ads} containerId={"home-top-deals"} content={{title: content.title, viewAll: content.viewAllLink.title, viewAllLink: content.viewAllLink.link }} />}
    </section>
    
  )
}

export const VerticalAds = ({ ads, adsNo, eleId }) => {
  const [adsViewed, setAdsViewed] = useState([...ads.slice(0,adsNo)]);
  const [loading, setLoading] = useState(false);

  let pages = ads.length / adsNo;
  if (ads.length % adsNo !== 0) pages = Math.floor(pages + 1);
  const [currentPage, setCurrentPage] = useState(1);

  const pageArr = [];
  for (let i = 1; i <= pages; i++) {
    pageArr.push(i);
  }

  useEffect(() => {
    if(ads && ads[0]){
      setAdsViewed([...ads.slice(0,adsNo)])
    }
  },[ads])

  const changePage = (num) => {
    if (num <= pages && num > 0) {
      try {
        setLoading(true);
        let newAds = ads.slice((num - 1) * adsNo, (num - 1) * adsNo + adsNo);
        if (JSON.stringify(newAds) !== JSON.stringify(adsViewed)) {
          if(eleId){
            const ele = document.getElementById(eleId);
            window.scrollTo({top: ele.offsetTop, behavior:'smooth'});
          }
          setAdsViewed(newAds);
          setCurrentPage(num);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      return;
    }
  };

  return (
    <div className=" w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px] ">
      {adsViewed && adsViewed[0] && !loading ? (
        <>
          {/* {adsViewed.map(item => (
            <AdvertRenderer item={item} key={item.ad_id} />
          ))} */}
          {adsViewed && adsViewed.length > 0 &&  <GeneralAdsContainer ads={adsViewed} containerId={"home-simple-ads-container"} />}
          <div className="pagination">
            <i onClick={() => changePage(currentPage - 1)} className="nav">
              <GrFormPrevious />
            </i>
            {pageArr.map((item) => item < 7 ? <span onClick={() => changePage(item)} className={`${currentPage === item ? 'active-page disabled-page' : ''}`} key={item}>{item}</span> : null)}
            <p>.. {currentPage >= 7 && currentPage < pages ? <span className="active-page">{currentPage}</span> : null} .</p>
            <span className={`${currentPage === pages ? 'active-page disabled-page' : ''}`} onClick={() => changePage(pages)}>{pages}</span>
            <i onClick={() => changePage(currentPage + 1)} ><GrFormNext /></i>
          </div>
        </>
      ) : <Loading />}
    </div>
  );
};


// export const TodayDeals = ({params}) => {
//   const {t} = useTranslation("global");
//   const content = t("homePage.topDealsSection", {returnObjects:true});
//   const [data] = useContext(AppData);
//   const {todayDeals} = data;
//   const adsRef = useRef(null);
//   const [scrollPos, setScrollPos] = useState({atLeft: false});
//   const ads = params?.ads || todayDeals;

//   const scrollHandle = (check) => {
//     if(check === 1){
//       adsRef.current.scrollBy({left: 300, behavior: 'smooth'});
//     }else if(check === -1){
//       adsRef.current.scrollBy({left: -300, behavior: 'smooth'})
//     }
//   }

//   useEffect(() => {
//     const handleScroll = () => {
//       const { scrollLeft, scrollWidth, clientWidth } = adsRef.current;
//       setScrollPos({
//         atLeft: scrollLeft === 0,
//         atRight: scrollLeft + clientWidth >= scrollWidth,
//       });
//     };
//     const currentRef = adsRef.current;
//     currentRef &&  currentRef.addEventListener('scroll', handleScroll);
//     return () => {
//       currentRef ?  currentRef.removeEventListener('scroll', handleScroll) : null;
//     };
//   }, [todayDeals]);

//   return (
//     <div className="container">
//       <div className="ads-section-title">
//         <div className="title">
//           <h3 className="main-title">{content.title}</h3>
//           <Link to={content.viewAllLink.link}>{content.viewAllLink.title}</Link>
//         </div>
//         <div className="section-navigation">
//           <i  onClick={()=>scrollHandle(-1)} className={`${!scrollPos.atLeft && !params?.wrap ? '' : 'inactive'}`} ><RiArrowLeftSLine/></i>
//           <i onClick={()=>scrollHandle(1)} className={`${!scrollPos.atRight && !params?.wrap ? '' : 'inactive'}`}><RiArrowRightSLine/></i>
//         </div>
//       </div>
//       <div className="home-boosted-ads " >
//       <div className={`ads-container hide-scroll ${params?.wrap && 'wrap-scroll'} `} ref={adsRef}>
//           {
//             ads && ads[0]  && ads.map((item) =><AdvertRenderer key={item.ad_id} item={item}/>
//             )
//           }
//       </div>
//      </div>
//     </div>
    
//   ) 
// }

export const TodayDeals = ({params}) => {
  const {t} = useTranslation("global");
  const content = t("homePage.topDealsSection", {returnObjects:true});
  const [data] = useContext(AppData);
  const {todayDeals} = data;
  const ads = params?.ads || todayDeals;

  return (
    <section className="w-full pt-[5px] pb-[10px] px-[1%] rounded-[5px] bg-white ">
    { ads && Array.isArray(ads) && ads.length > 0 && <SlideAdsContainers ads={ads} containerId={"home-top-deals"} content={{title: content.title, viewAll: content.viewAllLink.title, viewAllLink: content.viewAllLink.link }} />}
    </section>
  ) 
}

export const AdWebsites = () => {
  const {t} = useTranslation("global");
  const content = t("homePage.sponsoredAdsSection", {returnObjects:true});
  const [data] = useContext(AppData);
  const {websiteAds } = data;
  return Array.isArray(websiteAds) && websiteAds[0] ? (
    <div className="container">
          <InnerSection type="title" >
            {content.title}
          </InnerSection>
          <div className="home-ad-websites">
            {
              websiteAds.map((ad) => <AdvertRow key={ad.ad_id} item={ad} />)
            }
          </div>
    </div>
  ) : null
}

Adverts.propTypes = {
  limit: PropTypes.number,
  eleId: PropTypes.any
}

SimilarAds.propTypes = {
  limit: PropTypes.any,
  adverts: PropTypes.any
}

CategoryAdverts.propTypes = {
  adverts: PropTypes.any
}

BoostedAds.propTypes = {
  params: PropTypes.any
}

TodayDeals.propTypes = {
  params: PropTypes.any
}

VerticalAds.propTypes = {
  ads: PropTypes.any,
  adsNo: PropTypes.number,
  eleId: PropTypes.any
}

AdvertsContainer.propTypes = {
  content: PropTypes.object
}