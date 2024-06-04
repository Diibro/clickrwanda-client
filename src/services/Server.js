const  serverUrl = import.meta.env.VITE_BASE_URL;

export default {
     advert: {
          findAll: `${serverUrl}/api/advert/all-adverts`,
          getAll: `${serverUrl}/api/advert/1`,
          save: `${serverUrl}/api/advert/2`,
          update: `${serverUrl}/api/advert/3`,
          search: `${serverUrl}/api/advert/4`,
          delete: `${serverUrl}/api/advert/5`,
          category: `${serverUrl}/api/advert/search-category`,
          subCategory: `${serverUrl}/api/advert/search-sub-category`,
          user: `${serverUrl}/api/advert/get-user-adverts`,
          shop: `${serverUrl}/api/advert/get-user-ads`,
          searchMany: `${serverUrl}/api/advert/search-adverts`,
          userAd: `${serverUrl}/api/advert/search-user-ad`,
     },
     agent: {
          getAll: `${serverUrl}/api/agent/1`,
          save: `${serverUrl}/api/agent/2`,
          update: `${serverUrl}/api/agent/3`,
          login: `${serverUrl}/api/agent/login`,
     },
     category: {
          getAll: `${serverUrl}/api/category/1`,
          save: `${serverUrl}/api/category/2`,
          update: `${serverUrl}/api/category/3`,
          search: `${serverUrl}/api/category/4`,
     },
     quotation: {
          getAll: `${serverUrl}/api/quotation/1`,
          save: `${serverUrl}/api/quotation/2`,
          search: `${serverUrl}/api/quotation/3`
     },
     review: {
          getAll: `${serverUrl}/api/review/get-ad-reviews`,
          user: `${serverUrl}/api/review/get-user-reviews`,
          save: `${serverUrl}/api/review/add-ad-review`,
          addUser: `${serverUrl}/api/review/add-user-review`,
          delete: `${serverUrl}/api/review/5`,
     },
     subCategory: {
          getAll: `${serverUrl}/api/sub-category/1`,
          save: `${serverUrl}/api/sub-category/2`,
          search: `${serverUrl}/api/sub-category/3`,
          category: `${serverUrl}/api/sub-category/6`,
          update: `${serverUrl}/api/sub-category/4`,
          delete: `${serverUrl}/api/sub-category/5`,
     },
     webView: {

     },
     user: {
          getAll: `${serverUrl}/api/users/1`,
          register: `${serverUrl}/api/users/2`,
          update: `${serverUrl}/api/users/3`,
          search: `${serverUrl}/api/users/4`,
          delete: `${serverUrl}/api/users/5`,
          login: `${serverUrl}/api/users/login`,
          rate: `${serverUrl}/api/users/rate-user`,
          passwordResetRequest: `${serverUrl}/api/users/request-password-reset`,
          getResetEmail: `${serverUrl}/api/users/get-reset-email`,
          passwordReset: `${serverUrl}/api/users/reset-password`,
     },

}