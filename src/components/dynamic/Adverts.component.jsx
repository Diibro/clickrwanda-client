import { Container, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { InnerSection } from "./InnerSectionContainer";
import AppData from "../../Contexts/AppContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import { AdvertRow} from "./Advert.componet";
const AdvertRenderer = React.lazy(() => import("./Advert.componet"))
import { SubmitButton } from "./Buttons";
import UserContext from "../../Contexts/UserContext";
import { ImCross } from "react-icons/im";
import server from "../../config/Server";
import { TiTick } from "react-icons/ti";
import { MdArrowBackIos,MdArrowForwardIos } from "react-icons/md";
import { AdvertsPagination } from "./Pagination";
import Loading from "../static/Loading";
import { Link, useNavigate } from "react-router-dom";
import { HorizontalBanner } from "./Banners";
import DeviceView from "../../Contexts/ViewContext";
import { LoadingAd } from "./LoadinComponents";
import { getArrayOfNums } from "../../utils/otherFunctions";
import { Banners } from "../../config/banners";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export const Adverts = ({eleId,limit}) => {
      const [data] = useContext(AppData);
      const [deviceView] = useContext(DeviceView)
      const { isMobile, isTablet} = deviceView
      const {adverts, changingPage} = data;
      let adLimit = isTablet || isMobile ? 19 : 24;

      if(limit != 0 && adverts && adverts[0] && adverts != "no data found") {
        return(
          <>
          <InnerSection type="title" eleId={"home-new-ads"} >
            New Ads
          </InnerSection>
            {changingPage ? <Loading /> : 
            <InnerSection eleId={eleId} type="content">
              {
                adverts.map((item, index) => ( index <= limit ? (
                  <>
                    <AdvertRenderer key={item.ad_id} item={item}/>
                  {index === adLimit ? <HorizontalBanner items={Banners} /> : null}
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

export const SimilarAds = ({limit, adverts}) => {
  if(limit != 0 && adverts && adverts[0] && adverts != "no data found") {
    return(
      <div className="container" id="others-ads-container-id">
        <VerticalAds ads={adverts} adsNo={20} eleId={"others-ads-container-id"}/>
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
  const [, setUser] = useContext(UserContext);
  const [adInfo, setAdInfo] = useState({});
  const [adDescription, setAdDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const {categories, subCategories} = data;  
  const closeForm = () => {
    setUser((prev) => ({...prev, activeForm:''}));
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

  const submitForm =async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('ad_name', adInfo.ad_name);
      formData.append('description', adDescription);
      formData.append('ad_type', adInfo.ad_type);
      formData.append('ad_price', adInfo.ad_price);
      formData.append('contact', adInfo.contact);
      formData.append('image', adInfo.ad_image);
      if (adInfo.otherImages) {
        for (let i = 0; i < Array.from(adInfo.otherImages).length; i++) {
          formData.append(`otherImage`, Array.from(adInfo.otherImages)[i]);
        }
      }
      formData.append('sub_category_id',adInfo.subCategory_id);
      
      const res = await server.addAdvert(formData);
      if(res.status === "pass"){
        raiseAlert('success', `${res.message} as ${adInfo.ad_name}`, <TiTick />);
        navigate('/user-dashboard/user-adverts');
      }else{
        if(res.message === "No Authentication Token" || res.message === 'Authentication Error') navigate("/forms/login");
        return raiseAlert('fail', `${res.message} .Try again`, <ImCross />);
      }
    } catch (error) {
      return raiseAlert('fail', 'An error occurred. Try again later', <ImCross />);
    }finally{
      setLoading(false);
    }
    
  } 

  return(
    <div className="advert-form-container">
      <i onClick={closeForm} className="close-icon"><ImCross/></i>
      {
        loading ? <Loading /> :
        <form onSubmit={submitForm}>
        <div className="row">
          <h2>Add New Ad</h2>
        </div>
        <div className="row">
          <div className="col">
            <InputLabel className="lables" htmlFor="category">Category:</InputLabel>
            <Select name="category" id="category" value={adInfo.category_id || ''} onChange={(e) => setAdInfo(prev => ({...prev, category_id:e.target.value}))} required>
              <MenuItem value="">Select a category</MenuItem>
              {categories && categories[0] ? categories.map((category) => (
                <MenuItem key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </MenuItem>
              )): null}
            </Select>
          </div>
          <div className="col">
            <InputLabel htmlFor="sub_category">
              Sub Category:
            </InputLabel>
            <Select name="category" id="category" value={adInfo.subCategory_id || ''} disabled={!adInfo.category_id} onChange={(e) => setAdInfo(prev => ({...prev, subCategory_id:e.target.value}))} required>
              <MenuItem value="">Select sub category....</MenuItem>
              {subCategories && subCategories[0] ? subCategories.map((item) => (
                item.category_id === adInfo.category_id ? 
                <MenuItem key={item.sub_id} value={item.sub_id}>
                  {item.sub_name}
                </MenuItem>
                :
                null
              )): null}
            </Select>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <InputLabel htmlFor="title">Ad Title: </InputLabel>
            <Input type='text' name='title' label='Ad Title:' onChange={(e) => setAdInfo((prev) => ({...prev, ad_name: e.target.value}))} required/>
          </div>
          <div className="col">
            <InputLabel htmlFor="ad_type"  >Ad Type: </InputLabel>
            <Select value={adInfo.ad_type || ''} name="ad_type" onChange={(e) => setAdInfo((prev) => ({...prev, ad_type: e.target.value}))}>
              <MenuItem value=''>Select ad type....</MenuItem>
              <MenuItem value='service'>Service</MenuItem>
              <MenuItem value='product'>Product</MenuItem>
            </Select>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <InputLabel htmlFor="price">Ad Price --Rwf:</InputLabel>
            <Input name="ad_price" type="number" label="Ad Price" onChange={(e) => setAdInfo((prev) => ({...prev, ad_price: e.target.value}))} />
          </div>
          <div className="col">
            <InputLabel htmlFor='contact'>Contact Number:</InputLabel>
            <Input name="contact" type="text"  label="Contact Number" onChange={e => setAdInfo(prev => ({...prev, contact: e.target.value}))}/>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <InputLabel htmlFor="description">Description: <p>(20 words per paragraph)</p></InputLabel>
            <TextField id="description" multiline rows={4} name="description" fullWidth onChange={(e) => setAdDescription(e.target.value)}>Ad description</TextField>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            <InputLabel htmlFor="ad image">Ad Image: </InputLabel>
            <Input type="file" name="ad image" onChange={(e) => setAdInfo((prev) => ({...prev, ad_image: e.target.files[0]}))} required />
            <p>Main ad image</p>
          </div>
          <div className="col">
            <InputLabel htmlFor="ad images">Other Images --<i>optional</i>: </InputLabel>
            <Input type="file" name="ad images" inputProps={{multiple: true}} onChange={(e) => setAdInfo((prev) => ({...prev, otherImages: e.target.files}))} />
            <p>Add up to 4 images</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {adInfo.ad_image ? <img src={URL.createObjectURL(adInfo.ad_image)} alt="" style={{width: 'clamp(50px, 95%, 100px)', borderRadius: "10px"}} /> : null}
          </div>
          <div className="col">
            {adInfo.otherImages && adInfo.otherImages[0] ? 
            Array.from(adInfo.otherImages).map(( image, index) => <img key={index} src={URL.createObjectURL(image)} style={{width: 'clamp(40px, 50%, 80px)', borderRadius: '5px'}} />)
            : null }
          </div>
        </div>
        <div className="row">
          <SubmitButton content={{title: "Submit Ad", type:"submit"}} />
        </div>
      </form>
      }
    </div>
  )
  
}

export const CategoryAdverts = ({adverts}) => {
  return (
    <div className="category-adverts" id="category_Ads-container-001">
          <VerticalAds ads={adverts} adsNo={50} eleId={"category_Ads-container-001"}/>
    </div>
  )
}

export const BoostedAds = ({params}) => {
  const [data] = useContext(AppData);
  const adsRef = useRef(null);
  const {boosted} = data;
  const [scrollPos, setScrollPos] = useState({atLeft: false});
  const ads  = params?.ads || boosted;

  const scrollHandle = (check) => {
    if(check === 1){
      adsRef.current.scrollBy({left: 300, behavior: 'smooth'});
    }else if(check === -1){
      adsRef.current.scrollBy({left: -300, behavior: 'smooth'})
    }
  }

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = adsRef.current;
    setScrollPos({
      atLeft: scrollLeft === 0,
      atRight: scrollLeft + clientWidth >= scrollWidth,
    });
  };

  useEffect(() => {
    const currentRef = adsRef.current;
    currentRef && currentRef.addEventListener('scroll', handleScroll);

    return () => {
      currentRef ? currentRef.removeEventListener('scroll', handleScroll) : null;
    };
  }, [boosted]);

  return(
    <div className="container">
      <InnerSection type="title" >
            Premium Ads
            <Link to='/sponsored-ads'>View All</Link>
      </InnerSection>
      <div className="home-boosted-ads " >
          <div className={`ads-container hide-scroll  ${params?.wrap  && 'wrap-scroll'} `} ref={adsRef}>
            {
              ads && ads[0] && ads.map((item) => <AdvertRenderer key={item.ad_id} item={item}/>
              )
            }
          </div>
        {!scrollPos.atLeft && !params?.wrap  ? <i onClick={()=>scrollHandle(-1)} className="nav-icon left-nav-icon"><MdArrowBackIos /></i> : null}
        {!scrollPos.atRight && !params?.wrap ? <i onClick={() => scrollHandle(1)} className="nav-icon right-nav-icon"><MdArrowForwardIos /></i> : null}
      </div>
    </div>
    
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
          console.log(newAds);
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
    <div className="ads-container">
      {adsViewed && adsViewed[0] && !loading ? (
        <>
          {adsViewed.map(item => (
            <React.Suspense key={item.ad_id} fallback={<LoadingAd />}>
              <AdvertRenderer item={item} />
            </React.Suspense>
          ))}
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

// export const RowAds = ({adsInfo}) => {
//   return (
//     <div className="row-adverts">

//     </div>
//   )
// }

export const TodayDeals = ({params}) => {
  const [data] = useContext(AppData);
  const {todayDeals} = data;
  const adsRef = useRef(null);
  const [scrollPos, setScrollPos] = useState({atLeft: false});
  const ads = params?.ads || todayDeals;

  const scrollHandle = (check) => {
    if(check === 1){
      adsRef.current.scrollBy({left: 300, behavior: 'smooth'});
    }else if(check === -1){
      adsRef.current.scrollBy({left: -300, behavior: 'smooth'})
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = adsRef.current;
      setScrollPos({
        atLeft: scrollLeft === 0,
        atRight: scrollLeft + clientWidth >= scrollWidth,
      });
    };
    const currentRef = adsRef.current;
    currentRef &&  currentRef.addEventListener('scroll', handleScroll);
    return () => {
      currentRef ?  currentRef.removeEventListener('scroll', handleScroll) : null;
    };
  }, [todayDeals]);

  return (
    <div className="container">
      <InnerSection type="title" >
            Today Deals
            <Link to='/top-deals'>View All</Link>
      </InnerSection>
      <div className="home-boosted-ads " >
      <div className={`ads-container hide-scroll ${params?.wrap && 'wrap-scroll'} `} ref={adsRef}>
          {
            ads && ads[0]  && ads.map((item) =><AdvertRenderer key={item.ad_id} item={item}/>
            )
          }
      </div>
      {!scrollPos.atLeft && !params?.wrap ? <i onClick={()=>scrollHandle(-1)} className="nav-icon left-nav-icon"><MdArrowBackIos /></i> : null}
      {!scrollPos.atRight && !params?.wrap ? <i onClick={() => scrollHandle(1)} className="nav-icon right-nav-icon"><MdArrowForwardIos /></i> : null}
    </div>
    </div>
    
  ) 
}

export const AdWebsites = () => {
  const [data] = useContext(AppData);
  const {websiteAds } = data;
  return Array.isArray(websiteAds) && websiteAds[0] ? (
    <div className="container">
          <InnerSection type="title" >
            Sponsored Ads
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