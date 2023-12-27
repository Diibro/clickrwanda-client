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
     adReviews: "api/review/ad",
     adAdReview: "api/review/ad",
     userReviews:"api/review/user",
     addUserReview: "api/review/user",
     deleteUserAdvert: "api/advert/5",
}

export default endpoints;