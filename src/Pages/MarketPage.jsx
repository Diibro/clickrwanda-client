import { useEffect, useState } from 'react';
import Categories from '../data/HotCategories.json';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { getItemUrl} from '../utils/urlFunctions';
import Service from '../services/Service';
import Server from '../services/Server';
import { AdvertCardVertical } from '../components/dynamic/Advert.componet';
import Loading from '../components/static/Loading';

const MarketPage = () => {
     
  return (
     <Routes>
          <Route path='/' index element={<MainPage />} />
          <Route path='/*' element={<HotCategoryPage />} />
     </Routes>
  )
}

const MainPage = () => {
     const [categories,setCategories] = useState(null);
     useEffect(() => {
          setCategories(Categories.categories);
     },[]);
     return (
          <div className="page">
               <MarketPageHeader />
               <div className="market-page-categories">
                    {
                         categories && categories.length ? 
                              categories.map((cat, index) => 
                              <div key={`market-page-cat-${index}`} className='market-page-category-container'>
                                   <div className="market-page-category-container-title">
                                        <h2>{cat.name}</h2>
                                        <Link to={`/market/${getItemUrl(cat.name, "")}`}>View deals</Link>
                                   </div>
                                   <div className="market-page-sub-cat-container hide-scroll">
                                        <div className="content">
                                             {
                                                  cat.subs && cat.subs.length ? 
                                                       cat.subs.map((sub,index) => <HotSubcategoryCard key={`market-page-sub-${index}-${cat.name}`} category={cat} sub={sub} /> )
                                                  : null
                                             }
                                        </div>
                                   </div>
                              </div> 
                         )
                         : null
                    }
               </div>
          </div>
     )
}

const MarketPageHeader = () => {
     return (
          <div className="market-page-title">
               <h1>Welcome to our Marketplace</h1>
          </div>
     )
}

const HotSubcategoryCard = ({category,sub}) => {
     const navigate = useNavigate();
     return (
          <div className="home-hot-category-card" onClick={() => navigate(`/market/${getItemUrl(category.name, sub.id)}`)}>
               <img src={sub.image || category.image} alt={`${sub.sub_name}`} loading="lazy" />
               <div className="content">
                    <h5>{sub.sub_name}</h5>
               </div>
          </div>
     )
}

const HotCategoryPage = () => {
     const [categories,setCategories] = useState(null);
     const [category,setCategory] = useState(null);
     const [subCategoryData,setSubCategoryData] = useState(null);
     const [loading,setLoading] = useState(false); 
     const location = useLocation();

     const updateCategory = () => {
          const arr = location.pathname.split('/');
          const name = arr[arr.length - 1].split("-").join(" ");
          const newCategory = categories.filter(cat => cat.name === name)[0];
          setCategory(newCategory);
     }

     const getSubCategoryData = async() => {
          setLoading(true);
          const res = await Service.post(Server.advert.getCommissionAdsByCategory, {limit: 20, offset:0, subCategories: category.subs});
          if(res) {
               setSubCategoryData(res.data);
          }
          return setLoading(false);
     }

     useEffect(() => {
          setCategories(Categories.categories);
     },[location.pathname]);

     useEffect(() => {
          if(categories && categories.length){
               updateCategory();
          }
     },[categories]);

     useEffect(() => {
          if(category){
               (async() => await getSubCategoryData())();
          }
     },[category])
     return(
          <div className="page">
               {
                    category ? 
                         <>
                              <div className="market-page-category-page-header" style={{backgroundImage: `url(${category.image})`}}>
                                   <div className="content">
                                        <h3>{category.name}</h3>
                                   </div>
                              </div>
                              <div className='market-page-categories'>
                                   {
                                        loading ? <Loading /> :
                                        <>
                                             {
                                                  subCategoryData && subCategoryData.length ? 
                                                  subCategoryData.map((sub,index) => 
                                                       sub.ads && sub.ads.length ? 
                                                            <div className="market-page-category-container" key={`market-page-hot-sub-category-${index}`}>
                                                                 <div className="market-page-category-container-title">
                                                                      <h2>{sub.sub_name}</h2>
                                                                 </div>
                                                                 <div className='market-page-sub-cat-container hide-scroll'>
                                                                      <div className="content">
                                                                           {
                                                                                sub.ads.map((ad) => <AdvertCardVertical key={ad.ad_id} ad={ad} />)
                                                                           }
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       :null
                                                       )
                                                  : <p className='no-ads-found'>Oops! No data found</p>
                                             }
                                        </>
                                   }
                              </div>
                         </>
                         
                    : <p className='no-ads-found'>Oops! No data found</p>
               }
          </div>
     )
}

HotSubcategoryCard.propTypes = {
     category: PropTypes.object,
     sub: PropTypes.object
}

export default MarketPage