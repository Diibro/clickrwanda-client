import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MainServer } from "../services/beta/server";
import { BetaEndpoints } from "../services/beta/endpoints";
import { useEffect, useState } from "react";
import { getLocations } from "../utils/locations";
import PropTypes from "prop-types";
import { GeneralAdsContainer } from "../components/containers/AdsContainer";
import AdvertRenderer from "../components/dynamic/Advert.componet";

const Adtypes = [
     "General Ads",
     "Featured",
     "Discounts & Promotions",
     "Deals",
     "Jobs",
     // "Vendors",
     // "Blogs"
]

const SearchPage = () => {
     const {data: categoriesData} = useQuery({queryKey:["categories"], queryFn: async () => await MainServer.fetch(`${BetaEndpoints.category}`)});
     const categories = categoriesData ? categoriesData.data : null;
     const [searchParams] = useSearchParams();
     const [locations, setLocations] = useState([]);
     const [adverts,setAdverts] = useState(null);
     const [loading, setLoading] = useState(false);
     
     const name = searchParams.get("name");
     const category = searchParams.get("category");
     const location = searchParams.get("location");
     const adType = searchParams.get("ad-type");


     
     const [searched, setSearched] = useState({category: category || "All", location: location || "Rwanda", name: name || "", adType: adType || "General Ads"});
     const navigate = useNavigate();

     useEffect(() => {
          (async() => {
                    const {districts} = getLocations();
                    setLocations(districts);
          })()
     },[]);

     const getSearchStr = (searchObj) => {  
          const arr = [];
          if(searchObj.category !== "All") arr.push(`category=${searchObj.category}`);
          if(searchObj.location !== "Rwanda") arr.push(`location=${searchObj.location}`);
          if(searchObj.name) arr.push(`name=${searchObj.name}`);
          if(searchObj.adType) arr.push(`ad-type=${searchObj.adType}`);
          return arr.join("&");
     }

     const getSearchParams = (searchObj) => {  
          const arr = [];
          if(searchObj.category !== "All") arr.push(`category-id=${searchObj.category}`);
          if(searchObj.location !== "Rwanda") arr.push(`location=${searchObj.location}`);
          if(searchObj.name) arr.push(`name=${searchObj.name}`);
          if(searchObj.adType) arr.push(`ad-type=${searchObj.adType}`);
          return arr.join("&");
     }

     const changeCategory = (id) => {
          setSearched(prev => ({...prev, category: id}));
          const searchStr = getSearchStr({...searched, category: id});
          return navigate(`/search?${searchStr}`);
     }

     const changeLocation = (name) => {
          setSearched(prev => ({...prev, location: name}));
          const searchStr = getSearchStr({...searched, location: name});
          return navigate(`/search?${searchStr}`);
     }

     const changeAdType = (name) => {
          setSearched(prev => ({...prev, adType: name}));
          const searchStr = getSearchStr({...searched, adType: name});
          return navigate(`/search?${searchStr}`);
     }

     useEffect(() => {
          const fetchData = async () => {
               try {
                    setLoading(true);
                    const seachString = getSearchParams(searched);
                    if(searched.adType === "Featured") {
                         const adsData = await MainServer.fetch(`${BetaEndpoints.advert}?status=approved&take=40&plan-ids=plan_002,plan_004,plan_009,plan_12,plan_13,plan_14,plan_16,plan_17,plan_18,plan_19&by-date=desc&except-categories=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7,bed1566b-5901-4af9-ae80-708c293aa925`);
                         if(adsData && adsData.data && adsData.data.length > 0){
                              return setAdverts(adsData.data);     
                         }else {
                              return setAdverts([]);
                         }
                    }
                    if(searched.adType === "Discounts & Promotions") {
                         const adsData = await MainServer.fetch(`${BetaEndpoints.advert}?status=approved&take=40&plan-ids=plan_003,plan_20&by-date=desc&except-categories=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7,bed1566b-5901-4af9-ae80-708c293aa925`);
                         if(adsData && adsData.data && adsData.data.length > 0){
                              return setAdverts(adsData.data);
                         }else {
                              return setAdverts([]);
                         }
                    }else if (searched.adType === "Deals") {
                         const adsData = await MainServer.fetch(`${BetaEndpoints.advert}?status=approved&take=40&by-date=desc&is-commission-ad=true&by-date=desc&except-categories=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7,bed1566b-5901-4af9-ae80-708c293aa925`);
                         if(adsData && adsData.data && adsData.data.length > 0){
                              return setAdverts(adsData.data);
                         }else {
                              return setAdverts([]);
                         }
                    }else if(searched.adType === "Jobs") {
                         const adsData = await MainServer.fetch(`${BetaEndpoints.advert}?status=approved&by-date=desc&take=20&category-id=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7`);
                         if(adsData && adsData.data && adsData.data.length > 0){
                              return setAdverts(adsData.data);
                         }else {
                              return setAdverts([]);
                         }
                    }
                    const adsData = await MainServer.fetch(`${BetaEndpoints.advert}?${seachString}&status=approved&by-date=desc&except-categories=b6b8d2d5-476d-48a3-beb0-93f01ecc4ef7,bed1566b-5901-4af9-ae80-708c293aa925&take=40`);
                    if(adsData && adsData.data && adsData.data.length > 0){
                         setAdverts(adsData.data);     
                    }else {
                         setAdverts([]);
                    }
               } catch (error) {
                    console.log(error);
               }finally{
                    setLoading(false);
               }
               
          }

          (async () => await fetchData())();
     },[searchParams, searched]);

     return (
          <>
          <Helmet>
               <title>{`Search | Click Rwanda`}</title>
          </Helmet>
          <div className="w-full flex flex-col items-center justify-center gap-[10px] bg-white my-[10px] rounded-[5px] p-[10px]">
               <div className="w-full grid grid-cols-2 d:grid-cols-3 lg:grid-cols-4 gap-[10px]">
                    <h2 className="w-full col-span-2 md:col-span-1 text-[1.4rem] text-blue-600 font-extrabold">Clickrwanda Search</h2>
                    <div className="w-full flex items-center gap-[5px]">
                         <input type="search" placeholder="Search anything.." className="w-full px-[10px] bg-gray-50 border-[1.5px] border-gray-300 rounded-[5px] py-[5px] text-[0.8rem] text-gray-700 outline-none focus:border-blue-600" onChange={(e) => setSearched(prev => ({...prev, name:e.target.value}))} />
                         {/* <button className="p-[5px] px-[10px] rounded-[5px] text-[0.8rem] bg-blue-600 text-white outline-none hover:bg-blue-700">Search</button> */}
                    </div>
                    <select name="category" id="search-category-01" className='text-[0.8rem] w-full rounded-[5px] bg-gray-100 text-gray-700 py-[5px] px-[10px] outline-none border border-gray-300 focus:border-gray-600' defaultValue={"All Categories"}  onChange={e => changeCategory(e.target.value)}>
                         {categories && categories[0] ? <option value="All" >All Categories</option> : null}
                         {categories && categories[0] ? categories.map((item) => <option selected={category === item.category_id} key={`search-bar-category-${item.category_id}`} value={item.category_id}>{item.category_name}</option>) : <option value="">Loading...</option>}
                    </select>
                    <select name="locations" id="search-location-01" defaultValue={'Location'} className='text-[0.8rem] w-full rounded-[5px] bg-gray-100 text-gray-700 py-[5px] px-[10px] outline-none border border-gray-300 focus:border-gray-600' onChange={e => changeLocation(e.target.value)} >
                         <option value="Rwanda">All Rwanda</option>
                         {locations && locations[0] ? <option value="Kigali" >Kigali</option> : null}
                         {locations && locations[0] ? locations.map((item) => <option selected={location === item} key={`search-bar-location-${item}`}>{item}</option>) : <option value="" disabled>Loading...</option>}
                    </select>
               </div>
               <div className="w-full flex items-center overflow-x-auto hide-scroll justify-start gap-[10px] px-[20px] py-[10px] bg-gray-50 rounded-[5px]">
                    {Adtypes.map((type) => <AdsType key={`ad-type-${type}`} name={type} active={type === searched.adType} cb={()=> changeAdType(type)} />)}
               </div>
               {
                    searched.adType === "Jobs" ? <JobAdsContainer ads={adverts} /> : 
                    <AdsSearchResultsContainer ads={adverts} loading={loading} />
               }
          </div>
          </>
     
     )
}

