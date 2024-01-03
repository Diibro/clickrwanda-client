import endpoints from './Endpoints';
import { addAdvert, deleteAdvert, fetchData, getUrl, getUserAds, loginUser, logoutUser, registerUser, searchAds, searchAdvert, searchData, searchUser, updateUser } from '../utils/serverFunctions';


const server = {
     get: async (endpoint, params) => {
          switch(endpoint) {
               case 'categories':
                    return await fetchData(getUrl(endpoints.allCategories), params);
               case 'adverts':
                    return await fetchData(getUrl(endpoints.allAdverts), params);
               case 'sub categories' :
                    return await fetchData(getUrl(endpoints.allSubCategories), params);
               case 'payment plans':
                    return await fetchData(getUrl(endpoints.allPayPlans), params);
               default:
                    console.log("no end provided")
                    return null;
          }
     },
     searchAdverts: async (endpoint, params) => {
          switch(endpoint){
               case 'category':
                    return await searchData(getUrl(endpoints.categoryAdverts), params);
               case 'sub-category':
                    return await searchData(getUrl(endpoints.subCategoryAdverts), params);
               case 'user':
                    return await searchData(getUrl(endpoints.searchUserAds), params);
               case 'search':
                    return await searchAds(getUrl(endpoints.searchAdverts), params)
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
     },
     updateUser: async (params) =>{
          return await updateUser(getUrl(endpoints.updateUser), params);
     },
     getUserData: async() =>{
          return await searchUser(getUrl(endpoints.searchUser));
     },
     getUserAdverts: async () => {
          return await getUserAds(getUrl(endpoints.userAdverts));
     },
     addAdvert: async (params) => {
          return await addAdvert(getUrl(endpoints.addAdvert), params);
     },
     searchAd: async(params) => {
          return await searchAdvert(getUrl(endpoints.searchAdvert), params);
     },
     deleteUserAd: async (params) => {
          return await deleteAdvert(getUrl(endpoints.deleteUserAdvert), params);
     },
}
export default server;