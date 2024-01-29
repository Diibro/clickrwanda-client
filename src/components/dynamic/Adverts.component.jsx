import { Container, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { InnerSection } from "./InnerSectionContainer";
import AppData from "../../Contexts/AppContext";
import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import { FaArrowRight } from "react-icons/fa";
import { AdvertRenderer, AdvertRow} from "./Advert.componet";
import { MoreLink } from "./LinksComponents";
import { SubmitButton } from "./Buttons";
import UserContext from "../../Contexts/UserContext";
import { ImCross } from "react-icons/im";
import server from "../../config/Server";
import { TiTick } from "react-icons/ti";
import { MdArrowBackIos,MdArrowForwardIos } from "react-icons/md";
import { AdvertsPagination } from "./Pagination";
import Loading from "../static/Loading";
import { useNavigate } from "react-router-dom";
import { HorizontalBanner } from "./Banners";
import DeviceView from "../../Contexts/ViewContext";

export const Adverts = ({eleId,limit}) => {
      const [data] = useContext(AppData);
      const [deviceView] = useContext(DeviceView)
      const { isMobile, isTablet} = deviceView
      const {adverts, changingPage} = data;
      let adLimit = isTablet || isMobile ? 19 : 24;

      if(limit != 0 && adverts && adverts[0] && adverts != "no data found") {
        return(
          <>
            {changingPage ? <Loading /> : 
            <InnerSection eleId={eleId} type="content">
              {
                adverts.map((item, index) => ( index <= limit ? (
                  <>
                    <AdvertRenderer key={item.ad_id} item={item}/>
                  {index === adLimit ? <HorizontalBanner /> : null}
                  </>
                  
                ) : null))
              }
            </InnerSection>
            }
            <AdvertsPagination/>
            {/* <InnerSection type="more" ><MoreLink content={{message: "all ads", dest: '/ads', icon: FaArrowRight}} /></InnerSection> */}
          </>
        )
      }else if(limit === 0 && adverts && adverts[0] && adverts != "no data found" ){
        return(
            <>
              <InnerSection type="content">
                {
                  adverts.map((item) => (
                    <AdvertRenderer key={item.ad_id} item={item}/>
                  ))
                }
              </InnerSection>
              <AdvertsPagination/>
            </>
            
        )
      }else{
        return(
          <Container>
          </Container>
        )
      }
    
}

export const SimilarAds = ({limit, adverts}) => {
  if(limit != 0 && adverts && adverts[0] && adverts != "no data found") {
    return(
      <>
        <InnerSection type="full-width">
          {
            adverts.map((item, index) => ( index <= limit ? (
              <AdvertRenderer key={item.ad_id} item={item}/>
            ) : null))
          }
        </InnerSection>
        <InnerSection type="more" ><MoreLink content={{message: "View All", dest: '/ads', icon: FaArrowRight}} /></InnerSection>
      </>
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
        navigate('user-dashboard/user-adverts');
        setUser((prev) => ({...prev, activeForm:''}));
      }else{
        if(res.message === "No Authentication Token" || res.message === 'Authentication Error') setUser((prev) => ({...prev, activeForm:'login'}));
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
            <InputLabel htmlFor="description">Description:</InputLabel>
            <TextField id="description" multiline rows={4} name="description" fullWidth onChange={(e) => setAdDescription(e.target.value)}>Ad description</TextField>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            <InputLabel htmlFor="ad image">Ad Image: </InputLabel>
            <Input type="file" name="ad image" onChange={(e) => setAdInfo((prev) => ({...prev, ad_image: e.target.files[0]}))} required />
          </div>
          <div className="col">
            <InputLabel htmlFor="ad images">Other Images: </InputLabel>
            <Input type="file" name="ad images" inputProps={{multiple: true}} onChange={(e) => setAdInfo((prev) => ({...prev, otherImages: e.target.files}))} required />
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
    <div className="category-adverts">
      {
            adverts.map((item) => (
              <AdvertRenderer key={item.ad_id} item={item}/>
            ))
          }
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
    <div className="home-boosted-ads " >
      <div className={`ads-container hide-scroll  ${params?.wrap  && 'wrap-scroll'} `} ref={adsRef}>
        {
          ads && ads[0] && ads.map((item) =><AdvertRenderer key={item.ad_id} item={item}/>
          )
        }
      </div>
    {!scrollPos.atLeft && !params?.wrap  ? <i onClick={()=>scrollHandle(-1)} className="nav-icon left-nav-icon"><MdArrowBackIos /></i> : null}
    {!scrollPos.atRight && !params?.wrap ? <i onClick={() => scrollHandle(1)} className="nav-icon right-nav-icon"><MdArrowForwardIos /></i> : null}
  </div>
  )
}


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
  ) 
}

export const AdWebsites = () => {
  const [data] = useContext(AppData);
  const {websiteAds } = data;
  return Array.isArray(websiteAds) && websiteAds[0] ? (
    <div className="home-ad-websites">
      {
        websiteAds.map((ad) => <AdvertRow key={ad.ad_id} item={ad} />)
      }
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