const AdsType = ({name, active, cb}) => {
     return (
          <span className={`px-[20px] text-[0.8rem] cursor-pointer transition-all whitespace-nowrap duration-300 py-[5px] hover:bg-gray-300 font-semibold rounded-[30px] ${active ? "bg-gray-600 text-gray-50 " : "text-main-blue-700" }`} onClick={() => cb(name)}>{name}</span>
     )
}

AdsType.propTypes = {
     name: PropTypes.string.isRequired,
     active: PropTypes.bool.isRequired,
     cb: PropTypes.func.isRequired
}

const AdsSearchResultsContainer = ({ads, loading}) => {
     return (
          <div className="w-full flex flex-col items-center justify-start gap-[5px]">
               <div className="w-full flex items-center gap-[10px] justify-between">
                    <h3 className="text-[1.4rem] font-bold text-main-blue-700">Search results...</h3>
                    {loading && <span className="w-[20px] aspect-square border-t-[2px] border-orange-600 rounded-full animate-spin"></span>}
               </div>
               {
                    ads && ads.length > 0 ? 
                    <GeneralAdsContainer ads={ads} />
                    : <h3 className="text-[1rem] text-gray-600">No results found</h3>
               }
          </div>
     )
}



AdsSearchResultsContainer.propTypes = {
     ads: PropTypes.array,
     loading: PropTypes.bool
}

const JobAdsContainer = ({ads})=> {
     return (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[10px] ">
               {
                    ads && ads.length > 0 && Array.isArray(ads) ? ads.map((item) => <AdvertRenderer key={item.ad_id} item={item} />) : <h3 className="text-[1rem] text-gray-600">No results found</h3> 
               }
          </div>
     )
}

JobAdsContainer.propTypes = {
     ads: PropTypes.array.isRequired
}
export default SearchPage