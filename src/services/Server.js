const  serverUrl = import.meta.env.VITE_BASE_URL;

export default {
     advert: {
          findAll: `${serverUrl}/api/advert/all-adverts`,
          findAllApproved: `${serverUrl}/api/advert/all-approved`,
          getAll: `${serverUrl}/api/advert/1`,
          save: `${serverUrl}/api/advert/2`,
          update: `${serverUrl}/api/advert/3`,
          updateAd: `${serverUrl}/api/advert/update-ad`,
          search: `${serverUrl}/api/advert/4`,
          delete: `${serverUrl}/api/advert/5`,
          category: `${serverUrl}/api/advert/search-category`,
          subCategory: `${serverUrl}/api/advert/search-sub-category`,
          user: `${serverUrl}/api/advert/get-user-adverts`,
          shop: `${serverUrl}/api/advert/get-user-ads`,
          searchMany: `${serverUrl}/api/advert/search-adverts`,
          userAd: `${serverUrl}/api/advert/search-user-ad`,
          similarAds: `${serverUrl}/api/advert/get-similar-ads`,
          adsByLocation: `${serverUrl}/api/advert/get-by-location`
     },
     agent: {
          getAll: `${serverUrl}/api/agent/1`,
          save: `${serverUrl}/api/agent/2`,
          update: `${serverUrl}/api/agent/3`,
          login: `${serverUrl}/api/agent/login`,
          resetPassword: `${serverUrl}/api/agent/reset-password`
     },
     agentPayment: {
          getAll: `${serverUrl}/api/agent-pay/get-all`,
          save: `${serverUrl}/api/agent-pay/save`,
          update: `${serverUrl}/api/agent-pay/update`,
          findByAgent: `${serverUrl}/api/agent-pay/get-agent`,
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
          getByRef: `${serverUrl}/api/users/get-ref`,
          getUserDashInfo: `${serverUrl}/api/users/get-user-dash-info`
     },
     webView: {
          getAll: `${serverUrl}/api/web-view/get-all`,
          add: `${serverUrl}/api/web-view/new-visit`,
          refVisits: `${serverUrl}/api/web-view/ref-visits`,
          typeVisits: `${serverUrl}/api/web-view/type-visits`,
          id_visits: `${serverUrl}/api/web-view/visits-per-id`,
     },
     paymentPlans: {
          getAll: `${serverUrl}/api/payment-plan/1`,
          save: `${serverUrl}/api/payment-plan/2`,
          update: `${serverUrl}/api/payment-plan/3`,
     },
     fileUpload: {
          single: `${serverUrl}/api/file-upload/single`,
          multiple: `${serverUrl}/api/file-upload/multiple`
     },
     planSubscription: {
          add: `${serverUrl}/api/plan-subscription/add`,
          update: `${serverUrl}/api/plan-subscription/update`,
          findAll: `${serverUrl}/api/plan-subscription/get-all`,
          findByAgent: `${serverUrl}/api/plan-subscription/get-by-r-id`,
          findByUser: `${serverUrl}/api/plan-subscription/get-by-user-id`,
          countAll: `${serverUrl}/api/plan-subscription/count-all`,
     },
     agentTask: {
          add: `${serverUrl}/api/agent-task/add`,
          update: `${serverUrl}/api/agent-task/update`,
          delete: `${serverUrl}/api/agent-task/delete`,
          findAll: `${serverUrl}/api/agent-task/get-all`,
          findByAgent: `${serverUrl}/api/agent-task/find-by-agent`,
     },
     admin: {
          countAll: `${serverUrl}/api/admin/count-all`
     }
}