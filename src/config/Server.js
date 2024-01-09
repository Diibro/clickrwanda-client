import endpoints from './Endpoints';
import { addAdvert, deleteAdvert, fetchData, getUrl, getUserAds, loginUser, logoutUser, manipulateReview, registerUser, resetPassword, searchAds, searchAdvert, searchData, searchUser, updateUser } from '../utils/serverFunctions';


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
     reviews: {
          addAdReview: async (params) => {
               return await manipulateReview(getUrl(endpoints.addAdReview), params);
          },
          addUserReview: async (params) => {
               return await manipulateReview(getUrl(endpoints.addUserReview), params);
          },
          getUserReviews: async (params) => {
               return await manipulateReview(getUrl(endpoints.getUserReviews), params);
          },
          getAdReviews: async (params) => {
               return await manipulateReview(getUrl(endpoints.getAdReviews), params);
          },
          addRating: async(params) => {
               return await manipulateReview(getUrl(endpoints.rateUser), params);
          }
     },
     resetPassword: async (endpoint,params) => {
          let url = "";
          switch(endpoint){
               case 'request-reset': 
                    url = endpoints.requestPasswordReset;
                    break;
               case 'check-password-reset':
                    url = endpoints.checkPasswordReset;
                    break;
               case 'reset-password':
                    url = endpoints.resetPassword;
                    break;
               default:
                    url = "";
          }
          if(url !== ""){
               return await resetPassword(getUrl(url), params);
          }
     },
     searchUserAd: async(params) => {
          return await searchAdvert(getUrl(endpoints.searchUserAd), params);
     },
     updateUserAd: async(params) => {
          return await updateUser(getUrl(endpoints.updateUserAd), params);
     }
}
export default server;