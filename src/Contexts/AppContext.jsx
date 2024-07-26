import {useState, createContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import server from '../config/Server';
import AdvertService from "../services/Advert";
import { useLocation } from 'react-router-dom';
import { getDataLocal, saveData } from '../utils/storageFunctions';
import { io } from 'socket.io-client';
const  serverUrl = import.meta.env.VITE_BASE_URL;

const socket = io(serverUrl)
const AppData = createContext();

export const AppProvider = ({children}) => {
     
     const location = useLocation();
     const [data, setData] = useState({
          language:"en",
          fetchNow: false,
          appOnline:true,
          categories:[],
          allAdverts:[],
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
          prevState: null,
          onlineUsers: 0,
          contactAd: null,
          freeAdsCount: 0,
          listingAdsCount: 0,
          urgentAdsCount: 0,
          sponsoredAdsCount:0
     });
     const {fetchNow} = data;

     const fetchFromServer = async () => {
          try{
               const categoriesData = await server.get('categories',null);
               const resData = await server.get('adverts',{boostSellers: true,boostNum:10, todayDeals:50, website:50});
               // const {generalAds:advertsData, boostedAds:boosted, bestSellers:boostedSellers, discounted, adWebsites} = resData?.adWebsites ? resData : {};
               const { bestSellers:boostedSellers} = resData?.adWebsites ? resData : {};
               const subCategoriesData = await server.get('sub categories',null);
               const payPlansData = await server.get('payment plans', null);
               const ops = {freeAds:{limit: 12, offset: 0}, urgentAds: {limit: 10,offset:0},listingAds:{limit: 10,offset:0}, sponsoredAds:{limit: 10,offset:0}};
               const {data:allAdverts} = await AdvertService.getAllApproved(ops);
               // const {newAdverts: advertsData, todayDeals:discounted, websiteAds:adWebsites, boosted} = getAdvertsInfo(allAdverts);
               const {
                         freeAds:advertsData, urgentAds:discounted, 
                         listingAds: boosted, sponsoredAds:adWebsites, 
                         freeAdsCount, listingAdsCount, 
                         urgentAdsCount, sponsoredAdsCount
                    } = allAdverts;
               const appData = {
                    categoriesData, advertsData, 
                    subCategoriesData, payPlansData, 
                    boosted, boostedSellers, 
                    discounted, adWebsites, 
                    allAdverts, freeAdsCount, 
                    listingAdsCount, urgentAdsCount, sponsoredAdsCount};

               
               if(appData && appData.categoriesData && appData.categoriesData[0]){
                    setData((prev) => ({
                         ...prev,
                         categories: categoriesData,adverts: advertsData,
                         allAdverts: allAdverts,subCategories: subCategoriesData,
                         payPlans: payPlansData,boosted: boosted,
                         todayDeals:discounted, bestSellers:boostedSellers,
                         websiteAds: adWebsites,currency: "Frw",
                         freeAdsCount, listingAdsCount, urgentAdsCount, sponsoredAdsCount
                    }));
                    console.log('saving data')
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
               if(localData ){
                    const {value: sessionData} = localData;
                    if (sessionData){
                         const {
                                   categoriesData, advertsData, 
                                   subCategoriesData, payPlansData, 
                                   boosted, boostedSellers, 
                                   discounted, adWebsites, allAdverts,
                                   freeAdsCount, listingAdsCount, 
                                   urgentAdsCount, sponsoredAdsCount
                              } = sessionData;
                         // const {newAdverts: advertsData, todayDeals:discounted, websiteAds:adWebsites, boosted} = getAdvertsInfo(allAdverts);
                         setData((prev) => ({
                              ...prev,
                              categories: categoriesData,adverts: advertsData,
                              allAdverts: allAdverts,boosted:boosted,
                              subCategories: subCategoriesData,payPlans: payPlansData,
                              bestSellers:boostedSellers,todayDeals:discounted,
                              websiteAds: adWebsites,currency: "Frw",
                              freeAdsCount, listingAdsCount, 
                              urgentAdsCount, sponsoredAdsCount
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

          socket.on('online-users', (count) => {
               setData(prev => ({...prev, onlineUsers: count}));
          });

          return () => {
               socket.off('online-users');
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