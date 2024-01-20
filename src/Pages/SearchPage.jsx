import {  useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { getItemUrlName, getSearchParams } from "../utils/urlFunctions";
import { InnerSection } from "../components/dynamic/InnerSectionContainer";
import { AdvertImage, AdvertRenderer, AdvertRow } from "../components/dynamic/Advert.componet";
import PropTypes  from 'prop-types';
import Loading from "../components/static/Loading";
import server from "../config/Server";
import SearchBar from "../components/static/SearchBar";
import { Helmet } from "react-helmet";
import { BestSellerSquare } from "./BestSellers";

const SearchPage = () => {
     const location = useLocation();
     const [loading, setLoading] = useState(false);
     const [option,setOption] = useState('all')
     const [fetch, setFetch] = useState(false);
     const [ads, setAds] = useState(null);
     const searched = getSearchParams(location.search);
     const searchAds = async () => {
          try {
               setLoading(true);
               if(!fetch){
                    const res = await  server.searchAdverts('search', {search:searched.search, category: searched.category, location:searched.location, option});
                    setAds(res);
               }else{
                    const res = await server.searchAdverts('search', {search: searched.search, category: searched.category, location:searched.location, option: 'all'});
                    setAds(res);
                    setFetch(false);
                    setOption("images");
               }
               
          } catch (error) {
               console.log(error);
          }finally{
               setLoading(false);
          }
     }
     useEffect(() => {
          if(option !== "images"){
               setAds(null);
               (async () => await searchAds())();

          }
     }, [location.search, option, fetch]);

     return (
          <>
          <Helmet>
               <title>{`Search | Click Rwanda`}</title>
          </Helmet>
          <div className="search-page">
               <div className="search-page-searchbar">
                    <SearchBar />
               </div>
               <div className="search-page-options hide-scroll">
                    <span className={`${option === 'all' ? 'active' : ''}`} onClick={() => setOption('all')}>All</span>
                    <span className={`${option === 'images' ? 'active' : ''}`} onClick={() => option === "vendors" ?  setFetch(true) : setOption("images")}>Images</span>
                    <span className={`${option === 'websites' ? 'active' : ''}`} onClick={() => setOption('websites')}>Websites</span>
                    <span className={`${option === 'vendors' ? 'active' : ''}`} onClick={() => setOption('vendors')}>Shops</span>
                    <span className={`${option === 'deals' ? 'active' : ''}`} onClick={() => setOption('deals')}>Deals</span>
                    <span className={`${option === 'featured' ? 'active' : ''}`} onClick={() => setOption('featured')}>Featured</span>
               </div>
               <h3>Showing search results for {searched.search || "All"}..</h3>
               {!loading ? 
                    <SearchAdverts content={{ads, option}} />
               : <Loading />}
          </div>
          </>
     
     )
}

const SearchAdverts = ({content}) => {
     const {ads, option} = content;
     return(
          <InnerSection type="content">
               {content.ads ? 
                content.ads[0] && typeof(content.ads) !== "string" ? 
                    content.ads.map((item) => option === "websites" ? <AdvertRow key={item.ad_id} item={item}/> : option === "vendors" ? <BestSellerSquare key={item.user_id} item={item} />  : option === "images" ? <AdvertImage images={{main: item.ad_image, more: item.ad_images, id:item.ad_id, name: item.ad_name}}  /> :<AdvertRenderer key={item.ad_id} item={item} />)
                : content.ads
               : null}
               {ads && ads[0] ? null : <p>No adverts found</p>  }
          </InnerSection>
     )
}

SearchAdverts.propTypes = {
     content: PropTypes.any
}

export default SearchPage