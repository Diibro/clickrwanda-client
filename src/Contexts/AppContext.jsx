import {useState, createContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import server from '../config/Server';
import { useLocation } from 'react-router-dom';
import { getDataLocal, saveData } from '../utils/storageFunctions';

const AppData = createContext();

export const AppProvider = ({children}) => {
     const location = useLocation();
     const [data, setData] = useState({
          fetchNow: false,
          appOnline:true,
          categories:[],
          adverts: [],
          boosted: [],
          bestSellers: [],
          todayDeals:[],
          subCategories: [],
          payPlans: [],
          websiteAds:[],
          currency:"",
          alertView: {
               on: false,
               content: {}
          },
          shareAlert: {on: false, content: {}},
          loading: false,
          changingPage: false,
     });

     const {fetchNow} = data;

     const fetchFromServer = async () => {
          try{
               const categoriesData = await server.get('categories',null);
               const resData = await server.get('adverts',{page: 1, boost: 20, boostSellers: true,boostNum:10, todayDeals:50, website:50});
               const {generalAds:advertsData, boostedAds:boosted, bestSellers:boostedSellers, discounted, adWebsites} = resData?.adWebsites ? resData : {};
               const subCategoriesData = await server.get('sub categories',null);
               const payPlansData = await server.get('payment plans', null);
               const appData = {categoriesData, advertsData, subCategoriesData, payPlansData, boosted, boostedSellers, discounted, adWebsites}
               
               if(appData && appData.categoriesData && appData.categoriesData[0]){
                    setData((prev) => ({
                         ...prev,
                         categories: categoriesData,
                         adverts: advertsData,
                         subCategories: subCategoriesData,
                         payPlans: payPlansData,
                         boosted: boosted,
                         todayDeals:discounted,
                         bestSellers:boostedSellers,
                         websiteAds: adWebsites,
                         currency: "Frw"
                    }));
                    saveData('appData', appData, 30);
               }
          }catch(error){
               console.log(error);
          }
          
     }

     const fetchData = async () => {
          try {
               setData((prev) => ({...prev, loading: true}));
               const localData = getDataLocal("appData");
               console.log(localData);
               if(localData ){
                    const {value: sessionData} = localData;
                    console.log(localData);
                    if (sessionData){
                         const {categoriesData, subCategoriesData, advertsData, payPlansData, boosted, boostedSellers, discounted, adWebsites} = sessionData;
                         setData((prev) => ({
                              ...prev,
                              categories: categoriesData,
                              adverts: advertsData,
                              boosted:boosted,
                              subCategories: subCategoriesData,
                              payPlans: payPlansData,
                              bestSellers:boostedSellers,
                              todayDeals:discounted,
                              websiteAds: adWebsites,
                              currency: "Frw"
                         }));
                         setData((prev) => ({...prev, loading: false}));
                    }
               }
               
               if(!localData || localData.expired){
                    await fetchFromServer();
               }
          } catch (error) {
               console.error('Error fetching data:', error);
          }finally{
               setData((prev) => ({...prev, loading: false}));
          }
     };
     useEffect(() => {
          
          if(!data.categories[0]){
               if(location.pathname === '/' || fetchNow){
               (async () => await fetchData())();
               }
          }

          if(fetchNow){
               (async () => await fetchData())();
               setData((prev) => ({...prev, fetchNow:false}));
          } 
             
     }, [location.pathname, fetchNow]);
     return(
          <AppData.Provider value={[data, setData]}>
               {children}
          </AppData.Provider>
     )
}

AppProvider.propTypes = {
     children: PropTypes.node.isRequired
}

export default AppData;