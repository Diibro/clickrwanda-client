import endpoints from './Endpoints';
import { fetchData, getUrl } from '../utils/serverFunctions';


const server = {
     get: async (endpoint) => {
          switch(endpoint) {
               case 'categories':
                    return await fetchData(getUrl(endpoints.allCategories));
               case 'adverts':
                    return await fetchData(getUrl(endpoints.allAdverts));
               case 'sub categories' :
                    return await fetchData(getUrl(endpoints.allSubCategories));
               case 'payment plans':
                    return await fetchData(getUrl(endpoints.allPayPlans));
               default:
                    console.log("no end provided")
                    return null;
          }
     }
}



export default server;