import {useState, createContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import server from '../config/Server';
import { useLocation } from 'react-router-dom';
import { getData, saveData } from '../utils/storageFunctions';

const AppData = createContext();

export const AppProvider = ({children}) => {
     const location = useLocation();
     const [data, setData] = useState({
          fetchNow: false,
          categories:[],
          adverts: [],
          boosted: [],
          bestSellers: [],
          subCategories: [],
          payPlans: [],
          currency:"",
          alertView: {
               on: false,
               content: {}
          },
          shareAlert: {on: false, content: {}},
          loading: false,
          changingPage: false
     });

     const {fetchNow} = data;
     useEffect(() => {
          const fetchData = async () => {
               try {
                    setData((prev) => ({...prev, loading: true}));
                    const sessionData = getData('appData');
                    if (sessionData){
                         const {categoriesData, subCategoriesData, advertsData, payPlansData, boosted, boostedSellers} = sessionData;
                         setData((prev) => ({
                              ...prev,
                              categories: categoriesData,
                              adverts: advertsData,
                              boostedAds:boosted,
                              subCategories: subCategoriesData,
                              payPlans: payPlansData,
                              bestSellers:boostedSellers,
                              currency: "Frw"
                         }));
                    }else{
                         const categoriesData = await server.get('categories',null);
                         const {generalAds:advertsData, boostedAds:boosted, bestSellers:boostedSellers} = await server.get('adverts',{page: 1, boost: 20, boostSellers: true});
                         const subCategoriesData = await server.get('sub categories',null);
                         const payPlansData = await server.get('payment plans', null);
                         const appData = {categoriesData, advertsData, subCategoriesData, payPlansData, boosted, boostedSellers}
                         saveData('appData', appData, 30);
                         setData((prev) => ({
                         ...prev,
                         categories: categoriesData,
                         adverts: advertsData,
                         subCategories: subCategoriesData,
                         payPlans: payPlansData,
                         boosted: boosted,
                         bestSellers:boostedSellers,
                         currency: "Frw"
                         }));
                    }
                    
               } catch (error) {
                 console.error('Error fetching data:', error);
               }finally{
                    setData((prev) => ({...prev, loading: false}));
               }
          };
          if(!data.categories[0]){
               if(location.pathname === '/' || fetchNow){
               fetchData();
               }
          }

          if(fetchNow){
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