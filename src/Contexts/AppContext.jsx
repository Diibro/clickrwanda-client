import {useState, createContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import server from '../config/Server';
import { useLocation } from 'react-router-dom';

const AppData = createContext();

export const AppProvider = ({children}) => {
     const location = useLocation();
     const [data, setData] = useState({
          fetchNow: false,
          categories:[],
          adverts: [],
          subCategories: [],
          payPlans: [],
          currency:"",
          alertView: {
               on: false,
               content: {}
          },
          loading: false
     });

     const {fetchNow} = data;
     useEffect(() => {
          const fetchData = async () => {
               try {
                    setData((prev) => ({...prev, loading: true}));
                    const sessionData = sessionStorage.getItem('appData');
                    if (sessionData){
                         const parsedSessionData = JSON.parse(sessionData);
                         const {categoriesData, subCategoriesData, advertsData, payPlansData} = parsedSessionData;
                         setData((prev) => ({
                              ...prev,
                              categories: categoriesData,
                              adverts: advertsData,
                              subCategories: subCategoriesData,
                              payPlans: payPlansData,
                              currency: "Frw"
                         }));
                    }else{
                         const categoriesData = await server.get('categories');
                         const advertsData = await server.get('adverts');
                         const subCategoriesData = await server.get('sub categories');
                         const payPlansData = await server.get('payment plans');
                         const appData = {categoriesData, advertsData, subCategoriesData, payPlansData}
                         sessionStorage.setItem('appData', JSON.stringify(appData));
                         setData((prev) => ({
                         ...prev,
                         categories: categoriesData,
                         adverts: advertsData,
                         subCategories: subCategoriesData,
                         payPlans: payPlansData,
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