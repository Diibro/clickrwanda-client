import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { getItemUrlName } from "../utils/urlFunctions";
import { InnerSection } from "../components/dynamic/InnerSectionContainer";
import { AdvertRenderer } from "../components/dynamic/Advert.componet";
import PropTypes  from 'prop-types';
import Loading from "../components/static/Loading";
import server from "../config/Server";
import SearchBar from "../components/static/SearchBar";

const SearchPage = () => {
     const location = useLocation();
     const [loading, setLoading] = useState(false);
     const [ads, setAds] = useState(null);
     const [sub, setSub] = useState(null);
     const [cat, setCat] = useState(null);
     const [userAds, setUserAds] = useState(null)
     const searched = getItemUrlName(location.search);
     const searchAds = async () => {
          try {
               setLoading(true);
               const res = await  server.searchAdverts('search', {searched});
               if(res.ads) setAds(res.ads);
               if(res.sub) setSub(res.sub);
               if(res.cat) setCat(res.cat);
               if(res.user) setUserAds(res.user)
          } catch (error) {
               console.log(error);
          }finally{
               setLoading(false);
          }
     }
     useEffect(() => {
          setAds(null);
          setSub(null);
          setCat(null);
          setUserAds(null);
          (async () => await searchAds())();
     }, [location.search]);

     return (
     <div className="search-page">
          <div className="search-page-searchbar">
               <SearchBar />
          </div>
          <h3>Showing search results for {searched}..</h3>
          {!loading ? 
               <SearchAdverts content={{ads, sub, cat, user: userAds}} />
          : <Loading />}
     </div>
     )
}

const SearchAdverts = ({content}) => {
     return(
          <InnerSection type="content">
               {content.ads ? 
                content.ads[0] && typeof(content.ads) !== "string" ? 
                    content.ads.map((item) => <AdvertRenderer key={item.ad_id} item={item} />)
                : content.ads
               : null}
               {content.sub ? 
                content.sub[0] && typeof(content.sub) !== "string" ? 
                    content.sub.map((item) => <AdvertRenderer key={item.ad_id} item={item} />)
                : null
               : null}
               {content.cat ? 
                content.cat[0] && typeof(content.cat) !== "string" ? 
                    content.cat.map((item) => <AdvertRenderer key={item.ad_id} item={item} />)
                : null
               : null}
               {content.user ? 
                content.user[0] && typeof(content.user) !== "string" ? 
                    content.user.map((item) => <AdvertRenderer key={item.ad_id} item={item} />)
                : null
               : null}
               {!content.ads && !content.sub && !content.cat && !content.user ? <p>No adverts found</p> : null }
          </InnerSection>
     )
}

SearchAdverts.propTypes = {
     content: PropTypes.any
}

export default SearchPage