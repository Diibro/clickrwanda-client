import {useState, createContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import server from '../config/Server';

const AppData = createContext();

export const AppProvider = ({children}) => {
     const [data, setData] = useState({
          categories:[],
          adverts: [],
          subCategories: [],
          payPlans: [],
          currency:"",
     });
     useEffect(() => {
          const fetchData = async () => {
               try {
                    const categoriesData = await server.get('categories');
                    const advertsData = await server.get('adverts');
                    const subCategoriesData = await server.get('sub categories');
                    const payPlansData = await server.get('payment plans');

                    setData((prev) => ({
                    ...prev,
                    categories: categoriesData,
                    adverts: advertsData,
                    subCategories: subCategoriesData,
                    payPlans: payPlansData,
                    currency: "Frw"
                    }));
               } catch (error) {
                 console.error('Error fetching data:', error);
               }
             };
         
             fetchData();
     }, []);
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