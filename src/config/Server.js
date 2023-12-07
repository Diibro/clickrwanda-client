import endpoints from './Endpoints';
import { fetchData, getUrl, loginUser, logoutUser, registerUser, searchData } from '../utils/serverFunctions';


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
     },
     searchAdverts: async (endpoint, params) => {
          switch(endpoint){
               case 'category':
                    return await searchData(getUrl(endpoints.categoryAdverts), params);
               default:
                    console.log("no end provided");
                    return null;
          }
     },
     register: async(params) => {
          return await registerUser(getUrl(endpoints.addUser), params);
     },
     login: async(params) => {
          return await loginUser(getUrl(endpoints.loginUser), params);
     },
     logout: async() => {
          return await logoutUser(getUrl(endpoints.logout));
     }

}



export default server;