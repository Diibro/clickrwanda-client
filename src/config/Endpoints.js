const endpoints = {
     allCategories: 'api/category/1',
     allSubCategories: 'api/sub-category/1',
     allAdverts: 'api/advert/1',
     allPayPlans: 'api/payment-plan/1',
     categoryAdverts:'api/advert/search-category',
     subCategoryAdverts: 'api/advert/search-sub-category',
     addUser: 'api/users/2',
     loginUser: 'api/users/login',
     logout: 'api/users/logout',
     updateUser: "api/users/3",
     searchUser: "api/users/4",
     userAdverts: "api/advert/get-user-adverts",
     searchUserAds: "api/advert/get-user-ads",
     addAdvert: "api/advert/2",
     searchAdvert: "api/advert/4",
     deleteUserAdvert: "api/advert/5",
     searchAdverts: "api/advert/search-adverts",
     addAdReview: "api/review/add-ad-review",
     addUserReview: "api/review/add-user-review",
     getAdReviews: "api/review/get-ad-reviews",
     getUserReviews:"api/review/get-user-reviews",
     rateUser: "api/users/rate-user",
     requestPasswordReset: "api/users/request-password-reset",
     resetPassword: "api/users/reset-password",
     checkPasswordReset: "api/users/get-reset-email"
}

export default endpoints;